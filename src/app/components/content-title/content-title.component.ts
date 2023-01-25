import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content-title',
  templateUrl: './content-title.component.html',
  styleUrls: ['./content-title.component.css']
})

export class ContentTitleComponent {

  @Input() text: String;

  constructor(){
    this.text = "";
  }
}
