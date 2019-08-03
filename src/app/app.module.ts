import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ScratchpadComponent } from './scratchpad/scratchpad.component';
import { BoxComponent } from './box/box.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { StudioComponent } from './studio/studio.component';
import { BoxWizardComponent } from './box-wizard/box-wizard.component';
import { GloalErrorHandler } from './global-error-handler';
import { CanComponent } from './studio/can.component';
import { CanSamplesComponent } from './can-samples/can-samples.component';
import { BoxSamplesComponent } from './box-samples/box-samples.component';
import { CanWizardComponent } from './can-wizard/can-wizard.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ScratchpadComponent,
    BoxComponent,
    SideNavComponent,
    BreadcrumbComponent,
    StudioComponent,
    BoxWizardComponent,
    CanComponent,
    CanSamplesComponent,
    BoxSamplesComponent,
    CanWizardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: ErrorHandler, useClass: GloalErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
