import { TestBed } from '@angular/core/testing';

import { ComputerControllerService } from './computer-controler.service';

describe('ComputerControlerService', () => {
  let service: ComputerControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComputerControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
