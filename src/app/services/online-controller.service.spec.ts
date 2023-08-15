import { TestBed } from '@angular/core/testing';

import OnlineControllerService from './online-controller.service';

describe('OnlineControllerService', () => {
  let service: OnlineControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
