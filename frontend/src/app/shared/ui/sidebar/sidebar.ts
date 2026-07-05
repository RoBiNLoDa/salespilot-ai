import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatNavList } from "@angular/material/list";

@Component({
  selector: 'app-sidebar',
  imports: [MatIcon, MatNavList],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

}
