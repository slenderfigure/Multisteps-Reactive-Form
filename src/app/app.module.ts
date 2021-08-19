import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpInterceptorsProviders } from './interceptors/http-interceptors';
import * as msformComponents from './components/index';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    msformComponents.MultistepsFormComponent,
    msformComponents.TextfieldComponent,
    msformComponents.TextareaComponent,
    msformComponents.DropdownComponent,
    msformComponents.ErrorMessageComponent,
    msformComponents.CompletionMessageComponent,
    msformComponents.StepsIndicatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    HttpInterceptorsProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
