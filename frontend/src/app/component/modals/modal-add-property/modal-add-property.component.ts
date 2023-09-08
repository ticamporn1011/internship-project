import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-add-property',
  templateUrl: './modal-add-property.component.html',
  styleUrls: ['./modal-add-property.component.css'],
})
export class ModalAddPropertyComponent implements OnInit {
  @Input() isModalAddPropVisible: boolean = false;
  @Output() closeModalAddProp = new EventEmitter<boolean>();

  isConfirmLoading = false;
  oneProperty = false;
  twoProperty = false;

  constructor() {}

  ngOnInit() {}

  checkChangeOne(event: boolean): void {
    this.oneProperty = event;
    if (this.oneProperty) {
      this.twoProperty = false;
    }
  }

  checkChangeTwo(event: boolean) {
    this.twoProperty = event;
    if (this.twoProperty) {
      this.oneProperty = false;
    }
  }

  handleBlur(): void {
    this.oneProperty = false;
    this.twoProperty = false;
  }

  showModal(): void {
    this.isModalAddPropVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    // this.isModalAddPropVisible = false;
    this.closeModalAddProp.emit(false);
    if (this.oneProperty === true) {
      
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    // this.isModalAddPropVisible = false;
    this.closeModalAddProp.emit(false);
  }
}
