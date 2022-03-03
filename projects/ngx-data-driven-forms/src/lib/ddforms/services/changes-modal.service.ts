import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangesModalService {

  private isOpen: BehaviorSubject<boolean | undefined> = new BehaviorSubject<boolean | undefined>(false);
  public isOpen$: Observable<boolean | undefined> = this.isOpen.asObservable();

  private dialogResult: BehaviorSubject<boolean | null | undefined> = new BehaviorSubject<boolean | null | undefined>(undefined);
  public dialogResult$: Observable<boolean | null | undefined> = this.dialogResult.asObservable();

  constructor() {
  }

  public openDialog(): void {
    this.isOpen.next(true);
  }

  public closeDialog(): void {
    this.isOpen.next(false);
  }

  public setDialogResult(dialogResult?: boolean | null) {
    this.dialogResult.next(dialogResult);
  }


}
