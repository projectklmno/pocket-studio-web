'use client';

import React, { useRef, useState, useEffect } from 'react';

type LyricLine = {
  id: string;
  time: number;
  text: string;
};

export default function LyricsEditor() {
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [newLyricText, setNewLyricText] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioURL) return;
    const audio = new Audio(audioURL);
    audioRef.current = audio;

    const onTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener('timeupdate', onTime);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTime);
    };
  }, [audioURL]);

  const handleAudioUpload = (e:  React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL. createObjectURL(file);
      setAudioURL(url);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const addLyric = () => {
    if (!newLyricText.trim()) return;
    const newLyric: LyricLine = {
      id: Date.now().toString(),
      time: currentTime,
      text: newLyricText. trim(),
    };
    setLyrics([...lyrics, newLyric]. sort((a, b) => a.time - b.time));
    setNewLyricText('');
  };

  const removeLyric = (id: string) => {
    setLyrics(lyrics.filter((l) => l.id !== id));
  };

  const exportLyrics = () => {
    const json = JSON.stringify(lyrics, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL. createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lyrics.json';
    a.click();
  };

  const importLyrics = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (! file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        setLyrics(data);
      } catch (err) {
        alert('Invalid lyrics file');
      }
    };
    reader.readAsText(file);
  };

  const currentLyric = lyrics.filter((l) => l.time <= currentTime).slice(-1)[0];

  return (
    <div style={{ maxWidth: 900 }}>
      <section style={sectionStyle}>
        <h3 style={{ marginBottom: 15, color: '#fff' }}>1. Load Audio</h3>
        <input type="file" accept="audio/*" onChange={handleAudioUpload} style={{ color: '#fff' }} />
        {audioURL && (
          <div style={{ marginTop: 15 }}>
            <button onClick={togglePlay} style={buttonStyle}>
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            <span style={{ marginLeft: 15, fontSize: 16, color: '#fff' }}>Time: {formatTime(currentTime)}</span>
          </div>
        )}
      </section>

      <section style={sectionStyle}>
        <h3 style={{ marginBottom: 15, color: '#fff' }}>2. Add Lyrics</h3>
        <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
          <input
            type="text"
            value={newLyricText}
            onChange={(e) => setNewLyricText(e.target.value)}
            placeholder="Enter lyric line..."
            style={{ 
              flex: 1, 
              padding: 12, 
              fontSize: 16, 
              borderRadius: 12, 
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.2)',
              color: '#fff',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addLyric();
            }}
          />
          <button onClick={addLyric} style={addButtonStyle}>
            Add at {formatTime(currentTime)}
          </button>
        </div>

        <div style={{ marginTop: 20 }}>
          <button onClick={exportLyrics} style={exportButtonStyle}>
            📥 Export Lyrics
          </button>
          <label style={importLabelStyle}>
            📤 Import Lyrics
            <input type="file" accept=".json" onChange={importLyrics} style={{ display: 'none' }} />
          </label>
        </div>
      </section>

      <section style={sectionStyle}>
        <h3 style={{ marginBottom: 15, color: '#fff' }}>3. Current Lyric Preview</h3>
        <div style={previewStyle}>
          {currentLyric ? currentLyric.text : 'No lyric at this time'}
        </div>
      </section>

      <section style={{ marginTop: 30 }}>
        <h3 style={{ marginBottom: 15, color: '#fff' }}>All Lyrics ({lyrics.length})</h3>
        <div style={{ 
          maxHeight: 400, 
          overflowY: 'auto', 
          border: '1px solid rgba(255, 255, 255, 0.2)', 
          borderRadius: 16,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}>
          {lyrics. map((lyric) => (
            <div
              key={lyric.id}
              style={{
                padding: 15,
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                background: currentLyric?.id === lyric. id ? 'rgba(255, 243, 205, 0.2)' : 'transparent',
                color: '#fff',
              }}
            >
              <div>
                <strong>{formatTime(lyric.time)}</strong> - {lyric.text}
              </div>
              <button onClick={() => removeLyric(lyric.id)} style={deleteButtonStyle}>
                ✕
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const sectionStyle = {
  marginBottom: 30,
  padding: 20,
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 16,
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
};

const buttonStyle = {
  padding:  '10px 20px',
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: 12,
  cursor: 'pointer',
  fontSize: 16,
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  transition: 'all 0.3s ease',
};

const addButtonStyle = {
  ...buttonStyle,
  whiteSpace: 'nowrap' as const,
};

const exportButtonStyle = {
  ...buttonStyle,
  marginRight: 10,
};

const importLabelStyle = {
  ... buttonStyle,
  display: 'inline-block',
};

const deleteButtonStyle = {
  color: '#fff',
  cursor: 'pointer',
  border: 'none',
  background: 'rgba(220, 0, 0, 0.3)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  fontSize: 18,
  fontWeight: 'bold',
  padding: '5px 10px',
  borderRadius: 8,
  border: '1px solid rgba(255, 100, 100, 0.5)',
};

const previewStyle = {
  padding: 30,
  background: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  color: '#fff',
  fontSize: 32,
  textAlign: 'center' as const,
  borderRadius: 16,
  minHeight: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
};

function formatTime(s: number) {
  if (! s || s === Infinity) return '0:00';
  const mm = Math.floor(s / 60);
  const ss = Math.floor(s % 60)
    .toString()
    .padStart(2, '0');
  const ms = Math.floor((s % 1) * 100)
    .toString()
    .padStart(2, '0');
  return `${mm}:${ss}.${ms}`;
}