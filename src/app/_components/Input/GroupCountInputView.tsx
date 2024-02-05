'use client';

import { IconPeople } from '@/public/svgs';
import { useEffect, useState } from 'react';
import { Button, ModalForMobile, GroupDropdown } from '..';
import useMediaQueries from '@/hooks/useMediaQueries';
interface Field {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  value: { adult: number; child: number; pet: number };
  disabled?: boolean;
  name: string;
  ref: React.Ref<any>;
}

interface Props {
  field: Field;
}

interface Group {
  adult: number;
  child: number;
  pet: number;
}

function GroupCountInputView({ field: { onBlur, ...field } }: Props) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [group, setGroup] = useState(field.value);
  const [tempGroup, setTempGroup] = useState(group);
  const mobileMediaQuery = useMediaQueries({ breakpoint: 767 })?.mediaQuery
    .matches;
  const isMobile = typeof window !== 'undefined' ? mobileMediaQuery : false;

  const handleRenderDropdown = () => {
    setIsDropdownVisible(true);
  };

  const handleCloseDropdown = () => setIsDropdownVisible(false);

  const handleApplyDropdown = () => {
    setIsDropdownVisible(false);
    if (isMobile) {
      setGroup(tempGroup);
    }
  };

  const handleGroupChange = (updatedGroup: Group) => {
    if (isMobile) {
      setTempGroup(updatedGroup);
    } else {
      setGroup(updatedGroup);
    }
  };

  useEffect(() => {
    const event = {
      target: { name: field.name, value: JSON.stringify(group) },
    } as React.ChangeEvent<HTMLInputElement>;
    field.onChange(event);
  }, [group, field]);

  useEffect(() => {
    if (!isMobile) {
      setTempGroup(group);
    }
  }, [isMobile, group]);

  return (
    <div className='relative flex w-full flex-123'>
      <div className='flex w-full gap-4pxr'>
        <IconPeople className='absolute left-16pxr top-16pxr ' />
        <input
          {...field}
          onClick={handleRenderDropdown}
          onBlur={onBlur}
          value={`성인 ${group?.adult}명, 아동 ${group?.child}명, 펫 ${group?.pet}마리`}
          name='groupCount'
          placeholder='참여 그룹을 설정해주세요'
          className=' w-full cursor-pointer whitespace-nowrap rounded-[8px] bg-gray100 py-16pxr pl-44pxr pr-16pxr text-black placeholder-gray500 outline-none font-body2-semibold placeholder:font-body2'
          readOnly
        />
      </div>
      {isDropdownVisible && (
        <ModalForMobile
          headerContent='인원'
          footerContent={
            <Button.Round
              type='button'
              size='md'
              onClick={handleApplyDropdown}
              custom='bg-primary100 relative z-99 text-white max-w-[335px] flex w-full'
            >
              적용
            </Button.Round>
          }
          onClose={handleCloseDropdown}
        >
          <GroupDropdown
            group={isMobile ? tempGroup : group}
            onChangeGroup={handleGroupChange}
            onClose={handleCloseDropdown}
            isMobile={isMobile}
          />
        </ModalForMobile>
      )}
    </div>
  );
}

export default GroupCountInputView;
