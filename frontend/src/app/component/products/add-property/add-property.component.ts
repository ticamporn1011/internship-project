import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  InformationService,
  Product,
  Group,
} from 'src/app/services/information.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() closeDrawer = new EventEmitter<boolean>();

  @Input() oneProperty: boolean = false;
  @Input() twoProperty: boolean = false;

  @Input() showModalAddProp: boolean = false;
  @Input() showModalUpdateProp: boolean = false;

  // service
  productLists: Product[] = [];
  productSelects: Product[] = [];
  productCheckboxs: Product[] = [];
  productGroups: Group[] = [];

  // in this component
  loading: boolean = true;
  pageIndex = 1;
  pageSize = 10;
  total = 0;
  searching = '';
  searchMember = '';
  searchGroup1 = '';
  searchGroup2 = '';

  // template toggle
  temRef1: boolean = true;
  temRef2: boolean = false;
  activeCollaps1: boolean = true;
  activeCollaps2: boolean = true;

  current: number = 0;
  checked: boolean = false;
  selectAll: boolean = false;
  checkAll: boolean[] = [];

  nameGroup: string = '';
  switchValue = false;

  // add property
  nameMain: string = '';
  namePropMain: string = '';
  valueMain: string = '';
  valuePropMain: string = '';
  disanbleNameMain: boolean = false;

  nameSub: string = '';
  namePropSub: string = '';
  valueSub: string = '';
  valuePropSub: string = '';
  disanbleNameSub: boolean = false;

  constructor(
    private service_InformationService: InformationService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  search(searching: string): void {
    this.loading = true;

    let observable;

    if (this.showModalAddProp) {
      observable = this.service_InformationService.getAddProduct({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        search: searching,
      });
    } else if (this.showModalUpdateProp) {
      observable = this.service_InformationService.getUpdateProduct({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        search: searching,
      });
    } else {
      this.loading = false;
      return;
    }

    observable.subscribe((data) => {
      this.productLists = data.results;
      this.total = data.count;
      this.loading = false;

      let count_dis = 0;
      this.productLists.forEach((l) => {
        const findInSelect = this.productSelects.find((s) => s.sku === l.sku);
        const findInGroup = this.productGroups.some((g) =>
          g.group.some((m) => m.sku === l.sku)
        );

        if (findInSelect || findInGroup) {
          l.btnDisable = true;
        } else {
          l.btnDisable = false;
        }

        if (l.btnDisable) {
          count_dis++;
        }
      });

      this.selectAll = count_dis === this.productLists.length;
    });
  }

  loadData() {
    this.search(this.searching);
  }

  // เมื่อเปลี่ยนหน้า
  handlePageIndexChange(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.loadData();
  }

  // เมื่อเปลี่ยนจำนวนรายการต่อหน้า
  handlePageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.pageIndex = 1;
    this.loadData();
  }

  searchGroupName(groupName: string, searchGroup: string): boolean {
    return groupName.toLowerCase().includes(searchGroup.toLowerCase());
  }

  searchNameGroupsS(searchGroupS: string) {
    this.searchGroup1 = searchGroupS;
  }

  searchNameGroupsG(searchGroupG: string) {
    this.searchGroup2 = searchGroupG;
  }

  searchMemberItem(groupItem: Product): boolean {
    return (
      (groupItem.title || '')
        .toLowerCase()
        .includes(this.searchMember.toLowerCase()) ||
      (groupItem.sku || '')
        .toLowerCase()
        .includes(this.searchMember.toLowerCase())
    );
  }

  groupTests: Group[] = [];
  searchMemberGroup(searchMember: string) {
    this.searchMember = searchMember;
  }

  selectProduct(index: number) {
    const list = this.productLists[index];
    if (!this.productSelects.includes(list)) {
      this.productSelects.push(list);
      list.btnDisable = true;
    } else {
      console.log('Book already exists in bookSelect');
    }
    const filter =
      this.productLists.filter((item) => item.btnDisable).length ===
      this.productLists.length;
    if (filter) {
      this.selectAll = true;
    }

    if (this.productSelects.length > 0) {
      this.temRef1 = true;
      this.temRef2 = false;
    } else {
      this.temRef1 = false;
      this.temRef2 = true;
    }

    this.nameGroup = this.genNameGroup();
    console.log(this.productSelects);
  }

  genNameGroup() {
    const count = this.productSelects.reduce((acc: any, curr) => {
      for (let i = 0; i < curr.title.length; i++) {
        if (!acc[i]) acc[i] = {};
        if (!acc[i][curr.title[i]]) acc[i][curr.title[i]] = 0;
        acc[i][curr.title[i]]++;
      }
      return acc;
    }, []);

    let groupName = '';
    for (let i = 0; i < count.length; i++) {
      let max = 0;
      let maxChar = '';
      for (let char in count[i]) {
        if (count[i][char] > max) {
          max = count[i][char];
          maxChar = char;
        }
      }
      groupName += maxChar;
    }
    return groupName;
  }

  deleteSelect(index: number) {
    const select = this.productSelects[index];
    this.productSelects = this.productSelects.filter((e, i) => i !== index);
    let found = this.productLists.find((e) => e.sku == select.sku);
    if (found) {
      found.btnDisable = false;
    }
    this.nameGroup = this.genNameGroup();
    this.selectAll = false;
    console.log(this.productSelects);
  }

  toggleSelectAll(selectAll: boolean) {
    if (selectAll) {
      this.temRef1 = true;
      this.temRef2 = false;
    }

    for (const list of this.productLists) {
      if (selectAll === true) {
        if (!list.btnDisable) {
          list.btnDisable = true;
          this.productSelects.push(list);
        }
      } else {
        list.btnDisable = false;

        this.productGroups.forEach((g) => {
          const member = g.group.find((m) => m.sku === list.sku);
          if (member) list.btnDisable = true;
        });

        this.productSelects = this.productSelects.filter(
          (item) => item.sku !== list.sku
        );
      }
    }

    this.nameGroup = this.genNameGroup();
  }

  disableListInGroups(list: any) {
    this.productGroups.forEach((group) => {
      const member = group.group.find((m) => m.sku === list.sku);
      if (member) {
        list.btnDisable = true;
      }
    });
  }

  createGroup() {
    let newGroup = {
      id: uuidv4(),
      groupName: this.nameGroup,
      group: this.productSelects,
    };

    if (this.productSelects.length > 0) {
      this.productGroups.push(newGroup);
    }

    this.productSelects = [];
    this.checkAll = [];

    this.productGroups.forEach((group) => {
      const count_checked = group.group.filter((m) => m.checked).length;

      if (count_checked === group.group.length) {
        this.checkAll.push(true);
      } else {
        this.checkAll.push(false);
      }
    });

    console.log(this.checkAll);
    console.log(this.productGroups);
  }

  onEditItemGroup(id: string, index: number) {
    const group = this.productGroups[index].group;
    group.forEach((m) => {
      if (m) {
        this.productSelects.push(m);
      }
    });

    this.cancelGroup(id, index);
    // this.productGroups = this.productGroups.filter((e, i) => i !== index);

    if (this.productSelects.length > 0) {
      this.temRef1 = true;
      this.temRef2 = false;
    } else {
      this.temRef1 = false;
      this.temRef2 = true;
    }

    // this.checkAll.splice(index, 1);
    // this.loadData();
    console.log(this.productSelects);
  }

  cancelGroup(id: string, index: number) {
    const groupIndex = this.productGroups[index];
    if (groupIndex.id === id) {
      this.productGroups = this.productGroups.filter((g) => g.id !== id);
      this.checkAll.splice(index, 1);
      groupIndex.group.forEach((m) => {
        this.productCheckboxs = this.productCheckboxs.filter(
          (c) => c.sku !== m.sku
        );
      });
    }

    this.loadData();
    console.log('checkAll', this.checkAll);
    console.log('g', this.productGroups);
    console.log('c', this.productCheckboxs);
  }

  checkSingle(groupItem: Product, gIndex: number) {
    const group = this.productGroups[gIndex];
    if (groupItem.checked) {
      this.productCheckboxs.push(groupItem);
    } else {
      this.productCheckboxs = this.productCheckboxs.filter(
        (c) => c.sku !== groupItem.sku
      );
    }

    const count_checked =
      group.group.filter((m) => m.checked).length === group.group.length;

    if (count_checked) {
      this.checkAll[gIndex] = true;
    } else {
      this.checkAll[gIndex] = false;
    }

    console.log(this.checkAll);
    console.log(this.productCheckboxs);
  }

  checkedAll(id: string, index: number) {
    const checked = this.checkAll[index];
    const groupIndex = this.productGroups[index];
    if (groupIndex.id === id) {
      groupIndex.group.forEach((m) => {
        m.checked = !checked;
        if (m.checked) {
          this.productCheckboxs.push(m);
        } else {
          this.productCheckboxs = this.productCheckboxs.filter(
            (c) => c.sku !== m.sku
          );
        }
      });
      this.checkAll[index] = !checked;
    }

    console.log(this.checkAll);
    console.log(this.productCheckboxs);
  }

  onUpdateMain(nameMain: string, valueMain: string) {
    if (this.productCheckboxs.length === 0) {
      return this.error();
    }

    if (this.productCheckboxs) {
      for (const product of this.productCheckboxs) {
        if (product.checked) {
          product.propNameMain = nameMain;
          product.propValueMain = valueMain;
        }
      }

      this.namePropMain = nameMain;
      this.valuePropMain = valueMain;
      this.valueMain = '';
      this.disanbleNameMain = true;
      console.log(this.productCheckboxs);
    }
  }

  onUpdateSub(nameSub: string, valueSub: string) {
    if (this.productCheckboxs.length === 0) {
      return this.error();
    }

    if (this.productCheckboxs) {
      for (const product of this.productCheckboxs) {
        if (product.checked) {
          if (
            !product.propNameMain &&
            !product.propValueMain &&
            this.showModalAddProp
          ) {
            return this.notMainProp();
          }
          product.propNameSub = nameSub;
          product.propValueSub = `-${valueSub}`;
        }
      }

      this.namePropSub = `-${nameSub}`;
      this.valuePropSub = valueSub;
      this.valueSub = '';
      this.disanbleNameSub = true;
      console.log(this.productCheckboxs);
    }
  }

  submitData() {
    let isAllComplete = true;
    for (const g of this.productGroups) {
      for (const m of g.group) {
        if (m.sku && this.oneProperty && !m.propValueMain) {
          this.errorSubmit();
          isAllComplete = false;
          return;
        }

        if (
          m.sku &&
          this.twoProperty &&
          (!m.propValueMain || !m.propValueSub)
        ) {
          this.errorSubmit();
          isAllComplete = false;
          return;
        }
      }
    }

    if (isAllComplete) {
      this.submit();
      console.log(this.productLists);
      this.close();
    }
  }

  submit() {
    for (const g of this.productGroups) {
      for (const m of g.group) {
        if (this.oneProperty && m.sku && m.propValueMain) {
          this.service_InformationService
            .updateProperty(
              m.sku,
              m.propNameMain,
              m.propNameSub,
              m.propValueMain,
              m.propValueSub
            )
            .subscribe(() => {
              this.service_InformationService.triggerDataUpdate();
            });
        }

        if (this.twoProperty && m.sku && m.propValueMain && m.propValueSub) {
          this.service_InformationService
            .updateProperty(
              m.sku,
              m.propNameMain,
              m.propNameSub,
              m.propValueMain,
              m.propValueSub
            )
            .subscribe(() => {
              this.service_InformationService.triggerDataUpdate();
            });
        }
      }
    }
  }

  // alert
  error() {
    this.modal.error({
      nzTitle: 'กรุณาเลือกสินค้า',
      nzClosable: false,
    });
  }

  notMainProp() {
    this.modal.error({
      nzTitle: 'กรุณาเพิ่มคุณสมบัติหลักก่อน',
      nzClosable: false,
    });
  }

  addSubWarning() {
    this.modal.warning({
      nzTitle: 'มีสินค้าบางชิ้นที่เลือกยังไม่มีคุณสมบัติหลัก',
      nzClosable: false,
    });
  }

  errorSubmit() {
    this.modal.error({
      nzTitle: 'ในกลุ่มสินค้ายังมีบางรายการจัดการคุณสมบัติไม่ครบถ้วน',
      nzClosable: false,
    });
  }

  // in this component
  toggleHideAll1() {
    this.activeCollaps1 = !this.activeCollaps1;
  }

  toggleHideAll2() {
    this.activeCollaps2 = !this.activeCollaps2;
  }

  manageGroup() {
    this.temRef1 = true;
    this.temRef2 = false;
  }

  showGroups() {
    this.temRef1 = false;
    this.temRef2 = true;
  }

  pre(): void {
    this.current -= 1;
    if (this.productGroups.length === 0) {
      console.log('ไม่มีสักกลุ่ม');
    }
    this.loadData();
  }

  next(): void {
    this.current += 1;
    this.loadData();
  }

  close() {
    this.closeDrawer.emit(false);

    this.current = 0;
    this.temRef1 = true;
    this.temRef2 = false;

    this.productSelects = [];
    this.productGroups = [];
    this.selectAll = false;
    this.pageIndex = 1;

    this.nameMain = '';
    this.valueMain = '';
    this.namePropMain = '';
    this.disanbleNameMain = false;

    this.nameSub = '';
    this.valueSub = '';
    this.namePropSub = '';
    this.disanbleNameSub = false;

    this.productCheckboxs = [];
    this.checkAll = [];
    this.searching = '';

    this.loadData();

    this.productLists.forEach((product) => {
      if (product.btnDisable) {
        product.btnDisable = false;
        product.checked = false;
        product.propNameMain = '';
        product.propNameSub = '';
        product.propValueMain = '';
        product.propValueSub = '';
      }
    });
  }
}
