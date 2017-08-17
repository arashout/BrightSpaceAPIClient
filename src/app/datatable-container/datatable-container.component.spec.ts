import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableContainerComponent } from './datatable-container.component';

describe('DatatableContainerComponent', () => {
  let component: DatatableContainerComponent;
  let fixture: ComponentFixture<DatatableContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
