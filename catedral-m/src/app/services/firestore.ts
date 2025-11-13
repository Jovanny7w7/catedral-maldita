// Importaciones necesarias de Angular y Firebase
import { Injectable } from '@angular/core';
import {
  Firestore,           // Objeto principal para interactuar con Firestore
  collection,           // Permite acceder a una colección
  collectionData,       // Obtiene los datos de una colección como Observable
  addDoc,               // Permite agregar documentos a una colección
  doc,                  // Referencia a un documento específico
  getDoc,               // Obtiene un documento por ID
  query,                // Permite crear consultas a Firestore
  orderBy               // Ordena los resultados según un campo
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Noticia, Requisitos, Publicacion, Respuesta, Notificaciones } from '../componentes/interfaces/interfaces';

// Decorador que indica que este servicio puede inyectarse en cualquier parte de la app
@Injectable({
  providedIn: 'root' // Hace que el servicio sea único y accesible globalmente
})
export class servicesFirestore {
  // Se inyecta la instancia de Firestore para interactuar con la base de datos
  constructor(private firestore: Firestore) {}

  // 🔹 MÉTODOS PARA "NOTICIAS" -------------------------------

  // Obtiene todas las noticias desde la colección 'noticias'
  getNoticias(): Observable<Noticia[]> {
    const noticiasRef = collection(this.firestore, 'noticias'); // Referencia a la colección
    return collectionData(noticiasRef, { idField: 'id' }) as Observable<Noticia[]>; 
    // Retorna los datos como un flujo (Observable) de tipo Noticia[]
  }

  // Obtiene una noticia específica por su ID
  getNoticiaById(id: string): Promise<Noticia | undefined> {
    const noticiaDoc = doc(this.firestore, `noticias/${id}`); // Referencia al documento
    // Retorna la noticia si existe, o "undefined" si no existe
    return getDoc(noticiaDoc).then(docSnap =>
      docSnap.exists() ? (docSnap.data() as Noticia) : undefined
    );
  }

  // 🔹 MÉTODOS PARA "REQUISITOS" -----------------------------

  // Obtiene todos los requisitos desde la colección 'Requisitos'
  getRequisitos(): Observable<Requisitos[]> {
    const requisitosRef = collection(this.firestore, 'Requisitos');
    return collectionData(requisitosRef, { idField: 'id' }) as Observable<Requisitos[]>;
  }

  // Obtiene un requisito específico por su ID
  getRequisitoById(id: string): Promise<Requisitos | undefined> {
    const requisitoDoc = doc(this.firestore, `Requisitos/${id}`);
    return getDoc(requisitoDoc).then(docSnap =>
      docSnap.exists() ? (docSnap.data() as Requisitos) : undefined
    );
  }

  // 🔹 MÉTODOS PARA EL "FORO" (PUBLICACIONES) ----------------

  // Obtiene todas las publicaciones del foro ordenadas por fecha (más recientes primero)
  getPublicaciones(): Observable<Publicacion[]> {
    const publicacionesRef = collection(this.firestore, 'foro_publicaciones');
    const q = query(publicacionesRef, orderBy('fecha_creacion', 'desc')); // Consulta con orden descendente
    return collectionData(q, { idField: 'id' }) as Observable<Publicacion[]>;
  }

  // Agrega una nueva publicación al foro
  addPublicacion(pub: Publicacion) {
    const publicacionesRef = collection(this.firestore, 'foro_publicaciones');
    return addDoc(publicacionesRef, pub); // Inserta el documento en Firestore
  }

  // 🔹 MÉTODOS PARA EL "FORO" (RESPUESTAS) -------------------

  // Obtiene todas las respuestas del foro
  getRespuestas(): Observable<Respuesta[]> {
    const respuestasRef = collection(this.firestore, 'foro_respuestas');
    return collectionData(respuestasRef, { idField: 'id' }) as Observable<Respuesta[]>;
  }

  // Agrega una nueva respuesta al foro
  addRespuesta(resp: Respuesta) {
    const respuestasRef = collection(this.firestore, 'foro_respuestas');
    return addDoc(respuestasRef, resp);
  }

  // 🔹 MÉTODOS PARA "NOTIFICACIONES" -------------------------

  // Obtiene las notificaciones, ordenadas por fecha (más recientes primero)
  getNotificaciones(): Observable<Notificaciones[]> {
    const notificacionesRef = collection(this.firestore, 'notificaciones');
    const q = query(notificacionesRef, orderBy('fecha', 'desc')); // Ordena las notificaciones por fecha
    return collectionData(q, { idField: 'id' }) as Observable<Notificaciones[]>;
  }
}
