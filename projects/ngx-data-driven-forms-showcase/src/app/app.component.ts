import {Component} from '@angular/core';
import {Question} from 'ngx-data-driven-forms';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  config: Question = new Question({
    type: 'text',
    id: 'test',
    label: {
      text: 'Test Question'
    }
  });

  control = this.config.control(null, this.fb);

  constructor(
    private fb: FormBuilder,
  ) {
  }

}
