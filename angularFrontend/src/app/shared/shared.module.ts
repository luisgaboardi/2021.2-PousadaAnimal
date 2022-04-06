import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from '../core/services/modal.service';

@NgModule({
  declarations: [
    ModalComponent,
  ],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
  ],
  exports: [
    ModalComponent,
    CommonModule,
    NgxMaskModule,
    ReactiveFormsModule,
  ],
  providers: [ModalService],
  entryComponents:[ModalComponent]
})
export class SharedModule {}
