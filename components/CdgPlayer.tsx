'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useThemedStyles } from './useThemedStyles';

type Props = {
  audioUrl?:  string;
  cdgUrl?: string;
};

export default function CdgPlayer({ audioUrl, cdgUrl }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [audioFile, setAudioFile] = useState<string | null>(audioUrl || null);
  const [cdgFile, setCdgFile] = useState<string | null>(cdgUrl || null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [backgroundType, setBackgroundType] = useState<'none' | 'color' | 'image'>('none');
  const [backgroundColor, setBackgroundColor] = useState<string>('#1a1a1a');
  const { getTextColor, getGlassStyle, getButtonStyle, getTextShadow } = useThemedStyles();

  const cdgFramesRef = useRef<Array<{ time: number; draw: (ctx: CanvasRenderingContext2D) => void }>>([]);

  useEffect(() => {
    if (!audioFile) return;

    const audioEl = new Audio(audioFile);
    audioEl.crossOrigin = 'anonymous';
    audioRef.current = audioEl;

    const onTime = () => setCurrentTime(audioEl.currentTime);
    const onLoaded = () => setDuration(audioEl.duration || 0);

    audioEl.addEventListener('timeupdate', onTime);
    audioEl.addEventListener('loadedmetadata', onLoaded);

    if (cdgFile) {
      axios
        .get(cdgFile, { responseType:  'arraybuffer' })
        .then((res) => {
          cdgFramesRef.current = parseCdgToFrames(res.data as ArrayBuffer);
        })
        .catch((err) => console.warn('Failed to load CDG:', err));
    }

    return () => {
      audioEl.pause();
      audioEl.removeEventListener('timeupdate', onTime);
      audioEl.removeEventListener('loadedmetadata', onLoaded);
      if (animationRef.current) cancelAnimationFrame(animationRef. current);
    };
  }, [audioFile, cdgFile]);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const audio = audioRef.current;
      if (!canvas || !audio) {
        animationRef.current = requestAnimationFrame(render);
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw background
      if (backgroundType === 'color') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (backgroundType === 'image' && backgroundImage) {
        const img = new Image();
        img.src = backgroundImage;
        if (img.complete) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      const t = audio.currentTime;
      const frames = cdgFramesRef.current;
      for (let i = frames.length - 1; i >= 0; i--) {
        if (frames[i].time <= t) {
          frames[i].draw(ctx);
          break;
        }
      }
      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [backgroundType, backgroundColor, backgroundImage]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const onSeek = (e: React. ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef. current;
    if (!audio) return;
    audio.currentTime = Number(e.target.value);
    setCurrentTime(audio.currentTime);
  };

  const handleAudioUpload = (e: React. ChangeEvent<HTMLInputElement>) => {
    const file = e. target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioFile(url);
    }
  };

  const handleCdgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCdgFile(url);
    }
  };

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBackgroundImage(url);
      setBackgroundType('image');
    }
  };

  const buttonStyle = {
    padding: '12px 24px',
    fontSize: 16,
    ...getButtonStyle(),
    borderRadius: 12,
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={{ maxWidth: 900 }}>
      <div style={{ 
        marginBottom: 20, 
        padding: 20, 
        ...getGlassStyle(0.15),
        borderRadius: 16,
      }}>
        <div style={{ marginBottom: 15 }}>
          <label style={{ marginRight: 10, fontWeight: 'bold', color: getTextColor() }}>Audio File:</label>
          <input type="file" accept="audio/*" onChange={handleAudioUpload} style={{ color: getTextColor() }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label style={{ marginRight: 10, fontWeight: 'bold', color: getTextColor() }}>CDG File:</label>
          <input type="file" accept=".cdg" onChange={handleCdgUpload} style={{ color: getTextColor() }} />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label style={{ marginRight: 10, fontWeight: 'bold', color: getTextColor() }}>Background:</label>
          <select 
            value={backgroundType} 
            onChange={(e) => setBackgroundType(e.target.value as 'none' | 'color' | 'image')}
            style={{ 
              marginRight: 10, 
              padding: '5px 10px', 
              borderRadius: 8, 
              ...getGlassStyle(0.2),
              color: getTextColor(),
            }}
          >
            <option value="none" style={{ color: '#000' }}>None</option>
            <option value="color" style={{ color: '#000' }}>Solid Color</option>
            <option value="image" style={{ color: '#000' }}>Image</option>
          </select>
          {backgroundType === 'color' && (
            <input 
              type="color" 
              value={backgroundColor} 
              onChange={(e) => setBackgroundColor(e.target.value)}
              style={{ cursor: 'pointer' }}
            />
          )}
          {backgroundType === 'image' && (
            <input type="file" accept="image/*" onChange={handleBackgroundUpload} style={{ color: getTextColor() }} />
          )}
        </div>
      </div>

      <div style={{ marginBottom:  15 }}>
        <button onClick={togglePlay} style={buttonStyle}>
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <span style={{ marginLeft: 15, fontSize: 16, color: getTextColor(), textShadow: getTextShadow() }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={currentTime}
        onChange={onSeek}
        style={{ width: '100%', height: 8, cursor: 'pointer' }}
      />
      <div style={{ marginTop: 15 }}>
        <canvas ref={canvasRef} width={768} height={432} style={{ 
          width: '100%', 
          borderRadius: 16,
          ...getGlassStyle(0),
          background: '#000', 
        }} />
      </div>
    </div>
  );
}

function formatTime(s: number) {
  if (! s || s === Infinity) return '0:00';
  const mm = Math.floor(s / 60);
  const ss = Math.floor(s % 60)
    .toString()
    .padStart(2, '0');
  return `${mm}:${ss}`;
}

function parseCdgToFrames(buf: ArrayBuffer) {
  const frames: Array<{ time: number; draw: (ctx: CanvasRenderingContext2D) => void }> = [];
  const data = new Uint8Array(buf);
  
  // CDG constants
  const CDG_PACKET_SIZE = 24;
  const CDG_WIDTH = 300;
  const CDG_HEIGHT = 216;
  const PACKETS_PER_SECOND = 300;
  const CDG_COMMAND = 0x09;
  
  // CDG instructions
  const MEMORY_PRESET = 1;
  const BORDER_PRESET = 2;
  const TILE_BLOCK = 6;
  const _SCROLL_PRESET = 20;
  const _SCROLL_COPY = 24;
  const _DEFINE_TRANSPARENT_COLOR = 28;
  const LOAD_COLOR_TABLE_LOW = 30;
  const LOAD_COLOR_TABLE_HIGH = 31;
  const TILE_BLOCK_XOR = 38;
  
  // Create a persistent screen buffer and color table
  const screenBuffer = new Uint8Array(CDG_WIDTH * CDG_HEIGHT);
  const colorTable = new Uint32Array(16);
  
  // Default color table (RGB)
  for (let i = 0; i < 16; i++) {
    colorTable[i] = 0xFF000000 | (i * 17) | ((i * 17) << 8) | ((i * 17) << 16);
  }
  
  let packetIndex = 0;
  
  while (packetIndex * CDG_PACKET_SIZE < data.length) {
    const packetStart = packetIndex * CDG_PACKET_SIZE;
    const packet = data.slice(packetStart, packetStart + CDG_PACKET_SIZE);
    
    if (packet.length < CDG_PACKET_SIZE) break;
    
    const command = packet[0] & 0x3F;
    const instruction = packet[1] & 0x3F;
    
    if (command === CDG_COMMAND) {
      const subcode = packet.slice(4, 20);
      
      if (instruction === LOAD_COLOR_TABLE_LOW || instruction === LOAD_COLOR_TABLE_HIGH) {
        const offset = instruction === LOAD_COLOR_TABLE_LOW ? 0 : 8;
        for (let i = 0; i < 8; i++) {
          const colorIndex = offset + i;
          const high = subcode[2 * i] & 0x3F;
          const low = subcode[2 * i + 1] & 0x3F;
          const r = ((high & 0x30) >> 4) * 17;
          const g = ((high & 0x0C) >> 2) * 17;
          const b = (high & 0x03) * 17;
          const r2 = ((low & 0x30) >> 4) * 17;
          const g2 = ((low & 0x0C) >> 2) * 17;
          const b2 = (low & 0x03) * 17;
          colorTable[colorIndex] = 0xFF000000 | (r * 16 + r2) | ((g * 16 + g2) << 8) | ((b * 16 + b2) << 16);
        }
      } else if (instruction === MEMORY_PRESET || instruction === BORDER_PRESET) {
        const color = subcode[0] & 0x0F;
        screenBuffer.fill(color);
      } else if (instruction === TILE_BLOCK || instruction === TILE_BLOCK_XOR) {
        const color0 = subcode[0] & 0x0F;
        const color1 = subcode[1] & 0x0F;
        const row = (subcode[2] & 0x1F);
        const column = (subcode[3] & 0x3F);
        
        for (let i = 0; i < 12; i++) {
          const byte = subcode[4 + i];
          for (let bit = 0; bit < 6; bit++) {
            const pixelColor = (byte & (1 << (5 - bit))) ? color1 : color0;
            const x = column * 6 + bit;
            const y = row * 12 + i;
            if (x < CDG_WIDTH && y < CDG_HEIGHT) {
              const pixelIndex = y * CDG_WIDTH + x;
              if (instruction === TILE_BLOCK_XOR) {
                screenBuffer[pixelIndex] ^= pixelColor;
              } else {
                screenBuffer[pixelIndex] = pixelColor;
              }
            }
          }
        }
      }
    }
    
    // Create frame snapshots at intervals
    if (packetIndex % 10 === 0) {
      const time = packetIndex / PACKETS_PER_SECOND;
      const screenCopy = new Uint8Array(screenBuffer);
      const colorTableCopy = new Uint32Array(colorTable);
      
      frames.push({
        time,
        draw: (ctx: CanvasRenderingContext2D) => {
          const canvas = ctx.canvas;
          const imageData = ctx.createImageData(CDG_WIDTH, CDG_HEIGHT);
          const buf32 = new Uint32Array(imageData.data.buffer);
          
          for (let i = 0; i < screenCopy.length; i++) {
            buf32[i] = colorTableCopy[screenCopy[i]];
          }
          
          ctx.putImageData(imageData, 0, 0);
          ctx.imageSmoothingEnabled = false;
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = CDG_WIDTH;
          tempCanvas.height = CDG_HEIGHT;
          const tempCtx = tempCanvas.getContext('2d')!;
          tempCtx.putImageData(imageData, 0, 0);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
        },
      });
    }
    
    packetIndex++;
  }
  
  return frames;
}