import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurkeymapComponent } from './turkeymap.component';

describe('TurkeymapComponent', () => {
  let component: TurkeymapComponent;
  let fixture: ComponentFixture<TurkeymapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurkeymapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurkeymapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
