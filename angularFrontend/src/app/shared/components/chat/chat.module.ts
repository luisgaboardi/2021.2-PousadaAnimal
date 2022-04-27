import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent
  }
];

const mask: Partial<IConfig> = {validation: true};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgxMaskModule.forRoot(mask),
  ]
})
export class ChatModule { }
