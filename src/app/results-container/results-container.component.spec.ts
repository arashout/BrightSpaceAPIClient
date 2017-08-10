import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsContainerComponent } from './results-container.component';

describe('ResultsContainerComponent', () => {
  let component: ResultsContainerComponent;
  let fixture: ComponentFixture<ResultsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
