import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

// Mock de Router
const routerMock = {
  navigate: jasmine.createSpy('navigate')
};

// Mock de Auth
const authMock = {
  onAuthStateChanged: (callback: (user: any) => void) => {
    callback({ uid: '123', email: 'test@test.com' });
  }
};

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // NO incluimos imports de Ionic ni template
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: Auth, useValue: authMock }
      ]
    }).compileComponents();

    // Creamos instancia directamente sin template
    component = new AppComponent(authMock as any, routerMock as any);
  });

  it('El componente AppComponent debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe existir el método ngOnInit', () => {
    expect(component.ngOnInit).toBeTruthy();
  });

  it('Debe redirigir a inicio si hay un usuario autenticado (mock)', () => {
    component.ngOnInit();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/inicio']);
  });
});
