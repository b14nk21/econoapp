import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointSaleComponent } from './point-sale.component';

describe('PointSaleComponent', () => {
  let component: PointSaleComponent;
  let fixture: ComponentFixture<PointSaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointSaleComponent]
    });
    fixture = TestBed.createComponent(PointSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
