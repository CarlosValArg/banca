import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestsComponent } from './invests.component';

describe('InvestsComponent', () => {
  let component: InvestsComponent;
  let fixture: ComponentFixture<InvestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestsComponent]
    });
    fixture = TestBed.createComponent(InvestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
