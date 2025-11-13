// Importaciones principales de Angular y Ionic
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/componentes/header/header.component';

// 🔹 Importaciones de Firebase y RxJS para obtener datos en tiempo real
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// 🔹 Para manejar URLs seguras (como iframes de YouTube)
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// 🔹 Importa las interfaces que definen la estructura de los datos
import { GaleriaImagen, Video } from 'src/app/componentes/interfaces/interfaces';

// Decorador que define el componente Angular
@Component({
  selector: 'app-galeria', // Nombre del selector (etiqueta HTML)
  templateUrl: './galeria.page.html', // Plantilla asociada
  styleUrls: ['./galeria.page.scss'], // Estilos del componente
  standalone: true, // Permite usar el componente sin depender de un módulo
  imports: [
    // Módulos y componentes necesarios
    IonContent,
    IonHeader,
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonCardContent,
    CommonModule,
    FormsModule,
    HeaderComponent
  ]
})
export class GaleriaPage implements OnInit {
  // 🔹 Propiedad para controlar el segmento actual (imagenes o videos)
  segmentValue: string = 'imagenes';

  // 🔹 Observables que recibirán los datos de Firestore en tiempo real
  imagenes$!: Observable<GaleriaImagen[]>;
  videos$!: Observable<Video[]>;

  // 🔹 Variable para mostrar un estado de carga (si se desea en el futuro)
  loadingVideo = false;

  // Inyección de dependencias:
  // - Firestore: para acceder a la base de datos
  // - DomSanitizer: para crear URLs seguras (evita advertencias de seguridad al mostrar iframes)
  constructor(private firestore: Firestore, private sanitizer: DomSanitizer) {}

  // 🔹 Método que se ejecuta al inicializar el componente
  ngOnInit() {
    // Referencia a las colecciones en Firestore
    const imagenesRef = collection(this.firestore, 'galeria_imagenes');
    const videosRef = collection(this.firestore, 'videos');

    // Se asignan los Observables con los datos de Firestore (flujo en tiempo real)
    this.imagenes$ = collectionData(imagenesRef, { idField: 'id' }) as Observable<GaleriaImagen[]>;
    this.videos$ = collectionData(videosRef, { idField: 'id' }) as Observable<Video[]>;
  }

  // 🔹 Maneja el cambio de segmento (al alternar entre imágenes y videos)
  segmentChanged(event: any) {
    this.segmentValue = event.detail.value;
  }

  // 🔒 Método que devuelve una URL segura para insertar videos en iframes
  getSafeUrl(url: string): SafeResourceUrl {
    // Si el enlace es de YouTube con formato largo (watch?v=)
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]; // Extrae el ID del video
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${videoId}` // Convierte a formato embebido
      );
    }
    // Si el enlace es del formato corto (youtu.be/)
    else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1];
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${videoId}`
      );
    }
    // Si no es YouTube, devuelve la URL como recurso seguro igualmente
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
