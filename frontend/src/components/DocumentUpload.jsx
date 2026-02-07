import React, { useState } from 'react';
import { Upload, FolderOpen, CheckCircle, XCircle, Loader, FileText } from 'lucide-react';
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
                message: 'Invalid file type',
                details: 'Please upload PDF, DOCX, or TXT files only'
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
                details: `Created ${response.chunks_created} chunks for processing`
            });
            if (onUploadSuccess) {
                onUploadSuccess();
            }
        } catch (error) {
            setUploadStatus({
                success: false,
                message: 'Upload failed',
                details: error.message || 'Please try again'
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="document-upload-card">
            <h3 className="card-title">
                <div className="card-title-icon">
                    <FileText size={20} />
                </div>
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
                        <div className="upload-loading">
                            <div className="upload-spinner"></div>
                            <p className="upload-text">Processing your document...</p>
                            <div className="upload-progress">
                                <div className="upload-progress-bar"></div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="upload-icon-wrapper">
                                <Upload className="upload-icon" size={28} />
                            </div>
                            <p className="upload-text">
                                <strong>Click to upload</strong> or drag and drop
                            </p>
                            <p className="upload-hint">
                                Supported formats
                            </p>
                            <div className="file-types">
                                <span className="file-type-badge">PDF</span>
                                <span className="file-type-badge">DOCX</span>
                                <span className="file-type-badge">TXT</span>
                            </div>
                        </>
                    )}
                </label>
            </form>

            {uploadStatus && (
                <div className={`upload-status ${uploadStatus.success ? 'success' : 'error'}`}>
                    <div className="status-icon">
                        {uploadStatus.success ? (
                            <CheckCircle size={20} />
                        ) : (
                            <XCircle size={20} />
                        )}
                    </div>
                    <div className="status-content">
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
