import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, X } from 'lucide-react';

const Scan: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleScan = () => {
    // TODO: Capture image from camera/webcam view
    console.log('Capturing image...');
    // After capturing, navigate to processing
    navigate('/processing');
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log('Uploading file:', file.name);
      // TODO: Handle file upload logic
      // After upload, navigate to processing
      navigate('/processing');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <header className="flex justify-between items-center p-4 bg-gray-900 bg-opacity-50">
        <h1 className="text-xl font-bold">Scan Your Meal</h1>
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
          <X className="w-6 h-6" />
        </button>
      </header>

      {/* Placeholder for camera view */}
      <div className="flex-grow flex items-center justify-center bg-gray-800">
        <div className="w-full max-w-md h-96 border-4 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Camera View Here</p>
        </div>
      </div>

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
