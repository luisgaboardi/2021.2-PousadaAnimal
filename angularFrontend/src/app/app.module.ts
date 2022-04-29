import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IConfig, NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './feature/nav-bar/nav-bar.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChatComponent } from './shared/components/chat/chat.component';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [AppComponent,NavBarComponent, ChatComponent],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(options),
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    SharedModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
