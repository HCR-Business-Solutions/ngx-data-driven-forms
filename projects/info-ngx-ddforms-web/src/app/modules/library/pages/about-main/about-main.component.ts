import { Component, OnInit } from '@angular/core';
import { LayoutStateService } from 'projects/info-ngx-ddforms-web/src/app/core/service/layout-state/layout-state.service';

@Component({
  selector: 'app-about-main',
  templateUrl: './about-main.component.html',
  styles: [],
})
export class AboutMainComponent {
  constructor(private layoutSvc: LayoutStateService) {
    this.layoutSvc.showToolbar();
  }
}
