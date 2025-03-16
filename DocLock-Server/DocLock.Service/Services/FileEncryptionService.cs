using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DocLock.Service.Services
{
    public class FileEncryptionService
    {
        private const string FileExtension = ".enc"; // סיומת לקובץ המוצפן

        public async Task<string> EncryptFileAsync(string inputFilePath, string encryptionKey)
        {
            if (!File.Exists(inputFilePath))
                throw new FileNotFoundException("File not found.", inputFilePath);

            string outputFilePath = inputFilePath + FileExtension;

            using (Aes aes = Aes.Create())
            {
                aes.KeySize = 256;  // AES-256
                aes.BlockSize = 128; // בלוק סטנדרטי ל-AES
                aes.Mode = CipherMode.CBC;
                aes.Padding = PaddingMode.PKCS7;

                byte[] keyBytes = SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes(encryptionKey));
                aes.Key = keyBytes;
                aes.GenerateIV(); // יצירת IV אקראי

                using (FileStream fileStream = new FileStream(outputFilePath, FileMode.Create))
                {
                    await fileStream.WriteAsync(aes.IV, 0, aes.IV.Length); // שמירת ה-IV בקובץ

                    using (CryptoStream cryptoStream = new CryptoStream(fileStream, aes.CreateEncryptor(), CryptoStreamMode.Write))
                    using (FileStream inputFileStream = new FileStream(inputFilePath, FileMode.Open, FileAccess.Read))
                    {
                        await inputFileStream.CopyToAsync(cryptoStream);
                    }
                }
            }

            return outputFilePath;
        }
    }
}