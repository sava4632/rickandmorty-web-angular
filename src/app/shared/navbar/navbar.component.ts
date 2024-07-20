import { Component } from '@angular/core';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styles: `
    nav{
      height: 65px;
    }

    img {
      max-width: 50px;
    }
  `
})
export class NavbarComponent {}
