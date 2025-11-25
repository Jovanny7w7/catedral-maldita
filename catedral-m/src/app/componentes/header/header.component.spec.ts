import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { IonicModule } from '@ionic/angular';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('Debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe aceptar un título como input', () => {
    const tituloMock = 'Página de Prueba';
    component.title = tituloMock;
    fixture.detectChanges();
    expect(component.title).toBe(tituloMock);
  });

  it('Debe aceptar un historial como input', () => {
    const historialMock = ['Inicio', 'Noticias'];
    component.history = historialMock;
    fixture.detectChanges();
    expect(component.history).toEqual(historialMock);
  });

  it('Debe aceptar un logo opcional', () => {
    const logoMock = 'https://example.com/logo.png';
    component.logoUrl = logoMock;
    fixture.detectChanges();
    expect(component.logoUrl).toBe(logoMock);
  });

  it('Debe aceptar la foto de usuario opcional', () => {
    const fotoMock = 'https://example.com/user.png';
    component.userPhotoUrl = fotoMock;
    fixture.detectChanges();
    expect(component.userPhotoUrl).toBe(fotoMock);
  });
});
