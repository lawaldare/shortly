import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { ClipboardModule } from 'ngx-clipboard';

import { NgTinyUrlModule, NgTinyUrlService } from 'ng-tiny-url';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ClipboardModule,
    NgTinyUrlModule
  ],
  providers: [NgTinyUrlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
