import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyModuleComponent } from './my-module.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@NgModule({
  imports: [CommonModule, NzDrawerModule, NzButtonModule, NzPaginationModule],
  declarations: [MyModuleComponent],
  exports: [MyModuleComponent],
})
export class MyModuleModule {}
