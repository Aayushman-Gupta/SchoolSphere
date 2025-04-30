import { useState } from "react";
import axios from "axios";
import { FileText, Upload, X, CheckCircle, AlertCircle, File, FileType } from "lucide-react";
import "./Reports.css";

export default function Reports() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploadState, setUploadState] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain"
    ];

    if (!validTypes.includes(file.type)) {
      setErrorMessage("Please upload a PDF or document file");
      setUploadState("error");
      return;
    }

    setSelectedFile(file);
    setErrorMessage("");
    setUploadState("idle");

    if (file.type === "application/pdf") {
      setFilePreview(URL.createObjectURL(file));
    } else {
      setFilePreview(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/plain"
      ];

      if (!validTypes.includes(file.type)) {
        setErrorMessage("Please upload a PDF or document file");
        setUploadState("error");
        return;
      }

      setSelectedFile(file);
      setErrorMessage("");
      setUploadState("idle");

      if (file.type === "application/pdf") {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(null);
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setUploadState("idle");
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMessage("Please enter a title");
      setUploadState("error");
      return;
    }

    if (!selectedFile) {
      setErrorMessage("Please select a file to upload");
      setUploadState("error");
      return;
    }

    setUploadState("uploading");

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('file', selectedFile);
      formData.append('isPublic', isPublic);

      const response = await fetch('http://localhost:8000/school/api/upload-report/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadState("success");
      } else {
        setUploadState("error");
        setErrorMessage("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setUploadState("error");
      setErrorMessage("An error occurred while uploading.");
    }
  };


  const getFileIcon = () => {
    if (!selectedFile) return <File />;
    const fileType = selectedFile.type;

    if (fileType === "application/pdf") return <FileText />;
    if (fileType.includes("word")) return <FileType />;
    if (fileType.includes("excel") || fileType.includes("sheet")) return <FileType />;
    return <File />;
  };

  return (
    <div className="report-upload-container">
      <div className="header-section">
        <h2 className="title">Upload Report</h2>
        <p className="subtitle">Upload reports, articles, or documents to share with the school community</p>
      </div>

      {uploadState === "success" ? (
        <div className="success-message">
          <CheckCircle size={48} className="success-icon" />
          <h3 className="success-title">Upload Successful!</h3>
          <p className="success-text">Your report "{title}" has been uploaded successfully.</p>
          <div className="button-group">
            <button
              onClick={() => {
                setTitle("");
                setDescription("");
                setCategory("");
                setSelectedFile(null);
                setFilePreview(null);
                setUploadState("idle");
              }}
              className="secondary-button"
            >
              Upload Another
            </button>
            <button className="primary-button">View All Reports</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Title */}
            <div>
              <label htmlFor="title" className="form-label">
                Title <span className="required">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                placeholder="Enter report title"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
              >
                <option value="">Select a category</option>
                <option value="results">Results</option>
                <option value="circulars">Circulars</option>
                <option value="event">Event</option>
                <option value="newsletter">Newsletter</option>
                <option value="notices">Notices</option>
                <option value="policy">Policy</option>
              </select>
            </div>

            {/* Description */}
            <div className="full-width">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="form-input"
                placeholder="Enter a brief description of the report"
              ></textarea>
            </div>

            {/* File Upload */}
            <div className="full-width">
              <label className="form-label">
                Upload File <span className="required">*</span>
              </label>

              {!selectedFile ? (
                <div
                  className="upload-area"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("file-upload").click()}
                >
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                  />
                  <Upload size={36} className="upload-icon" />
                  <p className="upload-text">Drag and drop or click to upload</p>
                  <p className="upload-subtext">Supports PDF, DOC, DOCX, XLS, XLSX, TXT (Max 10MB)</p>
                </div>
              ) : (
                <div className={`file-preview ${uploadState === "error" ? "error" : ""}`}>
                  <div className="file-info">
                    <div className="file-icon">{getFileIcon()}</div>
                    <div className="file-details">
                      <p className="file-name">{selectedFile.name}</p>
                      <p className="file-size">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                    <button type="button" onClick={removeFile} className="remove-button">
                      <X size={20} />
                    </button>
                  </div>

                  {filePreview && selectedFile.type === "application/pdf" && (
                    <div className="pdf-preview">
                      <iframe src={filePreview} className="pdf-frame" title="PDF preview" />
                    </div>
                  )}
                </div>
              )}

              {uploadState === "error" && (
                <p className="error-message">
                  <AlertCircle size={16} className="error-icon" /> {errorMessage}
                </p>
              )}
            </div>

            {/* Visibility */}
            <div className="full-width">
              <label className="form-label">Visibility</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type="radio"
                    id="public"
                    name="visibility"
                    checked={isPublic}
                    onChange={() => setIsPublic(true)}
                  />
                  <label htmlFor="public">Public - Visible to everyone</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="private"
                    name="visibility"
                    checked={!isPublic}
                    onChange={() => setIsPublic(false)}
                  />
                  <label htmlFor="private">Private - Visible to admins and staff only</label>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="form-actions">
              <button type="button" className="secondary-button">
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploadState === "uploading"}
                className={`primary-button ${uploadState === "uploading" ? "disabled" : ""}`}
              >
                {uploadState === "uploading" ? (
                  <div className="loading">
                    <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </div>
                ) : (
                  "Upload Report"
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
