import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class ServiceBase implements OnDestroy {
  private _cUnsubscribeSubject: Subscription[] = [];

  protected recordSubscription(...subs: Subscription[]) {
    this._cUnsubscribeSubject.push(...subs)
  }

  ngOnDestroy(): void {
    this._cUnsubscribeSubject.forEach(sub => {
      sub.unsubscribe();
    });
    this._cUnsubscribeSubject = [];
  }
}