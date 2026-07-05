import { Component, inject } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@features/auth/services/auth.service';

@Component({
  selector: 'app-toolbar',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {
  authService = inject(AuthService);

  
  
}
