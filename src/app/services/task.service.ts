import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Task {
  id?: string;
  title: string;
  description: string;
  createdAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private afs: AngularFirestore) {}

  getTasks(): Observable<any[]> {
   return this.afs.collection<Task>('tasks', ref => ref.orderBy('createdAt', 'desc'))
               .valueChanges({ idField: 'id' }) as unknown as Observable<Task[]>;
  }

  addTask(task: Task) {
    task.createdAt = Date.now();
    return this.afs.collection('tasks').add(task);
  }

  updateTask(id: string, task: Partial<Task>) {
    return this.afs.collection('tasks').doc(id).update(task);
  }

  deleteTask(id: string) {
    return this.afs.collection('tasks').doc(id).delete();
  }
}
