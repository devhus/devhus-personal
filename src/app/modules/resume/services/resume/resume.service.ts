import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { ApiService } from 'src/app/common/services/api/api.service';
import { SettingService } from './../../../settings/services/settings/setting.service';
import { ResumeSection } from './../../models/resume-section.interface';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  
  fected$ = new BehaviorSubject<boolean>(false);
  loading$ = new BehaviorSubject<boolean>(false);
  sections$ = new BehaviorSubject<ResumeSection[]>([]);

  constructor(
    private api: ApiService,
    private settings: SettingService,
  ) {

  }

  fetch() {
    this.loading$.next(true);
    return this.api.get<ResumeSection[]>('settings/resume').pipe(
      take(1),
      finalize(() => {
        this.loading$.next(false);
        this.fected$.next(true);
      }),
      map(res => {
        this.sections$.next(Object.values(res).map(i => new ResumeSection(i)));
        return this.sections$.value;
      })
    )
  }

  update(sections: ResumeSection[]) {
    this.loading$.next(true);
    return this.api.post<ResumeSection[]>('settings/resume', { ...sections, access_token: this.settings.accessToken }).pipe(
      take(1),
      finalize(() => this.loading$.next(false)),
      map(res => {
        this.sections$.next(Object.values(res).map(i => new ResumeSection(i)));
        return this.sections$.value;
      })
    );
  }
}
