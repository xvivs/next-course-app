'use client';

import React, { useState } from 'react';
import { CldUploadWidget, CldImage, CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from 'next-cloudinary';

const UploadPage = () => {
  const [publicId, setPublicId] = useState<string>(''); 

  const handleUploadingEvent = (results: CloudinaryUploadWidgetResults, widget: any) => {
    if(results.event !== 'upload-added') return;
    const resultInfo = results.info as CloudinaryUploadWidgetInfo;
     
    setPublicId(resultInfo.id);
  };

  return (
    <>
      {publicId && 
        <CldImage src={publicId} width={270} height={180} alt='coffe-image'/>}
      <CldUploadWidget 
        uploadPreset='test-preset'
        onUploadAdded={handleUploadingEvent}
      >
        {({ open }) => 
          <button 
            className='btn btn-primary'
            onClick={() => open()}
          >
            Upload
          </button>}
      </CldUploadWidget>

    </>
  )
}

export default UploadPage;