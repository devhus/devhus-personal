import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { ApiService } from 'src/app/common/services/api/api.service';
import { SettingService } from './../../../settings/services/settings/setting.service';
import { ResumeInfo } from './../../models/resume-info.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  loading$ = new BehaviorSubject<boolean>(false);
  info$ = new BehaviorSubject<ResumeInfo>(new ResumeInfo());
  fected$ = new BehaviorSubject<boolean>(false);

  constructor(
    private api: ApiService,
    private settings: SettingService,
  ) {

  }

  fetch() {
    this.loading$.next(true);
    return this.api.get<ResumeInfo>('settings/info').pipe(
      take(1),
      finalize(() => {
        this.loading$.next(false);
        this.fected$.next(true);
      }),
      map(res => {
        this.info$.next(new ResumeInfo(res));
        return this.info$.value;
      })
    )
  }

  update(info: ResumeInfo) {
    this.loading$.next(true);
    return this.api.post('settings/info', { ...info, access_token: this.settings.accessToken }).pipe(
      take(1),
      finalize(() => this.loading$.next(false)),
      map(res => {
        this.info$.next(new ResumeInfo(res));
        return this.info$.value;
      })
    );
  }
}
