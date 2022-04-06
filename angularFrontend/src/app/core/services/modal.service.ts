
import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

export enum AlertTypes{
  DANGER = 'danger',
  SUCESS = 'sucess',
}
@Injectable({
  providedIn: 'root',
})
export class ModalService {

  private showAlert(message: string, type: string ){
    const BsModalRef: BsModalRef = this.modalService.show(ModalComponent)
    BsModalRef.content.type = type;
    BsModalRef.content.message = message;
  }
  constructor(private modalService: BsModalService){}

  showAlertDanger(message: string){
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSucess(message: string){
    this.showAlert(message, AlertTypes.SUCESS);
  }
}
