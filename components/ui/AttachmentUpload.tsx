'use client';

import { useState } from 'react';
import { Upload, X, File, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file
const MAX_FILES = 5;
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

interface AttachmentUploadProps {
  onFilesChange: (files: File[]) => void;
  error?: string;
  onError?: (error: string) => void;
}

export default function AttachmentUpload({ onFilesChange, error, onError }: AttachmentUploadProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    onError?.('');
    
    if (selectedFiles.length === 0) return;

    if (files.length + selectedFiles.length > MAX_FILES) {
      onError?.(`Maximum ${MAX_FILES} files allowed`);
      return;
    }
    
    for (const file of selectedFiles) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        onError?.('Only PDF and Word documents are allowed');
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        onError?.(`File "${file.name}" exceeds 10MB limit`);
        return;
      }
    }
    
    const newFiles = [...files, ...selectedFiles];
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange(newFiles);
    onError?.('');
  };

  const getFileIcon = (file: File) => {
    const color = file.type.includes('pdf') ? 'text-red-600' : 'text-blue-600';
    return <File className={color} size={20} />;
  };

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  return (
    <div className="space-y-3">
      {/* File Upload */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="files" className="text-sm text-zinc-600 dark:text-zinc-400">
            {files.length > 0 ? `${files.length}/${MAX_FILES} files` : 'Attachments (optional)'}
          </label>
          {files.length > 0 && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Total: {(totalSize / 1024 / 1024).toFixed(2)} MB
            </span>
          )}
        </div>
        
        <label
          htmlFor="files"
          aria-label="Upload files"
          className={`w-full flex flex-col items-center justify-center px-4 py-4 rounded-lg border-2 border-dashed transition-all ${
            files.length >= MAX_FILES
              ? 'border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 cursor-not-allowed opacity-50'
              : 'border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer'
          }`}
        >
          <Upload className="text-zinc-400 dark:text-zinc-500 mb-1.5" size={24} aria-hidden="true" />
          <span className="text-sm text-zinc-600 dark:text-zinc-400 mb-0.5">
            {files.length >= MAX_FILES ? 'Maximum files reached' : 'Click to upload or drag and drop'}
          </span>
          <span className="text-xs text-zinc-500">
            PDF, DOC, DOCX up to 10MB each • Max {MAX_FILES} files
          </span>
          <input
            type="file"
            id="files"
            name="files"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            multiple
            disabled={files.length >= MAX_FILES}
            className="hidden"
          />
        </label>
      </div>

      {/* Files List */}
      <AnimatePresence>
        {files.map((file, index) => (
          <motion.div
            key={`${file.name}-${index}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                {getFileIcon(file)}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate text-zinc-900 dark:text-zinc-100">{file.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="p-1.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                title="Remove"
              >
                <X size={16} className="text-zinc-600 dark:text-zinc-400 hover:text-red-600" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-950/30 p-3 rounded-lg border border-red-200 dark:border-red-900/50"
        >
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </motion.div>
      )}
    </div>
  );
}
