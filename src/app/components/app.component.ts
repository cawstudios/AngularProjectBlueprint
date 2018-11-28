import { Component } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularProjectBlueprint';

  constructor(private readonly alertService: AlertService) {
  }

  sendAlert(): void {
    this.alertService.warning('Warning');
  }
}
