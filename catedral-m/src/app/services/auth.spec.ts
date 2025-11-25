import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let authMock: Partial<Auth>;
  let routerMock: Partial<Router>;

  beforeEach(() => {
    // Creamos un mock mínimo de AuthService
    authMock = {
      signOut: () => Promise.resolve()
    } as any;

    // Mock del router
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Auth, useValue: authMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('El servicio debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('logout debe cerrar sesión y redirigir al login', async () => {
    await service.logout();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
