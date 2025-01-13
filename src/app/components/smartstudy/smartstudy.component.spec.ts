import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartstudyComponent } from './smartstudy.component';

describe('SmartstudyComponent', () => {
  let component: SmartstudyComponent;
  let fixture: ComponentFixture<SmartstudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartstudyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartstudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
