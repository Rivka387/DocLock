using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Amazon.S3;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using DocLock.Core.IServices;

namespace DocLock.Service.Services
{
    public class S3Service
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _encryptionKey;
        private readonly string _bucketName;
        private readonly IConfiguration _configuration;

        public S3Service(IConfiguration configuration)
        {
            _s3Client = new AmazonS3Client(
             configuration["AWS_ACCESS_KEY_ID"],
             configuration["AWS_SECRET_ACCESS_KEY"],
             Amazon.RegionEndpoint.GetBySystemName(configuration["AWS_REGION"]));
            _encryptionKey = configuration["ENCRYPTION_KEY"];
            _bucketName = configuration["AWS_BUCKET_NAME"];
        }
        public async Task<string> UploadFileAsync(IFormFile file, string fileName, byte[] encryptedData)
        {
            try
            {
                // העלאה ל-S3
                var uploadRequest = new Amazon.S3.Model.PutObjectRequest
                {
                    BucketName = _bucketName,
                    Key = fileName,
                    InputStream = new MemoryStream(encryptedData),
                    ContentType = file.ContentType
                };
                await _s3Client.PutObjectAsync(uploadRequest);

                return $"https://{_bucketName}.s3.amazonaws.com/{fileName}";
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<bool> DeleteFileAsync(string fileKey)
        {
            try
            {
                var deleteRequest = new Amazon.S3.Model.DeleteObjectRequest
                {
                    BucketName = _bucketName,
                    Key = fileKey
                };
                await _s3Client.DeleteObjectAsync(deleteRequest);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<string> UpdateFileNameAsync(string oldFilePath, string newFilePath)
        {
            try
            {
                var copyRequest = new Amazon.S3.Model.CopyObjectRequest
                {
                    SourceBucket = _bucketName,
                    SourceKey = oldFilePath,
                    DestinationBucket = _bucketName,
                    DestinationKey = newFilePath
                };
                await _s3Client.CopyObjectAsync(copyRequest);

                var deleteRequest = new Amazon.S3.Model.DeleteObjectRequest
                {
                    BucketName = _bucketName,
                    Key = oldFilePath
                };
                await _s3Client.DeleteObjectAsync(deleteRequest);
                return $"https://{_bucketName}.s3.amazonaws.com/{newFilePath}";
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<byte[]> DownloadFileAsync(string fileLink)
        {
            var fileKey = fileLink.Split(new[] { ".s3.amazonaws.com/" }, StringSplitOptions.None).Last();
            var response = await _s3Client.GetObjectAsync(_bucketName, fileKey);
            using (var memoryStream = new MemoryStream())
            {
                await response.ResponseStream.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
        }


    }
}
