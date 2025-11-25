import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForoPage } from './foro.page';
import { servicesFirestore } from 'src/app/services/firestore';
import { of } from 'rxjs';
import { Publicacion } from 'src/app/componentes/interfaces/interfaces';

// Creamos un mock del servicio Firestore
class FirestoreMock {
  getPublicaciones() {
    // Retornamos un observable con publicaciones simuladas
    return of([
      { titulo: 'Test', contenido: 'Contenido prueba', estado: 'publicado', fecha_creacion: new Date(), id_usuario_autor: '1', reacciones: { like: 0, love: 0 } } as Publicacion
    ]);
  }

  addPublicacion(pub: Publicacion) {
    return Promise.resolve(); // Simulamos que siempre se guarda correctamente
  }
}

describe('ForoPage', () => {
  let component: ForoPage;
  let fixture: ComponentFixture<ForoPage>;
  let firestoreService: servicesFirestore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForoPage],
      providers: [{ provide: servicesFirestore, useClass: FirestoreMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(ForoPage);
    component = fixture.componentInstance;
    firestoreService = TestBed.inject(servicesFirestore);
    fixture.detectChanges();
  });

  it('El componente ForoPage debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cargar las publicaciones desde el servicio', () => {
    component.ngOnInit();
    expect(component.publicaciones.length).toBeGreaterThan(0);
    expect(component.publicaciones[0].titulo).toBe('Test');
  });

  it('Debe publicar una nueva publicación y limpiar los campos', async () => {
    component.nuevoTitulo = 'Título de prueba';
    component.nuevoContenido = 'Contenido de prueba';

    const spy = spyOn(firestoreService, 'addPublicacion').and.callThrough();
    await component.publicar();

    expect(spy).toHaveBeenCalled();
    expect(component.nuevoTitulo).toBe('');
    expect(component.nuevoContenido).toBe('');
  });

  it('No debe publicar si los campos están vacíos', async () => {
    component.nuevoTitulo = '   ';
    component.nuevoContenido = '';
    const spy = spyOn(firestoreService, 'addPublicacion').and.callThrough();

    await component.publicar();
    expect(spy).not.toHaveBeenCalled();
  });
});
