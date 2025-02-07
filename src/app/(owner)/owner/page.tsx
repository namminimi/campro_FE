import React from 'react';
import OwnerTitle from '../_components/OwnerTitle';
import OwnerButton from '../_components/OwnerButton';
import OWNER_LINK_BUTTONS from '../_constants/ownerLinkButtons';

function LandingPage() {
  return (
    <div className='flex flex-col items-center gap-110pxr'>
      <OwnerTitle>
        안녕하세요 사장님 객실을 등록하시거나 수정 해주세요 !
      </OwnerTitle>
      <div className='grid grid-cols-2 justify-center gap-30pxr'>
        {OWNER_LINK_BUTTONS.map((button, index) => (
          <OwnerButton.Link key={index} icon={button.icon} href={button.href}>
            {button.name}
          </OwnerButton.Link>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
