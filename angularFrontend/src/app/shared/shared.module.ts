import { BlockUIModule } from 'ng-block-ui';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from '../core/services/modal.service';
import { BlockUiComponent } from './block-ui/block-ui.component';

@NgModule({
  declarations: [
    ModalComponent,
    BlockUiComponent,
  ],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    BlockUIModule.forRoot({
      template: BlockUiComponent,
    }),
  ],
  exports: [
    ModalComponent,
    CommonModule,
    NgxMaskModule,
    ReactiveFormsModule,
    BlockUIModule
  ],
  providers: [ModalService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents:[ModalComponent]
})
export class SharedModule {}
