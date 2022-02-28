import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/panel/home/home.component';
import { NavbarComponent } from './features/panel/layout/navbar/navbar.component';
import { PanelComponent } from './features/panel/panel.component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    PanelComponent,
    HomeComponent,
    NavbarComponent,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
