// This is the code to connect to AWS S3 Server
require('dotenv').config()
const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')

// Credentials
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

// Uploads the file to AWS Bucket
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}

module.exports = {uploadFile}