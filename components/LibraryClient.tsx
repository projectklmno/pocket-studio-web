'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type FileItem = {
  id: string;
  name: string;
  size: number;
  url: string;
  modifiedAt: string;
};

export default function LibraryClient() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const backendUrl = process.env. NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    axios
      .get(`${backendUrl}/files`)
      .then((res) => {
        setFiles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load files:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ color: '#fff' }}>Loading...</div>;

  return (
    <div>
      <p style={{ marginBottom: 20, color: '#fff' }}>{files.length} files</p>
      <div>
        {files.map((file) => (
          <div
            key={file.id}
            style={{
              padding: 15,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              marginBottom: 10,
              borderRadius: 12,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            }}
          >
            <div>
              <strong style={{ color: '#fff' }}>{file.name}</strong>
              <div style={{ fontSize: 12, color: '#fff', marginTop: 5, opacity: 0.8 }}>
                {(file.size / 1024 / 1024).toFixed(2)} MB · {new Date(file.modifiedAt).toLocaleDateString()}
              </div>
            </div>
            <a
              href={file.url}
              download
              style={{ 
                color: '#fff', 
                padding: '8px 16px', 
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 8,
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              Download
            </a>
          </div>
        ))}
        {files.length === 0 && (
          <p style={{ color: '#fff', textAlign: 'center', padding: 40, opacity: 0.7 }}>No files uploaded yet</p>
        )}
      </div>
    </div>
  );
}