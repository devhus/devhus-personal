import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentBase } from './../../../../common/helpers/mixins/component-base';
import { Platform } from './../../../../common/helpers/utilities';
import { ResumeSection } from './../../../resume/models/resume-section.interface';
import { ResumeService } from './../../../resume/services/resume/resume.service';

@Component({
  selector: 'app-settings-form-resume',
  templateUrl: './settings-form-resume.component.html',
  styleUrls: ['./settings-form-resume.component.scss']
})
export class SettingsFormResumeComponent extends ComponentBase implements OnInit {

  loading$: Observable<boolean>;
  sections$ = new BehaviorSubject<ResumeSection[]>([]);
  experienceSections$: Observable<ResumeSection[]>;
  skillSections$: Observable<ResumeSection[]>;

  activeId: string = '';

  constructor(
    private resumeService: ResumeService,
  ) {
    super();
    this.loading$ = this.resumeService.loading$.asObservable();
    this.experienceSections$ = this.sections$.pipe(
      map(s => s.filter(s => s.type === 'experience'))
    );
    this.skillSections$ = this.sections$.pipe(
      map(s => s.filter(s => s.type === 'skill'))
    );
  }

  ngOnInit(): void {
    if (Platform.isBrowser) {
      this.recordSubscription(
        this.resumeService.fetch().subscribe(sections => {
          this.sections$.next(sections.map(p => p));
        })
      )
    }
  }

  save() {
    this.recordSubscription(
      this.resumeService.update(this.sections$.value).subscribe(sections => {
        this.sections$.next(sections.map(p => p));
      })
    );
  }

  add(type: string = 'experience', section?: ResumeSection) {
    const listArray = [...this.sections$.value];
    listArray.unshift(section ?? new ResumeSection({
      type: type
    }));
    this.sections$.next(listArray);
  }

  remove(section: ResumeSection) {
    const listArray = [...this.sections$.value];
    listArray.splice(this.sections$.value.indexOf(section), 1);
    this.sections$.next(listArray);
  }

}
