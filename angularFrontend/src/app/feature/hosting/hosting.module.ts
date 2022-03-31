import { IConfig, NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostingRoutingModule } from './hosting-routing.module';
import { HostingComponent } from './hosting.component';


const mask: Partial<IConfig> = {validation: true};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HostingRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(mask),
  ]
})
export class HostingModule { }
