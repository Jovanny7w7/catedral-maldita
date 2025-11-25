import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NoticiasPage } from './noticias.page';
import { servicesFirestore } from 'src/app/services/firestore';
import { Noticia } from 'src/app/componentes/interfaces/interfaces';

describe('NoticiasPage', () => {
  let component: NoticiasPage;
  let fixture: ComponentFixture<NoticiasPage>;
  let mockFirestoreService: any;

  beforeEach(async () => {
    // Creamos un mock del servicio
    mockFirestoreService = {
      getNoticias: jasmine.createSpy('getNoticias').and.returnValue(
        of([
          { titulo: 'Noticia 1', contenido: 'Contenido 1', estado: 'publicado', fecha_publicacion: { toDate: () => new Date() } },
          { titulo: 'Noticia 2', contenido: 'Contenido 2', estado: 'borrador', fecha_publicacion: { toDate: () => new Date() } },
        ] as Noticia[])
      )
    };

    await TestBed.configureTestingModule({
      imports: [NoticiasPage],
      providers: [
        { provide: servicesFirestore, useValue: mockFirestoreService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NoticiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // dispara ngOnInit
  });

  it('El componente debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit debe cargar solo noticias publicadas', () => {
    expect(component.noticias.length).toBe(1);
    expect(component.noticias[0].estado).toBe('publicado');
    expect(component.noticias[0].titulo).toBe('Noticia 1');
  });
});
