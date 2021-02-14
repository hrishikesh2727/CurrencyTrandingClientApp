import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyTradingComponent } from './currency-trading.component';

describe('CurrencyTradingComponent', () => {
  let component: CurrencyTradingComponent;
  let fixture: ComponentFixture<CurrencyTradingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyTradingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyTradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
