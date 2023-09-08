import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupAddPropComponent } from './group-add-prop.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

@NgModule({
  imports: [CommonModule, NzInputModule, NzTableModule, NzCollapseModule],
  declarations: [GroupAddPropComponent],
  exports: [GroupAddPropComponent],
})
export class GroupAddPropModule {}
