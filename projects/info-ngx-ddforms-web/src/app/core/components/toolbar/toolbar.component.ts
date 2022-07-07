import { Component, OnInit } from '@angular/core';
import { LayoutStateService } from '../../service/layout-state/layout-state.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styles: [],
})
export class ToolbarComponent {
  constructor(public layoutSvc: LayoutStateService) {}
}
