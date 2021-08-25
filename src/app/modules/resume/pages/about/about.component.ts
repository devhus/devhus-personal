import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentBase } from './../../../../common/helpers/mixins/component-base';
import { ResumeInfo } from './../../models/resume-info.interface';
import { InfoService } from './../../services/info/info.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent extends ComponentBase implements OnInit {


  loading$: Observable<boolean>;
  info$: Observable<ResumeInfo>;

  currentYear: number;
  desktopExperienceYears: number;


  constructor(
    private infoService: InfoService,
  ) {
    super();
    this.loading$ = this.infoService.loading$.asObservable();
    this.info$ = this.infoService.info$.asObservable();

    this.currentYear = new Date().getFullYear();
    this.desktopExperienceYears = this.currentYear - 2018;
  }

  ngOnInit(): void {
    if (this.infoService.fected$.value === false) {
      this.recordSubscription(
        this.infoService.fetch().subscribe()
      );
    }
  }
}
