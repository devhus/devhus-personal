import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ComponentBase } from './../../../../common/helpers/mixins/component-base';
import { Platform } from './../../../../common/helpers/utilities';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends ComponentBase implements OnInit {


  constructor(
    private router: Router,
  ) { 
    super();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.recordSubscription(
      this.router.events.subscribe(e => {
        if(e instanceof NavigationEnd){
          this.toggleMobileMenu(true);
        }
      })
    )
  }
  
  toggleMobileMenu(hide?: boolean) {
    if (Platform.isBrowser) {
      const bodyElm = document.querySelector('body');
      if (bodyElm) {
        if (bodyElm.classList.contains('expand-navbar') || hide) {
          bodyElm.classList.remove('expand-navbar');
          return;
        }

        bodyElm.classList.add('expand-navbar');
      }
    }
  }

}
