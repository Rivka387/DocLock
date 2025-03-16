using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Amazon.S3;

namespace DocLock.Service.Services
{
    public class S3Service
    {
        //private readonly IAmazonS3 _s3Client;
        //private readonly string _bucketName = "your-bucket-name"; // שנה לשם ה-Bucket שלך

        //public S3Service()
        //{
        //    var awsAccessKey = "your-access-key"; // זמני! נכניס לקובץ הגדרות מאובטח
        //    var awsSecretKey = "your-secret-key";
        //    var region = RegionEndpoint.USEast1; // שנה לאזור שבחרת

        //    _s3Client = new AmazonS3Client(awsAccessKey, awsSecretKey, region);
        //}

        //public async Task<string> UploadFileAsync(string fileName, Stream fileStream)
        //{
        //    var request = new PutObjectRequest
        //    {
        //        BucketName = _bucketName,
        //        Key = fileName,
        //        InputStream = fileStream,
        //        ContentType = "application/octet-stream",
        //        CannedACL = S3CannedACL.Private // קובץ יוגן افת
        //    };

        //    await _s3Client.PutObjectAsync(request);
        //    return $"https://{_bucketName}.s3.amazonaws.com/{fileName}";
        //}

        //public async Task<Stream> DownloadFileAsync(string fileName)
        //{
        //    var request = new GetObjectRequest
        //    {
        //        BucketName = _bucketName,
        //        Key = fileName
        //    };

        //    var response = await _s3Client.GetObjectAsync(request);
        //    return response.ResponseStream;
        //}

        //public async Task DeleteFileAsync(string fileName)
        //{
        //    var request = new DeleteObjectRequest
        //    {
        //        BucketName = _bucketName,
        //        Key = fileName
        //    };

        //    await _s3Client.DeleteObjectAsync(request);
        //}
    }
}
