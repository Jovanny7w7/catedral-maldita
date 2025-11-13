import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class Interfaces {
  
  
}
 
export interface Noticia {
  titulo: string;
  contenido: string;
  estado: string;
  fecha_publicacion: Timestamp;
  id_admin_autor: string;
  imagen: string;
}

export interface GaleriaImagen {
  id?: string;              // ID generado por Firestore
  categoria: string;        // Ej. "Paisajes", "Arte", etc.
  descripcion: string;
  fecha_subida: string | Date;
  id_admin_subio: string;
  titulo: string;
  url_imagen: string;
}

export interface Video {
  id?: string;              // ID generado por Firestore
  descripcion: string;
  fecha_publicacion: string | Date;
  id_admin_subio: string;
  titulo: string;
  video: string;            // URL del video o storage path
}

export interface Requisitos {
  id?: string;                      // ID opcional de Firestore

  // Información general
  titulo?: string;                  // Si deseas usarlo luego
  descripcion: string;              // Historia o sinopsis del juego
  version: string;                  // Ej. "Beta"
  clasificacion: string;            // Ej. "+12"
  precio: number;                   // Ej. 5

  // Especificaciones técnicas
  cpu: string;                      // Ej. "i3, i5"
  ram: string;                      // Ej. "5 GB"
  almacenamiento_libre: string;     // Ej. "2 GB"
  tamano: string;                   // Ej. "1.2 GB"
  requiere_windows: string;         // Ej. "Windows 10/11"

  // Configuración de juego
  modos_de_juego: string;           // Ej. "Un jugador"
  idiomas: string;                  // Ej. "Español"
  compatibilidad_con_control: boolean;
  compra_dentro_de_juego: boolean;
  conexion_requiere: boolean;

  // Metadatos
  actualizado: Date | string;       // Marca de tiempo o cadena legible
}

export interface Publicacion {
  id?: string; // ID de documento Firestore
  titulo: string;
  contenido: string;
  estado: string;
  fecha_creacion: any; // Timestamp de Firestore
  id_usuario_autor: string;
  reacciones?: {
    like: number;
    love: number;
  };
}

export interface Respuesta {
  id?: string;
  id_publicacion: string;
  id_usuario_autor: string;
  contenido: string;
  estado: string;
  fecha_creacion: any;
}

export interface Notificaciones {
  id?: string;
  titulo: string;
  mensaje: string;
  fecha: Timestamp | Date;
  leida?: boolean;
}