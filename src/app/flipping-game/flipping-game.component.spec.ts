import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlippingGameComponent } from './flipping-game.component';

describe('FlippingGameComponent', () => {
  let component: FlippingGameComponent;
  let fixture: ComponentFixture<FlippingGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlippingGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlippingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
