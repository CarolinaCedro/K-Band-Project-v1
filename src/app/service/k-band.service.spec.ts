import { TestBed } from '@angular/core/testing';

import { KBandService } from './k-band.service';

describe('KBandService', () => {
  let service: KBandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KBandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
