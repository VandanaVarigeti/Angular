import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  
})
export class AppComponent {
  title = 'Employee Management System';

  constructor(private tiler: Title) {
      this.tiler.setTitle(this.title);
  }

  resetTitle() {
    this.tiler.setTitle(this.title);
  }
}
