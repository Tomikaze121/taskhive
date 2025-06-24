import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false,
})
export class RegisterPage {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async register() {
    try {
      await this.authService.register(this.email, this.password);
      this.router.navigate(['/tasks']);
    } catch (error) {
      const alert = await this.alertCtrl.create({
        header: 'Registration Failed',
        message: (error as any).message,
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
