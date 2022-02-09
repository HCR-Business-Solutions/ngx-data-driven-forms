import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApplicationStateManagerService} from '../../services';
import {Subscription} from 'rxjs';
import {Application, IApplicationMeta} from '../../../shared';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'ddforms-form-container',
  templateUrl: './form-container.component.html',
  styles: [
  ]
})
export class FormContainerComponent implements OnInit, OnDestroy {

  private meta$ = this.appStateSvc.currentApplicationMeta$;
  private config$ = this.appStateSvc.currentApplicationConfig$;
  private control$ = this.appStateSvc.currentApplicationControl$;

  public meta: IApplicationMeta | null | undefined;
  public config: Application | null | undefined;
  public control: AbstractControl | null | undefined;

  private subscriptions: Subscription[] = []

  constructor(
    private appStateSvc: ApplicationStateManagerService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.meta$.subscribe(_ => this.meta = _));
    this.subscriptions.push(this.config$.subscribe(_ => this.config = _));
    this.subscriptions.push(this.control$.subscribe(_ => this.control = _));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(_ => {
      if (_ && !_.closed) _.unsubscribe();
    });
  }

}
