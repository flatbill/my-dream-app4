import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-head1',
  templateUrl: './site-head1.component.html',
  styleUrls: ['./site-head1.component.css']
})
export class SiteHead1Component implements OnInit {
  butRoutingOn = 'Routing is OFF';
  butSaveRoute = 'butSaveRoute' ;
  constructor() { }

  ngOnInit() {
  }

  fun1() {
    // -alert('running fun1')
    if (this.butRoutingOn === 'Routing is OFF') {
      this.butRoutingOn = 'Routing is ON'
    } else {
      this.butRoutingOn = 'Routing is OFF'
    }
  }
  fun2() {alert('fun2')}
}
