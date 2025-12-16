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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <p style={{ marginBottom: 20, color: '#666' }}>{files.length} files</p>
      <div>
        {files.map((file) => (
          <div
            key={file.id}
            style={{
              padding: 15,
              border: '1px solid #ddd',
              marginBottom: 10,
              borderRadius: 4,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'white',
            }}
          >
            <div>
              <strong>{file.name}</strong>
              <div style={{ fontSize: 12, color: '#666', marginTop: 5 }}>
                {(file.size / 1024 / 1024).toFixed(2)} MB · {new Date(file.modifiedAt).toLocaleDateString()}
              </div>
            </div>
            <a
              href={file.url}
              download
              style={{ color: '#0070f3', padding: '8px 16px', border: '1px solid #0070f3', borderRadius: 4 }}
            >
              Download
            </a>
          </div>
        ))}
        {files.length === 0 && (
          <p style={{ color: '#999', textAlign: 'center', padding: 40 }}>No files uploaded yet</p>
        )}
      </div>
    </div>
  );
}