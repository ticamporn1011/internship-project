import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { SiderBarModule } from './component/sider-bar/sider-bar.module';
import { HeaderModule } from './component/header/header.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

/** config ng-zorro-antd i18n **/
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SiderBarModule,
    HeaderModule,
    NzLayoutModule,
    NoopAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
