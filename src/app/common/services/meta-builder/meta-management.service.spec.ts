import { TestBed } from '@angular/core/testing';
import { MetaManagementService } from './meta-management.service';


describe('MetaBuilderService', () => {
  let service: MetaManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetaManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
