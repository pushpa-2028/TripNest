import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  FaFilePdf,
  FaFileWord,
  FaFileImage,
  FaFileArchive,
  FaFileAlt,
  FaCloudUploadAlt,
  FaTrash,
  FaCheckCircle,
  FaTimes,
  FaFolderOpen
} from "react-icons/fa";

import "../styles/Documents.css";

function Documents() {
  const { id } = useParams();

  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* =====================================
     FETCH DOCUMENTS
  ===================================== */

  useEffect(() => {
    fetchDocuments();
  }, [id]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `https://tripnest-fird.onrender.com/api/documents/trip/${id}`
      );

      setDocuments(response.data || []);
    } catch (error) {
      console.log("Fetch documents error:", error);

      setDocuments([]);
      setError(
        "Unable to load your documents."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================
     FILE SELECTION
  ===================================== */

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    setMessage("");
    setError("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    /* Maximum 10 MB */

    const maxSize =
      10 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
      setFile(null);

      setError(
        "File size must be less than 10 MB."
      );

      e.target.value = "";

      return;
    }

    /* Supported file types */

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "application/zip",
      "application/x-rar-compressed"
    ];

    if (
      selectedFile.type &&
      !allowedTypes.includes(
        selectedFile.type
      )
    ) {
      setFile(null);

      setError(
        "Unsupported file type. Please upload PDF, DOC, DOCX, JPG, PNG, ZIP or RAR."
      );

      e.target.value = "";

      return;
    }

    setFile(selectedFile);
  };

  /* =====================================
     FORMAT FILE SIZE
  ===================================== */

  const formatFileSize = (bytes) => {
    if (!bytes) {
      return "Unknown size";
    }

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(
        bytes / 1024
      ).toFixed(1)} KB`;
    }

    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(1)} MB`;
  };

  /* =====================================
     UPLOAD DOCUMENT
  ===================================== */

  const uploadDocument = async (e) => {
    e.preventDefault();

    if (!file) {
      setError(
        "Please select a document first."
      );

      return;
    }

    try {
      setUploading(true);
      setError("");
      setMessage("");

      const formData =
        new FormData();

      formData.append(
        "tripId",
        id
      );

      formData.append(
        "file",
        file
      );

      await axios.post(
        "https://tripnest-fird.onrender.com/api/documents/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      setMessage(
        "Document uploaded successfully!"
      );

      setFile(null);

      const input =
        document.getElementById(
          "fileInput"
        );

      if (input) {
        input.value = "";
      }

      await fetchDocuments();
    } catch (error) {
      console.log(
        "Upload document error:",
        error
      );

      setError(
        "Upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  /* =====================================
     DELETE DOCUMENT
  ===================================== */

  const deleteDocument = async (
    documentId
  ) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this document?"
      )
    ) {
      return;
    }

    try {
      setDeletingId(documentId);
      setError("");
      setMessage("");

      await axios.delete(
        `https://tripnest-fird.onrender.com/api/documents/${documentId}`
      );

      setMessage(
        "Document deleted successfully."
      );

      await fetchDocuments();
    } catch (error) {
      console.log(
        "Delete document error:",
        error
      );

      setError(
        "Failed to delete the document."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =====================================
     FILE ICON
  ===================================== */

  const getIcon = (
    type = "",
    fileName = ""
  ) => {
    const fileType =
      type.toLowerCase();

    const name =
      fileName.toLowerCase();

    if (
      fileType.includes("pdf") ||
      name.endsWith(".pdf")
    ) {
      return (
        <FaFilePdf className="pdfIcon" />
      );
    }

    if (
      fileType.includes("word") ||
      fileType.includes("doc") ||
      name.endsWith(".doc") ||
      name.endsWith(".docx")
    ) {
      return (
        <FaFileWord className="docIcon" />
      );
    }

    if (
      fileType.includes("png") ||
      fileType.includes("jpg") ||
      fileType.includes("jpeg") ||
      name.endsWith(".png") ||
      name.endsWith(".jpg") ||
      name.endsWith(".jpeg")
    ) {
      return (
        <FaFileImage className="imgIcon" />
      );
    }

    if (
      fileType.includes("zip") ||
      fileType.includes("rar") ||
      name.endsWith(".zip") ||
      name.endsWith(".rar")
    ) {
      return (
        <FaFileArchive className="zipIcon" />
      );
    }

    return (
      <FaFileAlt className="fileIcon" />
    );
  };

  /* =====================================
     FILE EXTENSION
  ===================================== */

  const getFileExtension = (
    fileName = ""
  ) => {
    const parts =
      fileName.split(".");

    if (parts.length <= 1) {
      return "FILE";
    }

    return parts[
      parts.length - 1
    ].toUpperCase();
  };

  /* =====================================
     LOADING
  ===================================== */

  if (loading) {
    return (
      <div className="documentsPage">

        <div className="documentsHeader">

          <h1>
            📄 Trip Documents
          </h1>

          <p>
            Loading your travel documents...
          </p>

        </div>

        <div className="documentsLoading">

          <div className="documentsSpinner"></div>

          <h3>
            Loading documents...
          </h3>

          <p>
            Please wait.
          </p>

        </div>

      </div>
    );
  }

  /* =====================================
     MAIN PAGE
  ===================================== */

  return (
    <div className="documentsPage">

      {/* =================================
          HEADER
      ================================= */}

      <div className="documentsHeader">

        <div>

          <h1>
            📄 Trip Documents
          </h1>

          <p>
            Store all your important travel
            documents safely in one place.
          </p>

        </div>

        <div className="documentCount">

          <FaFolderOpen />

          <div>

            <strong>
              {documents.length}
            </strong>

            <span>
              {documents.length === 1
                ? "Document"
                : "Documents"}
            </span>

          </div>

        </div>

      </div>

      {/* =================================
          SUCCESS MESSAGE
      ================================= */}

      {message && (
        <div className="documentMessage success">

          <FaCheckCircle />

          <span>
            {message}
          </span>

          <button
            type="button"
            onClick={() =>
              setMessage("")
            }
          >
            <FaTimes />
          </button>

        </div>
      )}

      {/* =================================
          ERROR MESSAGE
      ================================= */}

      {error && (
        <div className="documentMessage error">

          <span>
            ⚠️
          </span>

          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
          >
            <FaTimes />
          </button>

        </div>
      )}

      {/* =================================
          UPLOAD CARD
      ================================= */}

      <form
        className="uploadCard"
        onSubmit={uploadDocument}
      >

        <div className="uploadIcon">

          <FaCloudUploadAlt />

        </div>

        <div className="uploadInfo">

          <h3>
            Upload Travel Document
          </h3>

          <p>
            Choose a file from your computer
            to add it to this trip.
          </p>

          <span>
            PDF, DOC, DOCX, JPG, PNG, ZIP, RAR
            • Maximum 10 MB
          </span>

        </div>

        <div className="uploadControls">

          <label
            htmlFor="fileInput"
            className="chooseFileBtn"
          >
            Choose File
          </label>

          <input
            id="fileInput"
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.rar"
            onChange={handleFileChange}
          />

          <button
            type="submit"
            disabled={
              !file || uploading
            }
            className={
              uploading
                ? "uploadBtn uploading"
                : "uploadBtn"
            }
          >

            {uploading ? (
              <>
                <span className="buttonSpinner"></span>
                Uploading...
              </>
            ) : (
              <>
                <FaCloudUploadAlt />
                Upload Document
              </>
            )}

          </button>

        </div>

        {/* SELECTED FILE */}

        {file && (
          <div className="selectedFile">

            <div className="selectedFileIcon">

              {getIcon(
                file.type,
                file.name
              )}

            </div>

            <div className="selectedFileInfo">

              <strong>
                {file.name}
              </strong>

              <span>
                {formatFileSize(
                  file.size
                )}
              </span>

            </div>

            <button
              type="button"
              onClick={() => {

                setFile(null);

                const input =
                  document.getElementById(
                    "fileInput"
                  );

                if (input) {
                  input.value = "";
                }

              }}
              className="removeSelectedFile"
            >
              <FaTimes />
            </button>

          </div>
        )}

      </form>

      {/* =================================
          DOCUMENTS SECTION
      ================================= */}

      <div className="documentsSectionHeader">

        <div>

          <h2>
            Your Documents
          </h2>

          <p>
            Important files saved for this trip
          </p>

        </div>

      </div>

      <div className="documentsGrid">

        {documents.length > 0 ? (

          documents.map((doc) => (

            <div
              className="documentCard"
              key={doc.id}
            >

              {/* FILE ICON */}

              <div className="documentIcon">

                {getIcon(
                  doc.fileType,
                  doc.fileName
                )}

              </div>

              {/* FILE INFO */}

              <div className="documentCardContent">

                <h2
                  title={doc.fileName}
                >
                  {doc.fileName}
                </h2>

                <div className="documentMeta">

                  <span>
                    {getFileExtension(
                      doc.fileName
                    )}
                  </span>

                  {doc.fileType && (
                    <span>
                      {doc.fileType}
                    </span>
                  )}

                </div>

              </div>

              {/* DELETE */}

              <button
                className="deleteDocumentBtn"
                disabled={
                  deletingId === doc.id
                }
                onClick={() =>
                  deleteDocument(
                    doc.id
                  )
                }
              >

                {deletingId === doc.id ? (
                  <>
                    <span className="buttonSpinner"></span>
                    Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash />
                    Delete
                  </>
                )}

              </button>

            </div>

          ))

        ) : (

          <div className="emptyDocuments">

            <div className="emptyDocumentIcon">

              <FaFileAlt />

            </div>

            <h2>
              No Documents Yet
            </h2>

            <p>
              Keep your tickets, hotel
              confirmations, IDs and other
              important travel files here.
            </p>

            <label
              htmlFor="fileInput"
              className="emptyUploadBtn"
            >
              <FaCloudUploadAlt />
              Upload Your First Document
            </label>

          </div>

        )}

      </div>

    </div>
  );
}

export default Documents;