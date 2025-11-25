import { TestBed } from '@angular/core/testing';
import { servicesFirestore } from './firestore';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

describe('servicesFirestore', () => {
  let service: servicesFirestore;
  let firestoreMock: Partial<Firestore>;

  beforeEach(() => {
    firestoreMock = {} as any; // Mock mínimo, podemos agregar métodos si queremos

    TestBed.configureTestingModule({
      providers: [
        servicesFirestore,
        { provide: Firestore, useValue: firestoreMock }
      ]
    });

    service = TestBed.inject(servicesFirestore);
  });

  it('El servicio de Firestore debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  // Ejemplo: probar getNoticias devolviendo un array simulado
  it('getNoticias debe retornar un listado de noticias', (done) => {
    // Simulamos que collectionData devuelve un observable con datos
    spyOn(service as any, 'getNoticias').and.returnValue(of([{ id: '1', titulo: 'Noticia de prueba' }]));

    service.getNoticias().subscribe(noticias => {
      expect(noticias.length).toBeGreaterThan(0);
      expect(noticias[0].titulo).toBe('Noticia de prueba');
      done();
    });
  });
});
