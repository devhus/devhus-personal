import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { ApiService } from 'src/app/common/services/api/api.service';
import { KeyValueObject } from './../../../../common/types/key-value-object';
import { SettingService } from './../../../settings/services/settings/setting.service';
import { Project } from './../../models/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  categories: KeyValueObject = {
    all: 'All Categories',
    web: 'Web Development',
    desktop: 'desktop Development',
    design: 'Graphic & Digital Design'
  };
  //['all', 'web', 'desktop', 'design'];

  fected$ = new BehaviorSubject<boolean>(false);
  loading$ = new BehaviorSubject<boolean>(false);
  projects$ = new BehaviorSubject<Project[]>([]);

  constructor(
    private api: ApiService,
    private settings: SettingService,
  ) {

  }

  fetch() {
    this.loading$.next(true);
    return this.api.get<Project[]>('settings/projects').pipe(
      take(1),
      finalize(() => {
        this.loading$.next(false);
        this.fected$.next(true);
      }),
      map(res => {
        this.projects$.next(Object.values(res).map(i => new Project(i)));
        return this.projects$.value;
      })
    )
  }

  getIndex(project: Project){
    return this.projects$.value.findIndex(p => p === project);
  }
  
  findByIndex(index: number) {
    return this.projects$.pipe(
      map(ps => ps[index])
    )
  }

  findBySlug(slug: string) {
    return this.projects$.pipe(
      map(ps => ps.find(p => p.slug === slug))
    )
  }

  update(projects: Project[]) {
    this.loading$.next(true);
    return this.api.post<Project[]>('settings/projects', {
      ...(projects.map(p => {
        return { ...p, slug: p.slug };
      })), access_token: this.settings.accessToken
    }).pipe(
      take(1),
      finalize(() => this.loading$.next(false)),
      map(res => {
        this.projects$.next(Object.values(res).map(i => new Project(i)));
        return this.projects$.value;
      })
    );
  }
}
