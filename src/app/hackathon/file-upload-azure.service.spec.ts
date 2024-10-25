import { TestBed } from '@angular/core/testing';

import { FileUploadAzureService } from './file-upload-azure.service';

describe('FileUploadAzureService', () => {
  let service: FileUploadAzureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadAzureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
