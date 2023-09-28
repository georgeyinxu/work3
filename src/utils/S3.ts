import { S3 } from "aws-sdk";

const s3 = new S3({
  accessKeyId: process.env.S3_UPLOAD_KEY,
  secretAccessKey: process.env.S3_UPLOAD_SECRET,
  region: process.env.S3_UPLOAD_REGION,
});

const handleUpload = async (
  buffer: Buffer,
  fileName: string,
  listingId: string
) => {
  let location = "";
  const S3_UPLOAD_BUCKET = process.env.S3_UPLOAD_BUCKET || "";

  const params = {
    Bucket: S3_UPLOAD_BUCKET,
    Key: `${listingId}/${Date.now()}/${fileName}`,
    Body: buffer,
  };

  try {
    const upload = await s3.upload(params).promise();
    location = upload.Location;
    console.log(location);
  } catch (error) {
    console.error(error);
  }

  return location;
};

export { handleUpload };
