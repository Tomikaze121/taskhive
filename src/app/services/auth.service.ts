import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore, 
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  getUser() {
    return this.afAuth.authState;
  }

  async login(email: string, password: string) {
    const loading = await this.loadingCtrl.create({ message: 'Logging in...' });
    await loading.present();

    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      loading.dismiss();
      this.router.navigate(['/home']);
      this.showToast('Logged in successfully!');
    } catch (error: any) {
      loading.dismiss();
      this.showToast(error.message || 'Login failed');
    }
  }

  async register(email: string, password: string) {
    const loading = await this.loadingCtrl.create({ message: 'Creating account...' });
    await loading.present();

    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      loading.dismiss();
      this.router.navigate(['/home']);
      this.showToast('Account created!');
    } catch (error: any) {
      loading.dismiss();
      this.showToast(error.message || 'Registration failed');
    }
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          handler: async () => {
            const loading = await this.loadingCtrl.create({ message: 'Logging out...' });
            await loading.present();
            await this.afAuth.signOut();
            loading.dismiss();
            this.router.navigate(['/login']);
            this.showToast('Logged out successfully.');
          }
        }
      ]
    });
    await alert.present();
  }

 getTasks(): any {
  return this.firestore.collection('tasks').valueChanges({ idField: 'id' }) as any;
}


  async showToast(message: string, duration: number = 2000) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position: 'bottom'
    });
    await toast.present();
  }
}
