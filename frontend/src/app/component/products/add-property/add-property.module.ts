import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPropertyComponent } from './add-property.component';
import { FormsModule } from '@angular/forms';
import { GroupAddPropModule } from '../group-add-prop/group-add-prop.module';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    NzStepsModule,
    NzButtonModule,
    NzSelectModule,
    NzInputModule,
    NzCheckboxModule,
    NzTableModule,
    NzTagModule,
    NzPaginationModule,
    NzBadgeModule,
    NzDrawerModule,
    NzCollapseModule,
    NzIconModule,
    GroupAddPropModule,
    NzSwitchModule,
    NzModalModule,
    NzSpinModule,
    NzEmptyModule
  ],
  declarations: [AddPropertyComponent],
  exports: [AddPropertyComponent],
})
export class AddPropertyModule {}
