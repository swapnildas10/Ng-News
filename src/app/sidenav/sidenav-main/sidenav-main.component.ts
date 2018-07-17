import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormControl, NgControl} from '@angular/forms';
import {MatSidenavModule, MatSidenav} from '@angular/material/sidenav';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-sidenav-main',
  templateUrl: './sidenav-main.component.html',
  styleUrls: ['./sidenav-main.component.scss']
})
export class SidenavMainComponent implements OnInit, OnChanges {
@Input() toggleSideNav = false;
toggleNav = new Subject<boolean>();
  constructor() { }
  @ViewChild('sidenav') sidenav: MatSidenav;
  ngOnChanges(changes: SimpleChanges) {
    const change: SimpleChange = changes.toggleSideNav;
    if (change.currentValue !== change.previousValue && !change.firstChange) {
      this.sidenav.toggle();
    }
    // if (change.currentValue) {
    //   this.sidenav.open();
    // } else {
    //   this.sidenav.close();
    // }
  }
  ngOnInit() {
  }

}
