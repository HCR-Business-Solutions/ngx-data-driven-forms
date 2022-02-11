import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ddforms-special-text-resolver',
  templateUrl: './special-text-resolver.component.html',
  styles: [
  ]
})
export class SpecialTextResolverComponent implements OnInit {

  @Input() public text: string | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
