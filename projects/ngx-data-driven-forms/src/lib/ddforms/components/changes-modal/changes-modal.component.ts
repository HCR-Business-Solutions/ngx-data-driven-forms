import {Component, ElementRef, OnInit} from '@angular/core';
import {ChangesModalService} from '../../services/changes-modal.service';

@Component({
  selector: 'ddforms-changes-modal',
  templateUrl: './changes-modal.component.html',
styleUrls: [
  './changes-modal.component.scss',]
})
export class ChangesModalComponent implements OnInit {
  constructor(
    private modalHandler: ChangesModalService,
  ) { }
  ngOnInit() {
  }
  close(closeResult?: boolean | null) {
    this.modalHandler.setDialogResult(closeResult);
  }
}
