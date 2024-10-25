import { Injectable } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileUploadAzureService {
  private blobServiceClient: BlobServiceClient;
  private containerClient: any;

  constructor() {
    const azureConfig = environment.azureStorage;

    // Construct the URL for BlobServiceClient
    const blobServiceURL = `https://${azureConfig.accountName}.blob.core.windows.net`;

    // If you're using a SAS token, append it after a '?' character
    this.blobServiceClient = new BlobServiceClient(`${blobServiceURL}?${azureConfig.sasToken}`);

    // Access the container client for file upload
    this.containerClient = this.blobServiceClient.getContainerClient(azureConfig.containerName);
  }

  // Method to upload file to Azure Blob Storage
  async uploadFile(file: File): Promise<void> {
    const blockBlobClient = this.containerClient.getBlockBlobClient(file.name);
    await blockBlobClient.uploadData(file);
  }
}
