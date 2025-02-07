'use client';

import React from 'react';
import OwnerTitle from '../../../_components/OwnerTitle';
import OwnerImageUploader from '../../../_components/OwnerImageUploader';
import { ONE_IMAGE } from '../../../_constants/common';

function UploadSiteImage() {
  return (
    <div className='flex flex-col items-center gap-110pxr'>
      <OwnerTitle>캠핑장 배치도 사진을 업로드 해주세요 !</OwnerTitle>
      <div className='flex flex-col items-center gap-70pxr'>
        <OwnerImageUploader maxImages={ONE_IMAGE} />
      </div>
    </div>
  );
}

export default UploadSiteImage;
