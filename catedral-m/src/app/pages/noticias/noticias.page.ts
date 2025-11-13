import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Timestamp } from '@angular/fire/firestore';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,

} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/componentes/header/header.component';
import { Noticia } from 'src/app/componentes/interfaces/interfaces';
import { servicesFirestore } from 'src/app/services/firestore';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,

    // Ionic standalone imports
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  ]
})
export class NoticiasPage implements OnInit {

  noticias: Noticia[] = [];

  constructor(private noticiasService: servicesFirestore) {}

  ngOnInit() {
    this.noticiasService.getNoticias().subscribe(data => {
      this.noticias = data.filter(n => n.estado === 'publicado');
      console.log(this.noticias);
    });
  }
}
