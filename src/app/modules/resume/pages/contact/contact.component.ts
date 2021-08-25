import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentBase } from './../../../../common/helpers/mixins/component-base';
import { ResumeInfo } from './../../models/resume-info.interface';
import { ContactService } from './../../services/contact/contact.service';
import { InfoService } from './../../services/info/info.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends ComponentBase implements OnInit {


  loading$: Observable<boolean>;
  info$: Observable<ResumeInfo>;

  sending$: Observable<boolean>;
  fInputSubject: string = "";
  fInputEmail: string = "";
  fInputMessage: string = "";

  constructor(
    private contactService: ContactService,
    private infoService: InfoService,
  ) {
    super();
    this.sending$ = this.contactService.sending$.asObservable();
    this.loading$ = this.infoService.loading$.asObservable();
    this.info$ = this.infoService.info$.asObservable();
  }

  ngOnInit(): void {
    if (this.infoService.fected$.value === false) {
      this.recordSubscription(
        this.infoService.fetch().subscribe()
      );
    }
  }

  submit() {
    this.recordSubscription(
      this.contactService.message(
        this.fInputEmail,
        this.fInputSubject,
        this.fInputMessage
      ).subscribe(res => {

      })
    )
  }

}
