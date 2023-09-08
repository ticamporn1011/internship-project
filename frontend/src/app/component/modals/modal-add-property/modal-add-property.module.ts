import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAddPropertyComponent } from './modal-add-property.component';

import { AddPropertyModule } from '../../products/add-property/add-property.module';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';

@NgModule({
  imports: [
    CommonModule,
    AddPropertyModule,
    NzModalModule,
    NzIconModule,
    NzButtonModule,
    NzTagModule,
  ],
  declarations: [ModalAddPropertyComponent],
  exports: [ModalAddPropertyComponent],
})
export class ModalAddPropertyModule {}
