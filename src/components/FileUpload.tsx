
import React, { useState } from 'react';
import { UploadCloud, File, X } from 'lucide-react';

type FileUploadProps = {
  onFileSelect: (file: File) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-4 text-center ${
        isDragging ? 'border-primary bg-primary/10' : 'border-border'
      } transition-colors`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {selectedFile ? (
        <div className="flex items-center justify-between p-2 bg-muted rounded">
          <div className="flex items-center">
            <File className="h-6 w-6 text-primary mr-2" />
            <span className="text-sm truncate max-w-[180px]">{selectedFile.name}</span>
          </div>
          <button
            onClick={removeFile}
            className="ml-2 text-gray-500 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-1">
              Drag & drop your invoice PDF here
            </p>
            <p className="text-xs text-muted-foreground">or</p>
            <label className="mt-2 cursor-pointer">
              <span className="text-sm text-primary hover:underline">
                Browse files
              </span>
              <input
                type="file"
                className="hidden"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUpload;
