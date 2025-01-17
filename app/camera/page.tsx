'use client';

import { useState, useRef, useEffect } from 'react';
import { createWorker } from 'tesseract.js';
import { Camera } from 'lucide-react';

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [ocrResult, setOcrResult] = useState('');
  const [worker, setWorker] = useState<Tesseract.Worker | null>(null);

  useEffect(() => {
    const initializeWorker = async () => {
      const newWorker = await createWorker('eng');
      setWorker(newWorker);
    };
    initializeWorker();

    return () => {
      if (worker) {
        worker.terminate();
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsStreaming(true);
      }
    } catch (err) {
      console.error('Error accessing the camera:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setIsStreaming(false);
    }
  };

  const captureImage = async () => {
    if (videoRef.current && canvasRef.current && worker) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg');

        try {
          const {
            data: { text },
          } = await worker.recognize(imageDataUrl);
          setOcrResult(text);
        } catch (error) {
          console.error('OCR Error:', error);
          setOcrResult('Error performing OCR');
        }
      }
    }
  };

  return (
    <div className='p-4 flex flex-col items-center'>
      <h1 className='text-2xl font-bold mb-4'>Camera & OCR</h1>
      <div className='relative w-full max-w-md aspect-[3/4] bg-gray-200 mb-4'>
        <video
          ref={videoRef}
          className='absolute inset-0 w-full h-full object-cover'
        />
        <canvas
          ref={canvasRef}
          className='absolute inset-0 w-full h-full object-cover'
          width={720}
          height={960}
        />
      </div>
      <div className='flex gap-4 mb-4'>
        {!isStreaming ? (
          <button
            onClick={startCamera}
            className='bg-blue-500 text-white px-4 py-2 rounded-full flex items-center'
          >
            <Camera className='mr-2' />
            Start Camera
          </button>
        ) : (
          <>
            <button
              onClick={stopCamera}
              className='bg-red-500 text-white px-4 py-2 rounded-full'
            >
              Stop Camera
            </button>
            <button
              onClick={captureImage}
              className='bg-green-500 text-white px-4 py-2 rounded-full'
            >
              Capture & OCR
            </button>
          </>
        )}
      </div>
      <div className='w-full max-w-md'>
        <h2 className='text-xl font-semibold mb-2'>OCR Result:</h2>
        <p className='bg-gray-100 p-4 rounded-lg whitespace-pre-wrap'>
          {ocrResult || 'No text detected'}
        </p>
      </div>
    </div>
  );
}
