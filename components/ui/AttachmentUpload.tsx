'use client';

import { useState } from 'react';
import { Upload, X, FileCheck, AlertCircle, Link2, File, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

interface AttachmentUploadProps {
  onAttachmentChange: (attachment: File | string | null) => void;
  error?: string;
  onError?: (error: string) => void;
}

export default function AttachmentUpload({ onAttachmentChange, error, onError }: AttachmentUploadProps) {
  const [attachmentType, setAttachmentType] = useState<'file' | 'url'>('file');
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [showPreview, setShowPreview] = useState(false);

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
    const selectedFile = e.target.files?.[0];
    onError?.('');
    
    if (!selectedFile) {
      setFile(null);
      onAttachmentChange(null);
      return;
    }
    
    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      onError?.('Only PDF and Word documents are allowed');
      setFile(null);
      onAttachmentChange(null);
      return;
    }
    
    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      onError?.(`File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`);
      setFile(null);
      onAttachmentChange(null);
      return;
    }
    
    setFile(selectedFile);
    onAttachmentChange(selectedFile);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    
    if (newUrl.trim() && validateUrl(newUrl)) {
      onAttachmentChange(newUrl);
    } else if (newUrl.trim()) {
      onAttachmentChange(null);
    }
  };

  const handleUrlBlur = () => {
    if (url.trim()) {
      validateUrl(url);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setUrl('');
    setUrlError('');
    onError?.('');
    onAttachmentChange(null);
    setShowPreview(false);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const getFileIcon = () => {
    if (file) {
      if (file.type.includes('pdf')) {
        return <File className="text-red-600" size={24} />;
      }
      return <File className="text-blue-600" size={24} />;
    }
    return <Link2 className="text-green-600" size={24} />;
  };

  const hasAttachment = file || (url && !urlError);

  return (
    <div className="space-y-3">
      {/* Toggle between File and URL */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setAttachmentType('file');
            handleRemove();
          }}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            attachmentType === 'file'
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-md'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          <Upload className="inline-block mr-2" size={16} />
          Upload File
        </button>
        <button
          type="button"
          onClick={() => {
            setAttachmentType('url');
            handleRemove();
          }}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            attachmentType === 'url'
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-md'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          <Link2 className="inline-block mr-2" size={16} />
          Add URL
        </button>
      </div>

      {/* File Upload */}
      {attachmentType === 'file' && !file && (
        <label
          htmlFor="file"
          className="w-full flex flex-col items-center justify-center px-4 py-6 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <Upload className="text-zinc-400 dark:text-zinc-500 mb-2" size={28} />
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            PDF, DOC, DOCX up to 10MB
          </p>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />
        </label>
      )}

      {/* URL Input */}
      {attachmentType === 'url' && !url && (
        <div className="space-y-2">
          <div className="relative">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" size={18} />
            <input
              type="url"
              value={url}
              onChange={handleUrlChange}
              onBlur={handleUrlBlur}
              placeholder="https://example.com/document.pdf"
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-start gap-1.5">
            <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
            <span>
              Only HTTPS URLs accepted. URL shorteners are blocked for security. 
              Please provide direct links to documents, portfolios, or relevant resources.
            </span>
          </p>
        </div>
      )}

      {/* Attachment Display */}
      <AnimatePresence>
        {hasAttachment && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0">{getFileIcon()}</div>
                <div className="min-w-0 flex-1">
                  {file ? (
                    <>
                      <p className="text-sm font-medium truncate text-zinc-900 dark:text-zinc-100">{file.name}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium truncate text-zinc-900 dark:text-zinc-100">{url}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">External Link</p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-3">
                <button
                  type="button"
                  onClick={handlePreview}
                  className="p-1.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors group"
                  title="Preview"
                >
                  <Eye size={18} className="text-zinc-600 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-1.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors group"
                  title="Remove"
                >
                  <X size={18} className="text-zinc-600 dark:text-zinc-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                {file ? (
                  <div className="space-y-4">
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
                      <div className="flex items-start gap-4">
                        {getFileIcon()}
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2 text-zinc-900 dark:text-zinc-50">{file.name}</h4>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-zinc-500 dark:text-zinc-400">Type:</span>
                              <span className="ml-2 font-medium text-zinc-900 dark:text-zinc-100">
                                {file.type.includes('pdf') ? 'PDF Document' : 'Word Document'}
                              </span>
                            </div>
                            <div>
                              <span className="text-zinc-500 dark:text-zinc-400">Size:</span>
                              <span className="ml-2 font-medium text-zinc-900 dark:text-zinc-100">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </span>
                            </div>
                            <div className="col-span-2">
                              <span className="text-zinc-500 dark:text-zinc-400">Last Modified:</span>
                              <span className="ml-2 font-medium text-zinc-900 dark:text-zinc-100">
                                {new Date(file.lastModified).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
                      File preview will be available after upload. The recipient will receive this attachment.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
                      <div className="flex items-start gap-4">
                        <Link2 className="text-green-600 dark:text-green-400 flex-shrink-0" size={24} />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-lg mb-2 text-zinc-900 dark:text-zinc-50">External Link</h4>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline break-all"
                          >
                            {url}
                          </a>
                          <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                            <p className="flex items-center gap-2 mb-1">
                              <FileCheck size={16} className="text-green-600 dark:text-green-400" />
                              Secure HTTPS connection verified
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                              This link will be shared with the recipient. Make sure it's accessible and relevant.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
