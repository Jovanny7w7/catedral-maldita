// Importaciones necesarias desde Angular y Ionic
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonLabel
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/componentes/header/header.component'; // Componente del encabezado
import { Requisitos } from 'src/app/componentes/interfaces/interfaces'; // Interfaz que define la estructura de los requisitos
import { servicesFirestore } from 'src/app/services/firestore'; // Servicio personalizado para conectarse con Firestore
import { IonIcon } from '@ionic/angular/standalone'; // Componente de íconos de Ionic

// Decorador que define el componente Angular
@Component({
  selector: 'app-requisitos', // Nombre del selector (etiqueta para usar este componente)
  templateUrl: './requisitos.page.html', // Archivo HTML asociado a la vista
  styleUrls: ['./requisitos.page.scss'], // Archivo SCSS con los estilos del componente
  standalone: true, // Indica que no pertenece a un módulo (usa imports directamente)
  imports: [
    // Componentes y módulos que este componente puede usar en su template
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    CommonModule,
    FormsModule,
    HeaderComponent,
    IonIcon
  ]
})
export class RequisitosPage implements OnInit {
  // 🔹 Arreglo donde se guardarán los datos obtenidos desde Firestore
  requisitos: Requisitos[] = [];

  // Se inyecta el servicio Firestore para acceder a los datos remotos
  constructor(private requisitosService: servicesFirestore) {}

  // 🔹 ngOnInit se ejecuta al inicializar el componente
  ngOnInit() {
    // Se suscribe al Observable que devuelve los requisitos desde Firestore
    this.requisitosService.getRequisitos().subscribe({
      // Si los datos llegan correctamente
      next: (data) => {
        console.log('🔥 Datos recibidos de Firestore:', data); // Muestra en consola lo recibido
        this.requisitos = data; // Guarda los datos en la variable local para mostrarlos en el HTML
      },
      // Si ocurre un error durante la obtención de datos
      error: (err) => {
        console.error('❌ Error al obtener requisitos:', err);
      },
      // Cuando el Observable se completa (ya no enviará más datos)
      complete: () => {
        console.log('✅ Observable completado');
      }
    });
  }
}
