import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentBase } from './../../../../common/helpers/mixins/component-base';
import { Platform } from './../../../../common/helpers/utilities';
import { ResumeInfo } from './../../../resume/models/resume-info.interface';
import { InfoService } from './../../../resume/services/info/info.service';

@Component({
  selector: 'app-settings-form-info',
  templateUrl: './settings-form-info.component.html',
  styleUrls: ['./settings-form-info.component.scss']
})
export class SettingsFormInfoComponent extends ComponentBase implements OnInit {

  loading$: Observable<boolean>;
  info: ResumeInfo = new ResumeInfo();

  constructor(
    private infoService: InfoService,
  ) {
    super();
    this.loading$ = this.infoService.loading$.asObservable();
  }

  ngOnInit(): void {
    if (Platform.isBrowser) {
      this.recordSubscription(
        this.infoService.fetch().subscribe(info => {
          this.info = Object.assign(new ResumeInfo(), info);
        })
      )
    }
  }

  save() {
    this.recordSubscription(
      this.infoService.update(this.info).subscribe(info => {
        this.info = Object.assign(new ResumeInfo(), info);
      })
    );
  }

}
