import { Storage } from "@google-cloud/storage";
import { Upload } from "../../models/index.js";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

// Load Google Cloud credentials
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GCS_SERVICE_ACCOUNT_PATH,
});

const bucketName = process.env.GCS_BUCKET_NAME;
const bucket = storage.bucket(bucketName);

/**
 * Generate a signed URL for file upload to Google Cloud Storage.
 */
export const getPresignedUrl = async (tenant_id, category, path, mimeType) => {
  const fileParts = path.split(".");
  const extension = fileParts.pop();
  const filename = fileParts.join(".");
  const timestamp = Date.now();

  // Construct the new file path
  const newFilename = `${filename}_${timestamp}.${extension}`;
  const fullPath = `${tenant_id}/${category}/${newFilename}`;

  const file = bucket.file(fullPath);

  // Generate a signed URL for PUT operation
  const [url] = await file.getSignedUrl({
    action: "write",
    expires: Date.now() + 10 * 60 * 1000, // 10 minutes expiry
    contentType: mimeType,
  });

  return {
    uploadUrl: url,
    fileUrl: `https://storage.googleapis.com/${bucketName}/${fullPath}`,
  };
};

/**
 * Store file metadata in the database after successful upload.
 */
export const storeFileMetadata = async (
  tenant_id,
  category,
  entity_id,
  document_type,
  gcs_url
) => {
  const fileParts = gcs_url.split("/");
  const filename = fileParts[fileParts.length - 1]; // Extract filename from GCS URL

  return await Upload.create({
    tenant_id,
    category,
    entity_id,
    document_type,
    s3_url: gcs_url, // Change field name later if needed
    filename,
  });
};

/**
 * Get all files for an entity.
 */
export const getFiles = async (tenant_id, category, entity_id) => {
  return await Upload.findAll({
    where: { tenant_id, category, entity_id },
  });
};

/**
 * Get a specific file by document type.
 */
export const getSpecificFile = async (
  tenant_id,
  category,
  entity_id,
  document_type
) => {
  return await Upload.findOne({
    where: { tenant_id, category, entity_id, document_type },
  });
};

/**
 * Delete a file from Google Cloud Storage and remove its record from the database.
 */
export const deleteFile = async (tenant_id, category, entity_id, file_id) => {
  const fileRecord = await Upload.findOne({
    where: { tenant_id, category, entity_id, id: file_id },
  });
  if (!fileRecord) throw new Error("File not found");

  const gcsKey = fileRecord.s3_url.split(
    `https://storage.googleapis.com/${bucketName}/`
  )[1];

  await bucket.file(gcsKey).delete();

  await Upload.destroy({ where: { id: file_id } });
};
