import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinGridComponent } from './coin-grid.component';

describe('CoinGridComponent', () => {
  let component: CoinGridComponent;
  let fixture: ComponentFixture<CoinGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent( CoinGridComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
