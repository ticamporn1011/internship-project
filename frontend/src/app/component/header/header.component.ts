import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() isCollapsed: boolean = false;
  constructor() {}

  ngOnInit() {}

  toggleCollapsed(){
    this.isCollapsed = !this.isCollapsed
  }
}
