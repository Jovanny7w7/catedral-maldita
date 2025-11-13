// Importaciones necesarias de Angular, Ionic y otros módulos
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { servicesFirestore } from 'src/app/services/firestore'; // Servicio que maneja la conexión con Firestore
import { HeaderComponent } from 'src/app/componentes/header/header.component'; // Componente del encabezado
import { Notificaciones } from 'src/app/componentes/interfaces/interfaces'; // Interfaz que define la estructura de una notificación

// Decorador que define el componente de la página de notificaciones
@Component({
  selector: 'app-notificaciones', // Nombre de la etiqueta para usar este componente en el HTML
  templateUrl: './notificaciones.page.html', // Archivo HTML asociado
  styleUrls: ['./notificaciones.page.scss'], // Archivo de estilos asociado
  standalone: true, // Indica que no depende de un módulo Angular principal
  imports: [CommonModule, IonicModule, HeaderComponent], // Módulos y componentes que este componente usa
})
export class NotificacionesPage implements OnInit {
  // Variable que almacenará las notificaciones obtenidas desde Firestore
  // Es un Observable (flujo de datos en tiempo real)
  notificaciones$: Observable<Notificaciones[]> | undefined;

  // Se inyecta el servicio de Firestore para acceder a los datos
  constructor(private firestoreService: servicesFirestore) {}

  // Método que se ejecuta automáticamente cuando el componente se inicializa
  ngOnInit() {
    // Obtiene las notificaciones desde Firestore mediante el servicio
    this.notificaciones$ = this.firestoreService.getNotificaciones().pipe(
      // Usa el operador "map" de RxJS para transformar los datos recibidos
      map((notificaciones) =>
        // Recorre cada notificación y modifica su formato
        notificaciones.map((n) => ({
          ...n, // Copia todas las propiedades originales de la notificación
          // 🔹 Convierte el campo "fecha" (que viene como Timestamp de Firestore)
          //    a una cadena de texto legible por el usuario (fecha y hora local)
          fecha: (n.fecha as any)?.toDate
            ? (n.fecha as any).toDate().toLocaleString()
            : n.fecha, // Si no es Timestamp, deja el valor como está
        }))
      )
    );
  }
}
