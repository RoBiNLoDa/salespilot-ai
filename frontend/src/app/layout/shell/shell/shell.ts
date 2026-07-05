import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Logo } from "@shared/ui/logo/logo";
import { Toolbar } from "@shared/ui/toolbar/toolbar";
import { Sidebar } from "@shared/ui/sidebar/sidebar";

@Component({
  selector: 'app-shell',
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    RouterOutlet,
    Logo,
    Toolbar,
    Sidebar
],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {

}
