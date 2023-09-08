import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Group,
  InformationService,
  Product,
} from 'src/app/services/information.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-my-module',
  templateUrl: './my-module.component.html',
  styleUrls: ['./my-module.component.css'],
})
export class MyModuleComponent implements OnInit {
  @ViewChild('templateOne', { read: ElementRef })
  toggleRef?: ElementRef<HTMLDivElement>;

  constructor(private service_TestService: TestService) {}

  productLists: Product[] = [];
  productGroups: Group[] = [];
  loading: boolean = true;
  pageIndex = 1;
  pageSize = 10;
  total = 0;

  ngOnInit() {
    this.updatePageProducts();
  }

  updatePageProducts(): void {
    this.loading = true;
    this.service_TestService
      .getProduct(this.pageIndex, this.pageSize)
      .subscribe((data) => {
        this.productLists = this.service_TestService.productArray(data.results);
        this.loading = false;
        this.total = data.count;
      });
  }

  handlePageIndexChange(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.updatePageProducts();
  }

  handlePageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.pageIndex = 1;
    this.updatePageProducts();
  }

  submitProduct() {
    this.productLists.forEach((p) => {
      this.service_TestService
        .update(this.productGroups, p.propValueMain, p.propValueSub)
        .subscribe((data) => {
          console.log(data);
        });
    });
  }
}
