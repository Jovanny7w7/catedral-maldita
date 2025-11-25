import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GaleriaPage } from './galeria.page';
import { Firestore } from '@angular/fire/firestore';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

describe('GaleriaPage', () => {
  let component: GaleriaPage;
  let fixture: ComponentFixture<GaleriaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GaleriaPage],
      providers: [
        { provide: Firestore, useValue: {} },
        { provide: DomSanitizer, useValue: { bypassSecurityTrustResourceUrl: (url: string) => url } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GaleriaPage);
    component = fixture.componentInstance;
  });

  it('El componente GaleriaPage debe crearse', () => {
    expect(component).toBeTruthy();
  });


  it('El segmento inicial debe ser "imagenes"', () => {
    expect(component.segmentValue).toBe('imagenes');
  });

  it('Debe cambiar de segmento correctamente', () => {
    component.segmentChanged({ detail: { value: 'videos' } });
    expect(component.segmentValue).toBe('videos');
  });
});
