import { isPlatformBrowser } from '@angular/common';
import {
  HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';


/** Inject With Credentials into the request */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(@Inject(PLATFORM_ID) private platformId: any) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    const isServer = isPlatformBrowser(this.platformId) != true;
    if(isServer){
      request = request.clone({
        headers: this.mergeHeader(request.headers, 'BnaturaliaWebServer', 'true')
      });
    }
      
    if (!isServer) {
      request = request.clone({
        headers: this.mergeHeader(request.headers, 'Authorization', 'Bearer ' + AuthService.getLocalToken())
      });
      
      if(!request.headers.get('ClientLanguage')){
        request = request.clone({
          headers: this.mergeHeader(request.headers, 'ClientLanguage', localStorage.getItem('language') || 'en')
        });
      }

      request = request.clone({ withCredentials: true });
    }

    request = request.clone({
      headers: this.mergeHeader(request.headers, 'Content-Type', 'application/json; charset=utf-8')
    });
    request = request.clone({
      headers: this.mergeHeader(request.headers, 'Accept', 'application/json')
    });

    return next.handle(request);
  }

  private mergeHeader(headers: HttpHeaders, key: string, value: any): HttpHeaders {
    const headerItem = headers.get(key);
    if (headerItem && headerItem === '--disable') {
      return headers.delete(key);
    }
    return headers.set(key, value);
  }
}