import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, Loader } from 'lucide-react';
import { uploadDocument } from '../services/api';
import './DocumentUpload.css';

const DocumentUpload = ({ onUploadSuccess }) => {
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = async (file) => {
        const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];

        if (!validTypes.includes(file.type)) {
            setUploadStatus({
                success: false,
                message: 'Please upload PDF, DOCX, or TXT files only'
            });
            return;
        }

        setUploading(true);
        setUploadStatus(null);

        try {
            const response = await uploadDocument(file);
            setUploadStatus({
                success: true,
                message: `Successfully uploaded ${response.filename}`,
                details: `Created ${response.chunks_created} chunks`
            });
            if (onUploadSuccess) {
                onUploadSuccess();
            }
        } catch (error) {
            setUploadStatus({
                success: false,
                message: 'Upload failed',
                details: error.message
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="document-upload-card">
            <h3 className="card-title">
                <FileText size={20} />
                Upload Documents
            </h3>

            <form
                className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="file"
                    id="file-upload"
                    className="file-input"
                    onChange={handleChange}
                    accept=".pdf,.docx,.txt"
                    disabled={uploading}
                />

                <label htmlFor="file-upload" className="upload-label">
                    {uploading ? (
                        <>
                            <Loader className="upload-icon spinner" size={40} />
                            <p>Uploading...</p>
                        </>
                    ) : (
                        <>
                            <Upload className="upload-icon" size={40} />
                            <p className="upload-text">
                                <strong>Click to upload</strong> or drag and drop
                            </p>
                            <p className="upload-hint">PDF, DOCX, or TXT files</p>
                        </>
                    )}
                </label>
            </form>

            {uploadStatus && (
                <div className={`upload-status ${uploadStatus.success ? 'success' : 'error'}`}>
                    {uploadStatus.success ? (
                        <CheckCircle size={18} />
                    ) : (
                        <XCircle size={18} />
                    )}
                    <div>
                        <p className="status-message">{uploadStatus.message}</p>
                        {uploadStatus.details && (
                            <p className="status-details">{uploadStatus.details}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentUpload;
