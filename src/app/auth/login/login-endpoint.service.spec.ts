import { TestBed } from '@angular/core/testing';

import { LoginEndpointService } from './login-endpoint.service';

describe('LoginEndpointService', () => {
  let service: LoginEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
