// Importamos los decoradores y funciones necesarias de Angular y Firebase
import { Injectable } from '@angular/core';
import { 
  Auth,                // Módulo principal de autenticación de Firebase
  signInWithPopup,     // Método para iniciar sesión mediante un popup (Google, GitHub, etc.)
  GoogleAuthProvider,  // Proveedor de autenticación de Google
  GithubAuthProvider,  // Proveedor de autenticación de GitHub
  signOut              // Método para cerrar sesión
} from '@angular/fire/auth';
import { Router } from '@angular/router'; // Permite redirigir entre rutas
import { signInWithEmailAndPassword } from '@angular/fire/auth'; // Iniciar sesión con correo y contraseña

// Decorador que indica que este servicio estará disponible en toda la aplicación
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Inyectamos el módulo de autenticación de Firebase y el enrutador de Angular
  constructor(private auth: Auth, private router: Router) {}

  // 🔹 MÉTODO: Iniciar sesión con Google
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider(); // Creamos un proveedor de Google
    try {
      // Abrimos el popup de autenticación con Google
      const result = await signInWithPopup(this.auth, provider);
      console.log('✅ Google login:', result.user); // Mostramos en consola el usuario autenticado
      return result.user; // Retornamos los datos del usuario
    } catch (error) {
      // Si ocurre un error durante la autenticación
      console.error('❌ Error en Google login:', error);
      throw error; // Lanzamos el error para manejarlo en otro lugar
    }
  }

  // 🔹 MÉTODO: Iniciar sesión con GitHub
  async loginWithGitHub() {
    const provider = new GithubAuthProvider(); // Creamos un proveedor de GitHub
    try {
      // Abrimos el popup de autenticación con GitHub
      const result = await signInWithPopup(this.auth, provider);
      console.log('✅ GitHub login:', result.user); // Mostramos el usuario autenticado
      return result.user; // Retornamos los datos del usuario
    } catch (error) {
      console.error('❌ Error en GitHub login:', error);
      throw error; // Lanzamos el error para manejarlo fuera
    }
  }

  // 🔹 MÉTODO: Iniciar sesión con correo y contraseña
  async loginWithEmail(email: string, password: string) {
    try {
      // Llamamos a Firebase para autenticar con email y contraseña
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      return result.user; // Si es exitoso, retornamos el usuario autenticado
    } catch (error) {
      // Si ocurre un error (por ejemplo, contraseña incorrecta o usuario no existe)
      console.error('❌ Error en login con correo:', error);
      throw error; // Enviamos el error hacia quien llamó la función
    }
  }

  // 🔹 MÉTODO: Cerrar sesión
  async logout() {
    // Cerramos la sesión en Firebase
    await signOut(this.auth);
    // Redirigimos al usuario a la página de login
    this.router.navigate(['/login']);
  }
}
