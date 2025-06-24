import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; 
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false,
})
export class HomePage implements OnInit {
  tasks$!: Observable<any[]>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

 ngOnInit() {
  this.tasks$ = this.authService.getTasks(); 
}
    goToTasks() {
    this.router.navigate(['/tasks']);
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
