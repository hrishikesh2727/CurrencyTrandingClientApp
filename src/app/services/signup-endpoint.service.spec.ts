import { TestBed } from '@angular/core/testing';

import { SignupEndpointService } from './signup-endpoint.service';

describe('SignupEndpointService', () => {
  let service: SignupEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
