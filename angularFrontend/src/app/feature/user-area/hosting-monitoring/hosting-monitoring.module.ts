import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HostingMonitoringComponent } from './hosting-monitoring.component';

const routes: Routes = [
  {
    path: '',
    component: HostingMonitoringComponent
  }
];

const mask: Partial<IConfig> = {validation: true};

@NgModule({
  declarations: [HostingMonitoringComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgxMaskModule.forRoot(mask),
  ]
})
export class HostingMonitoringModule { }
