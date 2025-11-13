import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./pages/inicio/inicio.page').then((m) => m.InicioPage),
  },
  {
    path: 'noticias',
    loadComponent: () =>
      import('./pages/noticias/noticias.page').then((m) => m.NoticiasPage),
  },
  {
    path: 'galeria',
    loadComponent: () =>
      import('./pages/galeria/galeria.page').then((m) => m.GaleriaPage),
  },
  {
    path: 'foro',
    loadComponent: () =>
      import('./pages/foro/foro.page').then((m) => m.ForoPage),
  },
  {
    path: 'requisitos',
    loadComponent: () =>
      import('./pages/requisitos/requisitos.page').then((m) => m.RequisitosPage),
  },
  {
    path: 'notificaciones',
    loadComponent: () =>
      import('./pages/notificaciones/notificaciones.page').then(
        (m) => m.NotificacionesPage
      ),
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./pages/contacto/contacto.page').then((m) => m.ContactoPage),
  },
];
