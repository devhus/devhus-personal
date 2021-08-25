import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { ApiService } from 'src/app/common/services/api/api.service';
import { AlertService } from './../../../../common/services/alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  sending$ = new BehaviorSubject<boolean>(false);

  constructor(
    private api: ApiService,
    private alerts: AlertService,
  ) {

  }

  message(email: string, subject: string, message: string) {
    this.sending$.next(true);
    return this.api.post('contact', {
      email,
      subject,
      message
    }).pipe(
      take(1),
      finalize(() => this.sending$.next(false)),
      map(res => {
        this.alerts.messageBox('Message sent!', "Your message has been successfully sent.", "success");
        return res;
      })
    )
  }
}
