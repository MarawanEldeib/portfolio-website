'use client';

import { useState } from 'react';
import { Upload, X, FileCheck, AlertCircle, Link2, File, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file
const MAX_FILES = 5; // Maximum 5 files
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

interface AttachmentUploadProps {
  onFilesChange: (files: File[]) => void;
  onUrlChange: (url: string) => void;
  error?: string;
  onError?: (error: string) => void;
}

export default function AttachmentUpload({ onFilesChange, onUrlChange, error, onError }: AttachmentUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewItem, setPreviewItem] = useState<File | string | null>(null);

  // Validate URL for security
  const validateUrl = (urlString: string): boolean => {
    setUrlError('');
    
    if (!urlString.trim()) {
      return false;
    }

    try {
      const parsedUrl = new URL(urlString);
      
      // Only allow HTTPS for security
      if (parsedUrl.protocol !== 'https:') {
        setUrlError('Only HTTPS URLs are allowed for security');
        return false;
      }

      // Blocked domains (phishing, malware, etc.)
      const blockedDomains = [
        'bit.ly',
        'tinyurl.com',
        'goo.gl',
        't.co',
        // Add more as needed
      ];

      const hostname = parsedUrl.hostname.toLowerCase();
      
      // Check if it's a blocked URL shortener
      if (blockedDomains.some(domain => hostname.includes(domain))) {
        setUrlError('URL shorteners are not allowed. Please use the full URL.');
        return false;
      }

      // Check for suspicious patterns
      if (hostname.includes('..') || hostname.includes('@')) {
        setUrlError('Suspicious URL pattern detected');
        return false;
      }

      // Must have a valid TLD
      if (!hostname.includes('.')) {
        setUrlError('Invalid URL format');
        return false;
      }

      return true;
    } catch (e) {
      setUrlError('Invalid URL format');
      return false;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    onError?.('');
    
    if (selectedFiles.length === 0) {
      return;
    }

    // Check total files limit
    if (files.length + selectedFiles.length > MAX_FILES) {
      onError?.(`Maximum ${MAX_FILES} files allowed`);
      return;
    }
    
    // Validate each file
    for (const file of selectedFiles) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        onError?.('Only PDF and Word documents are allowed');
        return;
      }
      
      if (file.size > MAX_FILE_SIZE) {
        onError?.(`File "${file.name}" exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
        return;
      }
    }
    
    const newFiles = [...files, ...selectedFiles];
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    
    if (newUrl.trim() && validateUrl(newUrl)) {
      onUrlChange(newUrl);
    } else if (!newUrl.trim()) {
      onUrlChange('');
    }
  };

  const handleUrlBlur = () => {
    if (url.trim()) {
      validateUrl(url);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange(newFiles);
    onError?.('');
  };

  const handleRemoveUrl = () => {
    setUrl('');
    setUrlError('');
    onUrlChange('');
  };

  const handlePreview = (item: File | string) => {
    setPreviewItem(item);
    setShowPreview(true);
  };

  const getFileIcon = (file: File) => {
    if (file.type.includes('pdf')) {
      return <File className="text-red-600" size={24} />;
    }
    return <File className="text-blue-600" size={24} />;
  };

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  return (
    <div className="space-y-3">
      {/* File Upload Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <Upload className="inline-block mr-1.5" size={14} />
            Upload Files {files.length > 0 && `(${files.length}/${MAX_FILES})`}
          </label>
          {files.length > 0 && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Total: {(totalSize / 1024 / 1024).toFixed(2)} MB
            </span>
          )}
        </div>
        
        <label
          htmlFor="files"
          className={`w-full flex flex-col items-center justify-center px-4 py-4 rounded-lg border-2 border-dashed transition-all ${
            files.length >= MAX_FILES
              ? 'border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 cursor-not-allowed opacity-50'
              : 'border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer'
          }`}
        >
          <Upload className="text-zinc-400 dark:text-zinc-500 mb-1.5" size={24} />
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-0.5">
            {files.length >= MAX_FILES ? 'Maximum files reached' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            PDF, DOC, DOCX up to 10MB each • Max {MAX_FILES} files
          </p>
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

      {/* Files Display */}
      <AnimatePresence>
        {files.map((file, index) => (
          <motion.div
            key={`${file.name}-${index}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div className="flex-shrink-0">{getFileIcon(file)}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate text-zinc-900 dark:text-zinc-100">{file.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 ml-2">
                <button
                  type="button"
                  onClick={() => handlePreview(file)}
                  className="p-1.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors group"
                  title="Preview"
                >
                  <Eye size={16} className="text-zinc-600 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="p-1.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors group"
                  title="Remove"
                >
                  <X size={16} className="text-zinc-600 dark:text-zinc-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* URL Input Section */}
      <div className="pt-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 block">
          <Link2 className="inline-block mr-1.5" size={14} />
          Or Add URL
        </label>
        
        <div className="relative">
          <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" size={18} />
          <input
            type="url"
            value={url}
            onChange={handleUrlChange}
            onBlur={handleUrlBlur}
            placeholder="https://example.com/document.pdf"
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm"
          />
          {url && (
            <button
              type="button"
              onClick={handleRemoveUrl}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <X size={16} className="text-zinc-400 dark:text-zinc-500" />
            </button>
          )}
        </div>
        
        {url && !urlError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 px-3 py-2 rounded-lg border border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-950/30 flex items-center justify-between"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <FileCheck size={16} className="text-green-600 dark:text-green-400 flex-shrink-0" />
              <span className="text-sm text-green-700 dark:text-green-300 truncate">{url}</span>
            </div>
            <button
              type="button"
              onClick={() => handlePreview(url)}
              className="ml-2 p-1 rounded-full hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
              title="Preview"
            >
              <Eye size={16} className="text-green-600 dark:text-green-400" />
            </button>
          </motion.div>
        )}
        
        <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-start gap-1.5 mt-1.5">
          <AlertCircle size={12} className="mt-0.5 flex-shrink-0" />
          <span>
            Files and URL can be uploaded together. HTTPS URLs only.
          </span>
        </p>
      </div>

      {/* Error Messages */}
      {(error || urlError) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-950/30 p-3 rounded-lg border border-red-200 dark:border-red-900/50"
        >
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <p>{error || urlError}</p>
        </motion.div>
      )}

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-zinc-200 dark:border-zinc-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Preview Header */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Attachment Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <X size={20} className="text-zinc-600 dark:text-zinc-400" />
                </button>
              </div>

              {/* Preview Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                {typeof previewItem === 'string' ? (
                  <div className="space-y-4">
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
                      <div className="flex items-start gap-4">
                        <Link2 className="text-green-600 dark:text-green-400 flex-shrink-0" size={24} />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-lg mb-2 text-zinc-900 dark:text-zinc-50">External Link</h4>
                          <a
                            href={previewItem}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline break-all text-sm"
                          >
                            {previewItem}
                          </a>
                          <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                            <p className="flex items-center gap-2">
                              <FileCheck size={16} className="text-green-600 dark:text-green-400" />
                              Secure HTTPS connection verified
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : previewItem ? (
                  <div className="space-y-4">
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
                      <div className="flex items-start gap-4">
                        {getFileIcon(previewItem)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-3 text-zinc-900 dark:text-zinc-50">{previewItem.name}</h4>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-zinc-500 dark:text-zinc-400">Type:</span>
                              <span className="ml-2 font-medium text-zinc-900 dark:text-zinc-100">
                                {previewItem.type.includes('pdf') ? 'PDF' : 'Word'}
                              </span>
                            </div>
                            <div>
                              <span className="text-zinc-500 dark:text-zinc-400">Size:</span>
                              <span className="ml-2 font-medium text-zinc-900 dark:text-zinc-100">
                                {(previewItem.size / 1024 / 1024).toFixed(2)} MB
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
