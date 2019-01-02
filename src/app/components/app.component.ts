import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnDestroy, OnInit {
  title = 'AngularProjectBlueprint';

  constructor(
    private injector: Injector,
    private readonly alertService: AlertService) {
    super('AngularProjectBlueprint', injector);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  sendAlert(): void {
    this.alertService.warning('Warning');
  }
}
