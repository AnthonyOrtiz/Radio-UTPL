import { AuthServiceService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './../../../radio/services/firebase.service';
import { User } from '../../../shared/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'auth-register-page',
    templateUrl: './register-page.component.html',
    styleUrl: './register-page.component.css',
    standalone: false
})
export class RegisterPageComponent {
  user: User = {
    uid: '',
    id: '',
    names: '',
    email: '',
    password: '',
    isAdmin: false,
  }
  confirmPassword: string = '';

  constructor(
    private firestore: FirestoreService,
    private auth: AuthServiceService,
    private router: Router){
  }
  
  ngOnInit(): void {
    
  }

  async register(){
    if (this.user.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }
     const datos = {
      email: this.user.email,
      password: this.user.password,
    }
    const res = await this.auth.register(datos).catch( error => {
      console.log('error');
    })
    if (res && res.user) {
      const path = 'user'
      const id = res.user.uid
      this.user.id = id
      this.user.uid = id
      this.user.password = '';
      this.firestore.createDoc(this.user, path, id)
      this.router.navigate(['radio-utpl/inicio'])
    }
  }
}
