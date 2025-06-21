import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, X } from 'lucide-react';

const Scan: React.FC = () => {
  const navigate = useNavigate();

  // refs for the <video> element and the file picker
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // keep a handle so we can stop the camera later
  const streamRef = useRef<MediaStream | null>(null);

  /* ─────────── 1 ▹ turn the camera on when the page mounts ─────────── */
  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } }, // try back camera
          audio: false,
        });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Could not access camera', err);
      }
    };

    enableCamera();

    // stop all tracks when we leave the page
    return () => {
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  /* ─────────── 2 ▹ take a snapshot ─────────── */
  const handleScan = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // dataURL contains the PNG snapshot
    const dataURL = canvas.toDataURL('image/png');

    // ‼️ TODO: send `dataURL` (or convert to Blob) to your backend
    // dispatch(uploadImageThunk(dataURL)); // ← example using Redux Thunk
    // await api.post('/scan', { image: dataURL });

    // For now we just log and move on
    console.log('Captured image, length:', dataURL.length);
    navigate('/processing');
  };

  /* ─────────── 3 ▹ gallery upload fallback ─────────── */
  const handleUpload = () => fileInputRef.current?.click();

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('Selected file:', file.name);

    // ‼️ TODO: upload `file` to backend
    // dispatch(uploadImageThunk(file));

    navigate('/processing');
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* ── header ───────────────────────────────────────── */}
      <header className="flex justify-between items-center p-4 bg-gray-900 bg-opacity-50">
        <h1 className="text-xl font-bold">Scan Your Meal</h1>
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
          <X className="w-6 h-6" />
        </button>
      </header>

      {/* ── live camera preview ──────────────────────────── */}
      <div className="flex-grow flex items-center justify-center bg-gray-800">
        <div className="w-full max-w-md h-96 border-4 border-dashed border-gray-600 rounded-lg overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            className="object-cover w-full h-full"
            autoPlay
            playsInline
            muted
          />
        </div>
      </div>

      {/* ── footer controls ─────────────────────────────── */}
      <footer className="p-4 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50">
        <button
          onClick={handleScan}
          className="w-20 h-20 bg-white rounded-full border-4 border-gray-500 flex items-center justify-center mb-4"
        >
          <Camera className="w-10 h-10 text-gray-800" />
        </button>
        <button onClick={handleUpload} className="text-blue-400 font-semibold flex items-center">
          <Upload className="w-5 h-5 mr-2" />
          Upload from Gallery
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileSelect}
          className="hidden"
          accept="image/*"
        />
      </footer>
    </div>
  );
};

export default Scan;