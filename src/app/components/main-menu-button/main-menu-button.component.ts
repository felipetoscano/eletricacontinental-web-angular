import { Component, Input } from '@angular/core';

@Component({
  selector: 'main-menu-button',
  templateUrl: './main-menu-button.component.html',
  styleUrls: ['./main-menu-button.component.css']
})
export class MainMenuButtonComponent {

  @Input() title: String;

  constructor() {
    this.title = "";
  }

}
