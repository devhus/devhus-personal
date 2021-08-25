import { isPlatformServer } from '@angular/common';
import { Component, Inject, Injector, PLATFORM_ID } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { Platform } from './common/helpers/utilities';
import { MetaManagementService } from './common/services/meta-builder/meta-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private mms: MetaManagementService,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    const isServer = isPlatformServer(platformId);
    Platform.isServer = isServer;
    Platform.isBrowser = !isServer;

    if (Platform.isBrowser) {
      const wowjsService = this.injector.get(NgwWowService);
      wowjsService.init({
        boxClass: 'wow',
        animateClass: 'animate__animated',
        offset: 0,
        mobile: true,
        live: true
      });
    }
  }
}
