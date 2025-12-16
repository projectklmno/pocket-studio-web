'use client';

import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [backingTrackURL, setBackingTrackURL] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const backingAudioRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      if (backingTrackURL && backingAudioRef.current) {
        backingAudioRef. current.play();
      }
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Microphone access denied. Please allow microphone access.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (backingAudioRef.current) {
        backingAudioRef.current. pause();
        backingAudioRef.current.currentTime = 0;
      }
    }
  };

  const handleBackingTrackUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files? .[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBackingTrackURL(url);
    }
  };

  const uploadRecording = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append('file', audioBlob, `recording-${Date.now()}.webm`);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

    try {
      const response = await axios.post(`${backendUrl}/files/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;
          setUploadProgress(percent);
        },
      });
      alert(`Upload successful! File ID: ${response. data.id}`);
      setUploadProgress(0);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed');
    }
  };

  useEffect(() => {
    if (backingTrackURL) {
      backingAudioRef.current = new Audio(backingTrackURL);
    }
  }, [backingTrackURL]);

  return (
    <div style={{ maxWidth:  800 }}>
      <section style={sectionStyle}>
        <h3 style={{ marginBottom: 15 }}>1. Select Backing Track (Optional)</h3>
        <input type="file" accept="audio/*" onChange={handleBackingTrackUpload} />
        {backingTrackURL && (
          <div style={{ marginTop: 15 }}>
            <audio controls src={backingTrackURL} style={{ width: '100%' }} />
          </div>
        )}
      </section>

      <section style={sectionStyle}>
        <h3 style={{ marginBottom: 15 }}>2. Record Your Vocals</h3>
        <div>
          {! isRecording ? (
            <button onClick={startRecording} style={recordButtonStyle}>
              🎤 Start Recording
            </button>
          ) : (
            <button onClick={stopRecording} style={stopButtonStyle}>
              ⏹ Stop Recording
            </button>
          )}
        </div>
        {isRecording && (
          <div style={{ marginTop: 15, color: 'red', fontWeight: 'bold', fontSize: 18 }}>
            🔴 Recording in progress...
          </div>
        )}
      </section>

      {audioURL && (
        <section style={sectionStyle}>
          <h3 style={{ marginBottom: 15 }}>3. Playback & Upload</h3>
          <audio controls src={audioURL} style={{ width: '100%', marginBottom: 15 }} />
          <button onClick={uploadRecording} style={uploadButtonStyle}>
            📤 Upload to Server
          </button>
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div style={{ marginTop:  10, fontSize: 16 }}>Uploading:  {uploadProgress}%</div>
          )}
        </section>
      )}
    </div>
  );
}

const sectionStyle = {
  marginBottom: 30,
  padding: 20,
  background:  '#f5f5f5',
  borderRadius: 8,
};

const recordButtonStyle = {
  padding: '15px 30px',
  fontSize: 16,
  background: '#0070f3',
  color: 'white',
  border: 'none',
  borderRadius:  6,
  cursor: 'pointer',
  fontWeight:  'bold',
};

const stopButtonStyle = {
  ... recordButtonStyle,
  background: '#d00',
};

const uploadButtonStyle = {
  padding: '12px 24px',
  background: '#0070f3',
  color: 'white',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
  fontSize: 16,
};