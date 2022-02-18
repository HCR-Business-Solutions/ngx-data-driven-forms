import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  ApplicationStateManagerService,
  DataDrivenFormsEventsService, DDFormsBackEvent,
  DDFormsEvent,
  DDFormsNextEvent, DDFormsSubmitEvent, 
} from '../../services';
import {Subscription, tap} from 'rxjs';
import {Application, IApplicationMeta, Page} from '../../../shared';
import {AbstractControl} from '@angular/forms';

declare var $: any;

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

  private readonly events$ = this.eventSvc.events$.pipe(
    tap(event => this.handleEvent(event)),
  );

  public meta: IApplicationMeta | null | undefined;
  public config: Application | null | undefined;
  public control: AbstractControl | null | undefined;

  private subscriptions: Subscription[] = []

  constructor(
    private appStateSvc: ApplicationStateManagerService,
    private eventSvc: DataDrivenFormsEventsService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.meta$.subscribe(_ => this.meta = _));
    this.subscriptions.push(this.config$.subscribe(_ => this.config = _));
    this.subscriptions.push(this.control$.subscribe(_ => this.control = _));
    this.subscriptions.push(this.events$.subscribe());
    
  }

  showDialog(){
    let modal_t  = document.getElementById('modal_1')!
    modal_t.classList.remove('hhidden')
    modal_t.classList.add('sshow');
}
closeDialog() {
    let modal_t  = document.getElementById('modal_1')!
    modal_t.classList.remove('sshow')
    modal_t.classList.add('hhidden');
}
  ngOnDestroy(): void {
    this.subscriptions.forEach(_ => {
      if (_ && !_.closed) _.unsubscribe();
    });
  }

  public get currentPageConfig(): Page | null | undefined {

    if (!this.config || !this.control || !this.meta) return null;
    return this.config.pages[this.meta.currentPage] ?? undefined;

  }

  public get currentPageControl(): AbstractControl | null | undefined {
    if (!this.config || !this.control || !this.meta) return null;
    if (!this.currentPageConfig) return undefined;
    return this.control.get(this.currentPageConfig.id);

  }

  private handleEvent(event: DDFormsEvent | null | undefined): void {
    if (!event) return;
    if(event.type === 'next') {this.handleNextEvent(event as DDFormsNextEvent); return;}
    if(event.type === 'submit') {this.handleSubmitEvent(event as DDFormsSubmitEvent); return;}
    if(event.type === 'back') {this.handleBackEvent(event as DDFormsBackEvent); return;}
  }

  private handleBackEvent(event: DDFormsBackEvent): void {

    if (event.payload.currentPage < 0 || event.payload.targetPage < 0) return;

    const isValid = event.payload.skipValidation ? true : this.currentPageControl?.valid ?? false;

    if (isValid) {
      this.appStateSvc.goToPage(event.payload.targetPage);
      return;
    }

    if (!this.currentPageControl?.touched) {
      this.appStateSvc.goToPage(event.payload.targetPage);
      return;

    }

    // TODO: Put Modal Here




    

    this.currentPageControl?.markAllAsTouched();
  }


  private handleNextEvent(event: DDFormsNextEvent): void {
    if (event.payload.currentPage < 0 || event.payload.targetPage < 0) return;

    const pageValid = event.payload.skipValidation ? true : this.currentPageControl?.valid ?? false;
    if (pageValid) {
      this.appStateSvc.goToPage(event.payload.targetPage);
      return;
    }
    this.currentPageControl?.markAllAsTouched();
  }

  private handleSubmitEvent(event: DDFormsSubmitEvent) {
    if (!this.control || !this.config) return;
    if (event.payload.currentPage < 0) return;

    const pageValid = event.payload.skipPageValidation ? true : this.currentPageControl?.valid ?? false;
    const applicationValid = event.payload.skipApplicationValidation ? true : this.control.valid ?? false;

    if (!pageValid) {
      this.currentPageControl?.markAllAsTouched();
      return;
    }

    if (!applicationValid) {
      // TODO : Popup saying... something about not being able to submit.
      this.control.markAllAsTouched();
      return;
    }
  }

}
