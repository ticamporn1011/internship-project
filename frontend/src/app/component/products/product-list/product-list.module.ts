import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductListRoutingModule } from './product-list-routing.module';
import { FormsModule } from '@angular/forms';

import { AddPropertyModule } from '../add-property/add-property.module';
import { MyModuleModule } from '../my-module/my-module.module';

import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzResultModule } from 'ng-zorro-antd/result';

import { ModalAddPropertyModule } from '../../modals/modal-add-property/modal-add-property.module';

@NgModule({
  imports: [
    CommonModule,
    ProductListRoutingModule,
    AddPropertyModule,
    MyModuleModule,
    ModalAddPropertyModule,

    NzTabsModule,
    NzDropDownModule,
    NzButtonModule,
    NzIconModule,
    NzMenuModule,
    NzSelectModule,
    NzInputModule,
    NzCheckboxModule,
    NzTableModule,
    FormsModule,
    NzPaginationModule,
    NzDrawerModule,
    NzTagModule,
    NzModalModule,
    NzPopconfirmModule,
    NzResultModule,
  ],
  declarations: [ProductListComponent],
})
export class ProductListModule {}
