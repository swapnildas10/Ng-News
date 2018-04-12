import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
toggleSideNavMain = false;
@Output() toggleSideNavBar = new EventEmitter<boolean>();
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }
  navigateToBusiness() {
this.router.navigate(['/category/business']);
  }

  toggleSideNav() {
    this.toggleSideNavMain = !this.toggleSideNavMain;
    this.toggleSideNavBar.emit(this.toggleSideNavMain);
  }
}
