import AudioRecorder from '@/components/AudioRecorder';

export default function RecordPage() {
  return (
    <div style={{ padding: 40, maxWidth:  1200, margin: '0 auto' }}>
      <h1 style={{ marginBottom:  30, fontSize: 36 }}>🎤 Recording Studio</h1>
      <AudioRecorder />
    </div>
  );
}