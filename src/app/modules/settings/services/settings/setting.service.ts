import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { ApiService } from 'src/app/common/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  authed$ = new BehaviorSubject<boolean>(false);
  get authed() {
    return this.authed$.value;
  }
  loading$ = new BehaviorSubject<boolean>(false);
  get loading() {
    return this.loading$.value;
  }
  accessToken$ = new BehaviorSubject<string>('');
  get accessToken() {
    return this.accessToken$.value;
  }
  set accessToken(token: string) {
    this.accessToken$.next(token);
  }

  constructor(
    private api: ApiService,
  ) {

  }

  auth() {
    this.loading$.next(true);
    return this.api.post('auth', {
      access_token: this.accessToken,
    }).pipe(
      take(1),
      finalize(() => this.loading$.next(false)),
      map(res => {
        this.authed$.next(true);
        return res;
      })
    )
  }
}
