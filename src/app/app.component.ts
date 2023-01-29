import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

    navigationLinks: any[];
    activeLinkIndex = -1;

    constructor(private router: Router) {
      this.navigationLinks = [
        {
            label: 'Home',
            link: './home',
            index: 0
        }, 
        {
            label: 'Sobre',
            link: './about',
            index: 1
        }, 
        {
            label: 'Contato',
            link: './contact',
            index: 2
        }, 
        {
          label: 'Login',
          link: './login',
          index: 3
      }
    ];
  }
  
  ngOnInit(): void {
    this.router.events.subscribe((_) => {
        this.activeLinkIndex = this.navigationLinks.indexOf(this.navigationLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }
}
