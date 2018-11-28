import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { AlertModel } from '../../models/alert-model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  public alertNotifications: AlertModel[];

  constructor(private readonly alertService: AlertService,
              private readonly snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.subscribeToAlerts();
  }

  subscribeToAlerts(): void {
    this.alertService.getAlert().subscribe((alert: AlertModel) => {
      if (!alert) {
        this.alertNotifications = null;
        return;
      }
      this.openSnackBar(alert.message, 'OK');
      this.openSnackBar(alert.message, 'OK');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
