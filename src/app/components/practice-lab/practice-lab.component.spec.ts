import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeLabComponent } from './practice-lab.component';

describe('PracticeLabComponent', () => {
  let component: PracticeLabComponent;
  let fixture: ComponentFixture<PracticeLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeLabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
