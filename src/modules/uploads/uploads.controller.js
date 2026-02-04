import * as uploadService from "./uploads.service.js";
import responseHandler from "../../utils/responseHandler.js";

export const getPresignedUrl = async (req, res) => {
  try {
    const { tenant_id, category, path, mimeType } = req.body;
    if (!tenant_id || !category || !path || !mimeType) {
      return responseHandler(res, "error", null, "Missing required fields.");
    }

    const urlData = await uploadService.getPresignedUrl(
      tenant_id,
      category,
      path,
      mimeType
    );

    return responseHandler(
      res,
      "success",
      urlData,
      "Pre-signed URL generated successfully."
    );
  } catch (error) {
    return responseHandler(res, "error", null, error.message);
  }
};

export const storeFileMetadata = async (req, res) => {
  try {
    const { tenant_id, category, entity_id, document_type, gcs_url } = req.body;
    if (!tenant_id || !category || !entity_id || !document_type || !gcs_url) {
      return responseHandler(res, "error", null, "Missing required fields.");
    }

    const storedFile = await uploadService.storeFileMetadata(
      tenant_id,
      category,
      entity_id,
      document_type,
      gcs_url
    );

    return responseHandler(
      res,
      "success",
      storedFile,
      "File metadata stored successfully."
    );
  } catch (error) {
    return responseHandler(res, "error", null, error.message);
  }
};

export const getFiles = async (req, res) => {
  try {
    const { tenant_id, category, entity_id } = req.params;
    if (!tenant_id || !category || !entity_id) {
      return responseHandler(
        res,
        "error",
        null,
        "Missing required parameters."
      );
    }

    const files = await uploadService.getFiles(tenant_id, category, entity_id);
    return responseHandler(
      res,
      "success",
      files,
      "Files retrieved successfully."
    );
  } catch (error) {
    return responseHandler(res, "error", null, error.message);
  }
};

export const getSpecificFile = async (req, res) => {
  try {
    const { tenant_id, category, entity_id, document_type } = req.params;
    if (!tenant_id || !category || !entity_id || !document_type) {
      return responseHandler(
        res,
        "error",
        null,
        "Missing required parameters."
      );
    }

    const file = await uploadService.getSpecificFile(
      tenant_id,
      category,
      entity_id,
      document_type
    );

    if (!file) {
      return responseHandler(res, "error", null, "File not found.");
    }

    return responseHandler(
      res,
      "success",
      file,
      "File retrieved successfully."
    );
  } catch (error) {
    return responseHandler(res, "error", null, error.message);
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { tenant_id, category, entity_id, file_id } = req.params;
    if (!tenant_id || !category || !entity_id || !file_id) {
      return responseHandler(
        res,
        "error",
        null,
        "Missing required parameters."
      );
    }

    await uploadService.deleteFile(tenant_id, category, entity_id, file_id);
    return responseHandler(res, "success", null, "File deleted successfully.");
  } catch (error) {
    return responseHandler(res, "error", null, error.message);
  }
};
