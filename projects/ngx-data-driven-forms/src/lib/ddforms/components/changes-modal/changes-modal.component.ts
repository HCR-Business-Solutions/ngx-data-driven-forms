import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'ddforms-changes-modal',
  templateUrl: './changes-modal.component.html',
styleUrls: [
  './changes-modal.component.scss',]
})
export class ChangesModalComponent implements OnInit {
  constructor(private el: ElementRef) { }
  ngOnInit() {
      // we added this so that when the backdrop is clicked the modal is closed.
      this.el.nativeElement.addEventListener('click', ()=> {
          this.close()
      })
  }
  close() {
      this.el.nativeElement.classList.remove('sshow')
      this.el.nativeElement.classList.add('hhidden')
  }
}