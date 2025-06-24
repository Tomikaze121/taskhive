import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from 'src/app/services/task.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: false,
})
export class TasksPage implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  async addTask() {
    const alert = await this.alertCtrl.create({
      header: 'New Task',
      inputs: [
        { name: 'title', type: 'text', placeholder: 'Task Title' },
        { name: 'description', type: 'textarea', placeholder: 'Task Description' },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Add',
          handler: (data) => {
            const newTask: Task = {
              title: data.title,
              description: data.description,
              createdAt: Date.now(),
            };
            this.taskService.addTask(newTask).then(() => {
              this.showToast('Task added!');
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async editTask(task: Task) {
    const alert = await this.alertCtrl.create({
      header: 'Edit Task',
      inputs: [
        { name: 'title', type: 'text', value: task.title },
        { name: 'description', type: 'textarea', value: task.description },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Save',
          handler: (data) => {
            const updatedTask: Partial<Task> = {
              title: data.title,
              description: data.description,
            };
            this.taskService.updateTask(task.id!, updatedTask).then(() => {
              this.showToast('Task updated!');
            });
          },
        },
      ],
    });

    await alert.present();
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).then(() => {
      this.showToast('Task deleted!');
    });
  }
}
