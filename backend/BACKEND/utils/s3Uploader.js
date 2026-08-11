const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const axios = require('axios');
require('dotenv').config();

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

/**
 * Downloads an image from a URL and uploads it to S3
 * @param {string} imageUrl - The URL of the image (e.g. from Cloudinary)
 * @param {string} fileName - The desired file name in S3
 * @returns {Promise<string>} - The S3 object URL
 */
const uploadImageToS3 = async (imageUrl, fileName) => {
    try {
        // Fetch image as arraybuffer
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');

        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: response.headers['content-type'] || 'image/png',
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        const s3Url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        return s3Url;
    } catch (error) {
        console.error("Error uploading to S3:", error);
        throw error;
    }
};

/**
 * Generates a presigned URL for secure access to an S3 object
 * @param {string} rawUrl - The raw S3 URL
 * @returns {Promise<string>} - The presigned URL or the raw URL if it's not an S3 URL
 */
const getPresignedCertificateUrl = async (rawUrl) => {
    if (!rawUrl || !rawUrl.includes('s3.') || !rawUrl.includes('amazonaws.com')) {
        return rawUrl;
    }
    try {
        // Extract key from URL
        // Example URL: https://bucket-name.s3.ap-south-1.amazonaws.com/certificates/file.png
        const urlParts = rawUrl.split('.amazonaws.com/');
        if (urlParts.length !== 2) return rawUrl;
        
        const key = urlParts[1];
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key
        });
        
        // Signed URL expires in 1 hour
        return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    } catch (error) {
        console.error("Error generating presigned URL:", error);
        return rawUrl;
    }
};

module.exports = {
    uploadImageToS3,
    getPresignedCertificateUrl
};
