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
    FaTrash
} from "react-icons/fa";

import "../styles/Documents.css";

function Documents() {

    const { id } = useParams();

    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {

        try {

            const response = await axios.get(
                `http://localhost:8080/api/documents/trip/${id}`
            );

            setDocuments(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const uploadDocument = async (e) => {

        e.preventDefault();

        if (!file) {

            alert("Please select a file.");

            return;

        }

        const formData = new FormData();

        formData.append("tripId", id);
        formData.append("file", file);

        try {

            await axios.post(
                "http://localhost:8080/api/documents/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Document uploaded successfully!");

            setFile(null);

            document.getElementById("fileInput").value = "";

            fetchDocuments();

        } catch (error) {

            console.log(error);

            alert("Upload failed.");

        }

    };

    const deleteDocument = async (documentId) => {

        if (!window.confirm("Delete this document?")) return;

        try {

            await axios.delete(
                `http://localhost:8080/api/documents/${documentId}`
            );

            fetchDocuments();

        } catch (error) {

            console.log(error);

        }

    };

    const getIcon = (type = "") => {

        const fileType = type.toLowerCase();

        if (fileType.includes("pdf"))
            return <FaFilePdf className="pdfIcon" />;

        if (fileType.includes("word") || fileType.includes("doc"))
            return <FaFileWord className="docIcon" />;

        if (
            fileType.includes("png") ||
            fileType.includes("jpg") ||
            fileType.includes("jpeg")
        )
            return <FaFileImage className="imgIcon" />;

        if (
            fileType.includes("zip") ||
            fileType.includes("rar")
        )
            return <FaFileArchive className="zipIcon" />;

        return <FaFileAlt className="fileIcon" />;
    };

    return (

        <div className="documentsPage">

            <div className="documentsHeader">

                <h1>📄 Trip Documents</h1>

                <p>
                    Store all important travel documents in one place.
                </p>

            </div>

            <form
    className="uploadCard"
    onSubmit={uploadDocument}
>

    <div className="uploadInfo">

        <h3>📂 Choose a file</h3>

        <p>or drag & drop it here</p>

        <span>Supported: PDF, DOCX, JPG, PNG</span>

    </div>

    <div className="uploadControls">

        <input
            id="fileInput"
            type="file"
            onChange={(e)=>setFile(e.target.files[0])}
        />

        <button type="submit">

            <FaCloudUploadAlt/>

            Upload

        </button>

    </div>

</form>

            <div className="documentsGrid">

                {documents.length > 0 ? (

                    documents.map((doc) => (

                        <div
                            className="documentCard"
                            key={doc.id}
                        >

                            <div className="documentIcon">

                                {getIcon(doc.fileType)}

                            </div>

                            <h2>{doc.fileName}</h2>

                            <p>{doc.fileType}</p>

                            <button
                                className="deleteDocumentBtn"
                                onClick={() =>
                                    deleteDocument(doc.id)
                                }
                            >

                                <FaTrash />

                                Delete

                            </button>

                        </div>

                    ))

                ) : (

                    <div className="emptyDocuments">

                        <FaFileAlt className="emptyFile" />

                        <h2>No Documents</h2>

                        <p>
                            Upload your first travel document.
                        </p>

                    </div>

                )}

            </div>

        </div>

    );

}

export default Documents;