"use client";

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import Image from 'next/image'; // Import the Image component from Next.js

interface QRCodeGeneratorProps {
  sessionData: {
    date: string;
    startTime: string;
    endTime: string;
    venue: string;
    moduleCode: string;
    classContent: string;
  };
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ sessionData }) => {
  const [qrCodeDataURL, setQRCodeDataURL] = useState<string>('');
  const [accessCode, setAccessCode] = useState<string>('');

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const generatedAccessCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        setAccessCode(generatedAccessCode);
        const qrCodeUrl = `https://example.com/session?data=${encodeURIComponent(
          JSON.stringify(sessionData))}&accessCode=${generatedAccessCode}`;
        const dataURL = await QRCode.toDataURL(qrCodeUrl);
        setQRCodeDataURL(dataURL);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, [sessionData]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {qrCodeDataURL && (
        <>
          {/* Use the next/image component for automatic optimization */}
          <Image 
            src={qrCodeDataURL} 
            alt="QR Code" 
            width={256} 
            height={256} 
            className="w-64 h-64" 
          />
          <p className="text-2xl pb-3"><strong>QR Access Code:</strong> {accessCode}</p>
        </>
      )}
      <div className="text-center">
        <p className="mb-2"><strong>Module Code:</strong> {sessionData.moduleCode}</p>
        <p className="mb-2"><strong>Class Date:</strong> {sessionData.date}</p>
        <p className="mb-2"><strong>Start Time:</strong> {sessionData.startTime}</p>
        <p className="mb-2"><strong>End Time:</strong> {sessionData.endTime}</p>
        <p className="mb-2"><strong>Venue:</strong> {sessionData.venue}</p>
        <p className="mb-2"><strong>Content:</strong> {sessionData.classContent}</p>
      </div>
    </div>
  );
};

export default QRCodeGenerator;