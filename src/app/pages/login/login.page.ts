import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false,
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/tasks']);
    } catch (error) {
      const alert = await this.alertCtrl.create({
        header: 'Login Failed',
        message: (error as any).message,
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
