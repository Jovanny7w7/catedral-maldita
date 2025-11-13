import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() history: string[] = [];
  @Input() logoUrl?: string; // 🔹 URL del logo opcional
  @Input() userPhotoUrl?: string; // 🔹 URL de la foto del usuario logueado
}
