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
import { HttpInterceptors } from './services/http-interceptors';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    AlertService,
    BackendService,
    ErrorsHandler,
    LoggerService,
    SecuredStorageProviderService,
    {provide: ErrorHandler, useClass: ErrorsHandler},
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptors, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
