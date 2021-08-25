import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AlertService } from './../alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnDestroy {

  private subs: Subscription[] = [];
  //private AUTH_STORAGE_NAME: string = `${environment.appVersion}_auth`;

  constructor(
    private http: HttpClient,
    private alerts: AlertService,
  ) {
    //this.setupCSRFCookie();
  }

  private setupCSRFCookie() {
    this.subs.push(
      this.get('sanctum/csrf-cookie').pipe(take(1)).subscribe(res => {
      })
    )
  }

  // private getHreaders(changes?: HttpHeaders | { [header: string]: string | string[]; } | undefined) {
  //   let headers: any = {
  //     "Accept": "application/json",
  //     "Content-Type": "application/json; charset=utf-8",
  //     "Authorization": `Bearer ${this.getLocalToken()}`,
  //     "ClientLanguage": localStorage.getItem('language') || '',
  //   };

  //   if (changes) {
  //     const disableArg = '--disable';
  //     if (changes instanceof HttpHeaders) {
  //       for (const key of changes.keys()) {
  //         if (changes.get(key) === disableArg) {
  //           delete headers[key];
  //           continue;
  //         }
  //         headers[key] = changes.get(key);
  //       }
  //     } else if (changes instanceof Array) {
  //       for (const key of changes) {
  //         if (changes[key] === disableArg) {
  //           delete headers[key];
  //           continue;
  //         }
  //         headers[key] = changes[key];
  //       }
  //     } else {
  //       for (const key of Object.keys(changes)) {
  //         if (changes[key] === disableArg) {
  //           delete headers[key];
  //           continue;
  //         }
  //         headers[key] = changes[key];
  //       }
  //     }
  //   }
  //   return new HttpHeaders(headers);
  // }

  private parameters(params: any) {
    if (!params) return params;
    const pKeys = Object.keys(params);
    if (pKeys && pKeys.length > 0) {
      for (const key of pKeys) {
        if (params[key] === undefined || params[key] === null)
          delete params[key];
      }
    }
    return params;
  }

  public request = (
    requestType: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE',
    controller: string,
    body: any = undefined,
    options: {
      headers?: HttpHeaders;
      reportProgress?: boolean;
      params?: HttpParams;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    } = {}
  ): Observable<HttpEvent<any>> => {

    // options.headers = this.getHreaders(options?.headers);
    const bodyParams = this.parameters(body);
    if (!environment.production) {
      console.log(`[request-${requestType}]`.toUpperCase(), controller, bodyParams);
    }
    const req = new HttpRequest(requestType, `${environment.apiUrl}/admin/file-manager/entries`, bodyParams, options);
    return this.http.request<HttpEvent<any>>(req);
  }

  public get = <T = any>(
    controller: string,
    params: any = undefined,
    options: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'body';
      params?: HttpParams | {
        [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    } = {},
    external: boolean = false
  ): Observable<T> => {
    let url = external ? controller : `${environment.apiUrl}/${controller}`;
    const bodyParams = this.parameters(params);
    url = params == undefined ? url : `${url}?${this.objectSerialize(bodyParams)}`
    // options.headers = this.getHreaders(options?.headers);
    if (!environment.production) {
      console.log('[get]'.toUpperCase(), controller, url, bodyParams);

    }

    return this.http
      .get<T>(url, options)
      .pipe(
        map(response => {
          return this.handleHttpResponse(controller, response)
        }),
        catchError((err) => this.handleHttpError(err))
      );
  }

  public post = <T = any>(
    controller: string,
    body: any = undefined,
    options: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'body';
      params?: HttpParams | {
        [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    } = {}
  ): Observable<T> => {

    // options.headers = this.getHreaders(options?.headers);
    const bodyParams = this.parameters(body);
    if (!environment.production) {
      console.log('[post]'.toUpperCase(), controller, bodyParams);

    }
    return this.http
      .post<T>(`${environment.apiUrl}/${controller}`, bodyParams, options)
      .pipe(
        map(response => this.handleHttpResponse(controller, response)),
        catchError((err) => this.handleHttpError(err))
      );
  }

  public put = <T = any>(
    controller: string,
    body: any = undefined,
    options: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'body';
      params?: HttpParams | {
        [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    } = {}
  ): Observable<T> => {
    // options.headers = this.getHreaders(options?.headers);
    const bodyParams = this.parameters(body);
    if (!environment.production) {
      console.log('[put]'.toUpperCase(), controller, bodyParams);
    }

    return this.http
      .put<T>(`${environment.apiUrl}/${controller}`, bodyParams, options)
      .pipe(
        map(response => this.handleHttpResponse(controller, response)),
        catchError((err) => this.handleHttpError(err))
      );
  }

  public patch = <T = any>(
    controller: string,
    body: any = undefined,
    options: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'body';
      params?: HttpParams | {
        [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    } = {}
  ): Observable<T> => {
    // options.headers = this.getHreaders(options?.headers);
    const bodyParams = this.parameters(body);
    if (!environment.production) {
      console.log('[patch]'.toUpperCase(), controller, bodyParams);

    }

    return this.http
      .patch<T>(`${environment.apiUrl}/${controller}`, bodyParams, options)
      .pipe(
        map(response => this.handleHttpResponse(controller, response)),
        catchError((err) => this.handleHttpError(err))
      );
  }

  public delete = <T = any>(
    controller: string,
    options: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'body';
      params?: HttpParams | {
        [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    } = {}
  ): Observable<T> => {
    // options.headers = this.getHreaders(options?.headers);
    if (!environment.production) {
      console.log('[delete]'.toUpperCase(), controller);

    }
    return this.http
      .delete<T>(`${environment.apiUrl}/${controller}`, options)
      .pipe(
        map(response => this.handleHttpResponse(controller, response)),
        catchError((err) => this.handleHttpError(err))
      );
  }

  private objectSerialize = function (obj: any) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  // private getLocalToken(): string | null | undefined {
  //   return localStorage.getItem(this.AUTH_STORAGE_NAME);
  // }

  private handleHttpResponse(controller: string, response: any) {
    if (environment.production == false) {
      console.log(`[RESPONSE] ${controller}: `, response);
    }
    return response;
  }

  // private handleHttpReuqest(type: string, controller: string, body: any = undefined, headers: HttpHeaders) {
  //   if (environment.production == false) {
  //     console.log(
  //       `[${type.toUpperCase()}] ${controller}: `,
  //       body,
  //       headers
  //     );
  //   }
  // }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private handleHttpError(response: Response | any): Observable<any> {
    // switch (response.status) {
    //   case 403:
    //   case 422:

    //     break;
    // }
    if (response.error) {
      let errorsBody: undefined | string = undefined;

      if (response.error.errors) {
        const errorsKeys = Object.keys(response.error.errors);
        if (errorsKeys[0]) {
          const error = response.error.errors[errorsKeys[0]];
          errorsBody = (Array.isArray(error) ? error[0] : error) ?? '';
        }
      }
      this.alerts.messageBox(response.error.message, errorsBody, 'error');
    }
    return throwError(response);
  }

}
