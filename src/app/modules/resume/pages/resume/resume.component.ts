import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentBase } from './../../../../common/helpers/mixins/component-base';
import { ResumeSection } from './../../models/resume-section.interface';
import { ResumeService } from './../../services/resume/resume.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent extends ComponentBase implements OnInit {


  loading$: Observable<boolean>;
  experienceSections$: Observable<ResumeSection[]>;
  skillSections$: Observable<ResumeSection[]>;

  constructor(
    private resumeService: ResumeService,
  ) {
    super();
    this.loading$ = this.resumeService.loading$.asObservable();
    this.experienceSections$ = this.resumeService.sections$.pipe(
      map(s => s.filter(s => s.type === 'experience'))
    );
    this.skillSections$ = this.resumeService.sections$.pipe(
      map(s => s.filter(s => s.type === 'skill'))
    );
  }

  ngOnInit(): void {
    if (this.resumeService.fected$.value === false) {
      this.recordSubscription(
        this.resumeService.fetch().subscribe()
      );
    }
  }
}
