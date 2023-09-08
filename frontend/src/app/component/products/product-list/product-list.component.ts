import { Component, OnInit, ViewChild } from '@angular/core';
import { AddPropertyComponent } from '../add-property/add-property.component';

import {
  InformationService,
  Product,
} from 'src/app/services/information.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  updatedData: Product[] = [];
  productLists: Product[] = [];
  loading = true;
  pageIndex = 1;
  pageSize = 10;
  total = 0;
  searching = '';
  checked = false;
  cancelAllbtn = false;

  isVisibleUpdateProp = false;

  isDrawerVisible = false;

  isVisible = false;
  isConfirmLoading = false;

  oneProperty = false;
  twoProperty = false;

  showModalAddProp = false;
  showModalUpdateProp = false;

  @ViewChild(AddPropertyComponent) childComponent!: AddPropertyComponent;

  constructor(private service_InformationService: InformationService) {}

  ngOnInit(): void {
    this.loadDataFromServer(this.searching);
    this.subscribeToDataUpdates();
  }

  loadDataFromServer(searching: string): void {
    this.loading = true;
    this.service_InformationService
      .getAllProduct({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        search: searching,
      })
      .subscribe((data) => {
        this.loading = false;
        this.productLists = data.results;
        this.total = data.count;

        const nonEmptyItems = this.productLists.filter(
          (l) => l.propValueMain !== '' || l.propValueSub !== ''
        );

        if (nonEmptyItems.length === 0) {
          this.cancelAllbtn = false;
        } else {
          this.cancelAllbtn = true;
        }
      });
  }

  subscribeToDataUpdates() {
    this.service_InformationService.dataUpdated$.subscribe(() => {
      // อัพเดตข้อมูลหลังจากมีการอัพเดต
      this.loadDataFromServer(this.searching);
    });
  }

  handlePageIndexChange(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.loadDataFromServer(this.searching);
  }

  handlePageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.pageIndex = 1;
    this.loadDataFromServer(this.searching);
  }

  // Modal
  showModal() {
    this.clearModal();
    this.isVisible = true;
    if (this.showModalAddProp === true) {
      console.log('Add', this.showModalAddProp);
    }

    if (this.showModalUpdateProp === true) {
      console.log('Update', this.showModalUpdateProp);
    }
  }

  toggleModal() {
    if (this.showModalUpdateProp === true) {
      const nonEmptyItems = this.productLists.filter(
        (l) => l.propValueMain !== '' || l.propValueSub !== ''
      );

      if (nonEmptyItems.length === 0) {
        this.isVisibleUpdateProp = true;
      } else {
        this.showModal();
      }
    }
  }

  handleOk() {
    this.isConfirmLoading = true;
    this.childComponent.loadData();

    if (this.showModalAddProp) {
      if (this.oneProperty) {
        console.log('Open drawer 1');
        this.openDrawer();
      } else if (this.twoProperty) {
        console.log('Open drawer 2');
        this.openDrawer();
      }
    }

    if (this.showModalUpdateProp) {
      if (this.oneProperty) {
        console.log('Open drawer 1');
        this.openDrawer();
      } else if (this.twoProperty) {
        console.log('Open drawer 2');
        this.openDrawer();
      }
    }

    this.isVisible = false;
    this.isConfirmLoading = false;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleUpdateProp = false;
  }

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

  clearModal() {
    this.oneProperty = false;
    this.twoProperty = false;
  }

  // Drawer
  openDrawer() {
    this.isDrawerVisible = !this.isDrawerVisible;
  }

  closeDrawer(visible: boolean) {
    this.isDrawerVisible = visible;
  }

  // popup
  cancel(): void {
    console.log('ไม่ได้ยกเลิก');
  }

  confirmAll(): void {
    this.service_InformationService.cancelAllProperty().subscribe(() => {
      this.loadDataFromServer(this.searching);
    });
  }

  confirmSingle(index: number): void {
    const product = this.productLists[index];
    const findIndex = this.productLists.findIndex(
      (list) => list.sku === product.sku
    );
    if (findIndex !== -1) {
      this.service_InformationService
        .cancelSingleProperty(product.sku)
        .subscribe(() => {
          this.subscribeToDataUpdates();
          this.loadDataFromServer(this.searching);
        });
    }
  }
}
