// Importación de decoradores y módulos principales de Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importamos el componente de encabezado personalizado
import { HeaderComponent } from '../../componentes/header/header.component';

// Importamos componentes de Ionic que se usarán en esta página
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonInput,
  IonTextarea,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonChip,
  IonIcon,
} from '@ionic/angular/standalone';

// Importamos el servicio que maneja la conexión con Firestore
import { servicesFirestore } from 'src/app/services/firestore';

// Importamos la interfaz para definir la estructura de los datos
import { Publicacion } from 'src/app/componentes/interfaces/interfaces';

@Component({
  selector: 'app-foro', // Selector del componente
  templateUrl: './foro.page.html', // Ruta de la plantilla HTML
  styleUrls: ['./foro.page.scss'], // Hoja de estilos asociada
  standalone: true, // Indica que este componente es independiente
  imports: [
    // Módulos y componentes que se usarán dentro del template
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonInput,
    IonTextarea,
    IonButton,
    IonList,
    IonLabel,
    IonChip,
    IonIcon,
    HeaderComponent, // Componente del encabezado
  ],
})
export class ForoPage implements OnInit {
  // 🔹 Lista donde se guardarán las publicaciones traídas desde Firestore
  publicaciones: Publicacion[] = [];

  // 🔹 Campos del formulario para crear una nueva publicación
  nuevoTitulo = '';
  nuevoContenido = '';

  // Inyección del servicio Firestore
  constructor(private firestoreService: servicesFirestore) {}

  // 🔹 Se ejecuta automáticamente al iniciar la página
  ngOnInit() {
    // 🔥 Escucha los cambios en la colección de "publicaciones" en tiempo real
    this.firestoreService.getPublicaciones().subscribe((data) => {
      this.publicaciones = data; // Actualiza la lista local con los datos recibidos
    });
  }

  // 🔹 Función para crear y subir una nueva publicación al foro
  async publicar() {
    // Validamos que el título y contenido no estén vacíos
    if (!this.nuevoTitulo.trim() || !this.nuevoContenido.trim()) return;

    // Creamos un objeto con los datos de la nueva publicación
    const nuevaPub: Publicacion = {
      titulo: this.nuevoTitulo,
      contenido: this.nuevoContenido,
      estado: 'pendiente', // Estado inicial (por ejemplo, puede usarse para moderación)
      fecha_creacion: new Date(), // Fecha actual
      id_usuario_autor: '676767', // ID simulado del autor (puede reemplazarse por el real del usuario autenticado)
      reacciones: { like: 0, love: 0 }, // Contadores iniciales de reacciones
    };

    // Llamamos al servicio para guardar la publicación en Firebase
    await this.firestoreService.addPublicacion(nuevaPub);

    // Limpiamos los campos del formulario después de publicar
    this.nuevoTitulo = '';
    this.nuevoContenido = '';
  }
}
