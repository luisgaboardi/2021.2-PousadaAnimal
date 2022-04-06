
import { Component,Input, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal'
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
 @Input() message: string;
 @Input() type = 'danger'

  constructor(
    public bsModalRef: BsModalRef

  ) {
  }

  ngOnInit(): void {
  }

  onClose(){
    this.bsModalRef.hide();
  }
}
