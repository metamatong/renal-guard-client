import React, {useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '@/authprovider/AuthContext.tsx';
import {Upload, X} from 'lucide-react';
import clsx from 'clsx';
import CaptureImg from '@/assets/capture-cta.png?as=src';


import PageWrapper from '@/components/layouts/PageWrapper';
import {useAppDispatch} from '@/store/hooks';
import {uploadImageThunk} from '@/store/scanSlice';


const Scan: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const dispatch = useAppDispatch();

  // refs for <video> and file picker
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // keep a handle so we can stop the camera later
  const streamRef = useRef<MediaStream | null>(null);

  /* ─────────── 1 ▹ turn the camera on when the page mounts ─────────── */
  useEffect(() => {
    if (!loading && !user) {
      navigate('/signin');
      return;
    }
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {facingMode: {ideal: 'environment'}}, // back camera if possible
          audio: false
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
  const handleScan = async () => {
    const video = videoRef.current;
    if (!video) return;

    /* draw current frame to an off-screen canvas */
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')!.drawImage(video, 0, 0);
    canvas.toBlob(async (blob) => {
      if (!blob) return; // safety
      const file = new File([blob], `capture-${Date.now()}.png`, {
        type: 'image/png',
      });

      navigate('/processing');
      try {
        await dispatch(uploadImageThunk(file)).unwrap();
      } catch (err) {
        console.error('[Scan] uploadImageThunk failed:', err);
      }
    }, 'image/png');
  };

  /* ─────────── 3 ▹ gallery upload fallback ─────────── */
  const handleUpload = () => fileInputRef.current?.click();

  const onFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    navigate('/processing');
    try {
      await dispatch(uploadImageThunk(file)).unwrap();
    } catch (err) {
      console.error('[Scan] uploadImageThunk failed:', err);
    }
  };

  /* ---------- render ---------- */
  return (
    <PageWrapper
      extraComponents={{hasFooter: false, hasBottomNavigation: false}}
    >
      {/* same visual structure, now in the central band between nav + footer */}
      <div
        className={clsx(
          'flex flex-col flex-1 bg-black text-white',
          'min-h-[calc(100vh-256px)]'
        )}
      >
        {/* ── header ───────────────────────────────────────── */}
        <header
          className={clsx(
            'flex justify-between items-center p-4',
            'bg-blue-950'
          )}
        >
          <div className={'flex flex-col'}>
            <span className={clsx('text-[1.75em] font-semibold')}>Scan Your Meal</span>
            <span className={clsx('text-[0.875em] font-regular')}>Point your camera at your meal and capture it.</span>
          </div>
          <button
            onClick={() => navigate(-1)}
          >
            <X className={clsx('w-6 h-6')} />
          </button>
        </header>

        {/* ── live camera preview ──────────────────────────── */}
        <div
          className={clsx(
            'flex items-center justify-center bg-blue-950',
            'h-[30em]'
          )}
        >
          <div
            className={clsx(
              'w-full max-w-md h-96 border-4 border-dashed border-blue-600',
              'rounded-lg overflow-hidden flex items-center justify-center'
            )}
          >
            <video
              ref={videoRef}
              className={clsx('object-cover w-full h-full')}
              autoPlay
              playsInline
              muted
            />
          </div>
        </div>

        {/* ── footer controls ─────────────────────────────── */}
        <footer
          className={clsx(
            'p-2 flex flex-grow flex-col items-center justify-center',
            'bg-blue-950'
          )}
        >
          <button
            onClick={handleScan}
            className={clsx(
              'w-[6em] h-[6em]',
              'flex items-center justify-center'
            )}
          >
            <img
              src={CaptureImg}
              alt='Capture CTA'
              className={clsx(
                'w-[6em] h-auto'
              )}
            />
          </button>
          <button
            onClick={handleUpload}
            className={clsx(
              'bg-white text-gray-950 font-semibold',
              'flex w-[15.25em] justify-center items-center',
              'mt-8 px-8 py-2 gap-x-2 mb-[20em]',
              'rounded-full'
            )}
          >
            Upload from Gallery
            <Upload className={clsx('w-5 h-5')} />
          </button>
          <input
            type='file'
            ref={fileInputRef}
            onChange={onFileSelect}
            className={clsx('hidden')}
            accept='image/*'
          />
        </footer>
      </div>
    </PageWrapper>
  );
};

export default Scan;