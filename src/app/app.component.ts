import { Component } from '@angular/core';

import { Session } from './shared/session';
import { ResultSet } from './shared/result-set';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  session = new Session();

  displayAPIResults(resultSet: ResultSet){
    console.log(resultSet.Items.length);
  }
}
