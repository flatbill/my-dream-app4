import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReposComponent } from './view-repos.component';

describe('ViewReposComponent', () => {
  let component: ViewReposComponent;
  let fixture: ComponentFixture<ViewReposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
