import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteHead1Component } from './site-head1.component';

describe('SiteHead1Component', () => {
  let component: SiteHead1Component;
  let fixture: ComponentFixture<SiteHead1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteHead1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteHead1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
