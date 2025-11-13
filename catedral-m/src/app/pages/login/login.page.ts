// Importaciones necesarias de Angular, Ionic y servicios personalizados
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonIcon, IonContent } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth'; // Servicio de autenticación personalizado
import { Router } from '@angular/router'; // Permite redirigir entre páginas

// Decorador @Component define los metadatos del componente
@Component({
  selector: 'app-login', // Nombre del componente (etiqueta HTML)
  templateUrl: './login.page.html', // Archivo HTML asociado
  styleUrls: ['./login.page.scss'], // Estilos específicos del componente
  standalone: true, // Indica que este componente no depende de un módulo
  imports: [IonButton, IonIcon, IonContent, CommonModule, FormsModule], // Módulos e Ionic Components usados
})
export class LoginPage {
  // Se inyectan el servicio de autenticación y el router para navegación
  constructor(private authService: AuthService, private router: Router) {}

  // Método para iniciar sesión con correo y contraseña
  async loginEmail(email: string, password: string) {
    try {
      // Llama al método del servicio de autenticación
      const user = await this.authService.loginWithEmail(email, password);
      console.log('✅ Usuario autenticado:', user); // Muestra en consola el usuario autenticado
      this.router.navigate(['/inicio']); // Redirige a la página principal tras iniciar sesión
    } catch (error: any) {
      // Si ocurre un error (por ejemplo, credenciales incorrectas)
      console.error('❌ Error al iniciar sesión:', error.message);
      alert('Correo o contraseña incorrectos'); // Muestra alerta al usuario
    }
  }

  // Método para iniciar sesión con Google
  async loginGoogle() {
    try {
      const user = await this.authService.loginWithGoogle(); // Llama al método del servicio
      this.router.navigate(['/inicio']); // Redirige al inicio tras autenticarse
    } catch (error) {
      console.error(error); // Muestra error si algo falla
    }
  }

  // Método para iniciar sesión con GitHub
  async loginGitHub() {
    try {
      const user = await this.authService.loginWithGitHub(); // Llama al método del servicio
      this.router.navigate(['/inicio']); // Redirige al inicio
    } catch (error) {
      console.error(error); // Muestra error si ocurre algún fallo
    }
  }
}
