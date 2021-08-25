import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  template: ''
})
export class ComponentBase implements OnDestroy {

  private _cUnsubscribeSubject: Subscription[] = [];

  constructor() {
  }

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
