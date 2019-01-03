import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertService } from './services/alert.service';
import { BackendService } from './services/backend.service';
import { ErrorsHandler } from './services/error-handler.service';
import { LoggerService } from './services/logger.service';
import { SecuredStorageProviderService } from './services/secured-storage-provider.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptors } from './http-interceptors/http-interceptors';
import { AlertComponent } from './components/alert/alert.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OfflineInterceptor } from './http-interceptors/offline-interceptor';

const httpInterceptors = [
  {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptors, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: OfflineInterceptor, multi: true}
];

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [
    AlertService,
    BackendService,
    ErrorsHandler,
    LoggerService,
    SecuredStorageProviderService,
    {provide: ErrorHandler, useClass: ErrorsHandler},
    httpInterceptors
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
