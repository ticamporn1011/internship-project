import { Component, OnInit } from '@angular/core';
import {
  Group,
  InformationService,
  Product,
} from 'src/app/services/information.service';

@Component({
  selector: 'app-group-add-prop',
  templateUrl: './group-add-prop.component.html',
  styleUrls: ['./group-add-prop.component.css'],
})
export class GroupAddPropComponent implements OnInit {
  productGroups: Group[] = [];
  productLists: Product[] = [];

  loading: boolean = true;
  pageIndex = 1;
  pageSize = 10;
  total = 0;

  constructor(private service_InformationService: InformationService) {}

  ngOnInit() {

  }
}
