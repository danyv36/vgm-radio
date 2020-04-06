import { TestBed } from '@angular/core/testing';

import { Sm2BarPlayerService } from './window-ref.service';

describe('WindowRefService', () => {
  let service: Sm2BarPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sm2BarPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
