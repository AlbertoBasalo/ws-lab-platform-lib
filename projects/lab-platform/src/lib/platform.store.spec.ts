import { TestBed } from '@angular/core/testing';

import { PlatformStore } from './platform.store';

describe('PlatformStore', () => {
  let service: PlatformStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatformStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
