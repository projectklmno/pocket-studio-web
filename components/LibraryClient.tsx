'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useThemedStyles } from './useThemedStyles';

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
  const { getTextColor, getGlassStyle } = useThemedStyles();

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

  if (loading) return <div style={{ color: getTextColor() }}>Loading...</div>;

  return (
    <div>
      <p style={{ marginBottom: 20, color: getTextColor() }}>{files.length} files</p>
      <div>
        {files.map((file) => (
          <div
            key={file.id}
            style={{
              padding: 15,
              marginBottom: 10,
              borderRadius: 12,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              ...getGlassStyle(0.15),
            }}
          >
            <div>
              <strong style={{ color: getTextColor() }}>{file.name}</strong>
              <div style={{ fontSize: 12, color: getTextColor(), marginTop: 5, opacity: 0.8 }}>
                {(file.size / 1024 / 1024).toFixed(2)} MB · {new Date(file.modifiedAt).toLocaleDateString()}
              </div>
            </div>
            <a
              href={file.url}
              download
              style={{ 
                color: getTextColor(), 
                padding: '8px 16px', 
                borderRadius: 8,
                ...getGlassStyle(0.2),
              }}
            >
              Download
            </a>
          </div>
        ))}
        {files.length === 0 && (
          <p style={{ color: getTextColor(), textAlign: 'center', padding: 40, opacity: 0.7 }}>No files uploaded yet</p>
        )}
      </div>
    </div>
  );
}