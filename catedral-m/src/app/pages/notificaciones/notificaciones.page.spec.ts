import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NotificacionesPage } from './notificaciones.page';
import { servicesFirestore } from 'src/app/services/firestore';
import { Notificaciones } from 'src/app/componentes/interfaces/interfaces';

// Creamos un mock del servicio de Firestore
class FirestoreServiceMock {
  getNotificaciones() {
    // Retorna un observable de prueba
    const mockNotificaciones: Notificaciones[] = [
      { id: '1', titulo: 'Prueba 1', mensaje: 'Mensaje 1', fecha: new Date() },
      { id: '2', titulo: 'Prueba 2', mensaje: 'Mensaje 2', fecha: new Date() },
    ];
    return of(mockNotificaciones);
  }
}

describe('NotificacionesPage', () => {
  let component: NotificacionesPage;
  let fixture: ComponentFixture<NotificacionesPage>;
  let firestoreService: servicesFirestore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionesPage],
      providers: [
        { provide: servicesFirestore, useClass: FirestoreServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacionesPage);
    component = fixture.componentInstance;
    firestoreService = TestBed.inject(servicesFirestore);

    fixture.detectChanges();
  });

  it('debe crear la página', () => {
    expect(component).toBeTruthy();
  });

  it('debe obtener las notificaciones al inicializar', (done) => {
    component.notificaciones$?.subscribe(data => {
      expect(data.length).toBe(2);
      expect(data[0].titulo).toBe('Prueba 1');
      expect(data[1].titulo).toBe('Prueba 2');
      done();
    });
  });
});
