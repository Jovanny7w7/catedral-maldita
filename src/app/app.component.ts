import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    RouterModule,
  ],
})
export class AppComponent implements OnInit {
  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {
    // Escucha cambios en el estado de autenticación
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // ✅ Usuario autenticado → va al inicio
        this.router.navigate(['/inicio']);
      } else {
        // 🚪 No autenticado → va al login
        this.router.navigate(['/login']);
      }
    });
  }
}
