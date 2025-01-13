import { TestBed } from '@angular/core/testing';
import { SharepdfService } from './sharepdf.service';

describe('SharepdfService', () => {
  let service: SharepdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharepdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
