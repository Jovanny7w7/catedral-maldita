import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginPage } from './login.page';
import { AuthService } from 'src/app/services/auth';
import { of } from 'rxjs';

// Creamos mocks simples
class AuthServiceMock {
  loginWithEmail = jasmine.createSpy('loginWithEmail').and.returnValue(Promise.resolve({ uid: '123', email: 'test@mail.com' }));
  loginWithGoogle = jasmine.createSpy('loginWithGoogle').and.returnValue(Promise.resolve({ uid: '123', email: 'google@mail.com' }));
  loginWithGitHub = jasmine.createSpy('loginWithGitHub').and.returnValue(Promise.resolve({ uid: '123', email: 'github@mail.com' }));
}

class RouterMock {
  navigate = jasmine.createSpy('navigate');
}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authService: AuthServiceMock;
  let router: RouterMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useClass: RouterMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as unknown as AuthServiceMock;
    router = TestBed.inject(Router) as unknown as RouterMock;
    fixture.detectChanges();
  });

  it('El componente debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('loginEmail debe autenticar y redirigir al inicio', async () => {
    await component.loginEmail('test@mail.com', '123456');
    expect(authService.loginWithEmail).toHaveBeenCalledWith('test@mail.com', '123456');
    expect(router.navigate).toHaveBeenCalledWith(['/inicio']);
  });

  it('loginGoogle debe autenticar y redirigir al inicio', async () => {
    await component.loginGoogle();
    expect(authService.loginWithGoogle).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/inicio']);
  });

  it('loginGitHub debe autenticar y redirigir al inicio', async () => {
    await component.loginGitHub();
    expect(authService.loginWithGitHub).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/inicio']);
  });
});
