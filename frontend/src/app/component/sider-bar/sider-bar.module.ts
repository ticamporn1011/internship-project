import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiderBarComponent } from './sider-bar.component';
import { FormsModule } from '@angular/forms';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzRadioModule,
    FormsModule,
    NzIconModule,
    NzToolTipModule
  ],
  declarations: [SiderBarComponent],
  exports: [SiderBarComponent],
})
export class SiderBarModule {}
