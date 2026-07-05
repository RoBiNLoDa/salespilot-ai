import { Component } from '@angular/core';
import { Login } from "@features/auth/pages/login/login";

@Component({
  selector: 'app-auth-layout',
  imports: [Login],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {

}
