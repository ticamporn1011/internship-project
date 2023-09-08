import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sider-bar',
  templateUrl: './sider-bar.component.html',
  styleUrls: ['./sider-bar.component.css'],
})
export class SiderBarComponent implements OnInit {
  @Input() isCollapsed: boolean = false;
  radioValue: string = 'B';
  constructor() {}

  ngOnInit() {}
}
