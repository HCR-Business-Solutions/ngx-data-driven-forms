import { Component, OnInit } from '@angular/core';
import { LayoutStateService } from 'projects/info-ngx-ddforms-web/src/app/core/service/layout-state/layout-state.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styles: [],
})
export class WelcomeComponent {
  constructor(private layoutSvc: LayoutStateService) {
    this.layoutSvc.hideToolbar();
  }
}
