'use client';

import { IconNavigationDown, IconNavigationUp } from '@/public/svgs';
import FACILITIES from '@/src/app/_constants/facilities';
import { ReactElement, useState } from 'react';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SectionTitle from './SectionTitle';

interface CampSiteFacilitiesProps {
  facilities: string;
}
interface FacilityItem {
  text: string;
  icon: ReactElement;
  order: number;
}

function CampSiteFacilities({ facilities }: CampSiteFacilitiesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const facilitiesArray = facilities.split(',');
  const getIconsAndTextsByOrder = (
    facilitiesArray: string[],
  ): FacilityItem[] => {
    return facilitiesArray
      .map((text): FacilityItem | null =>
        FACILITIES[text.trim() as keyof typeof FACILITIES]
          ? { text, ...FACILITIES[text.trim() as keyof typeof FACILITIES] }
          : null,
      )
      .filter((item): item is FacilityItem => item !== null)
      .sort((a, b) => a.order - b.order);
  };

  return (
    <section className='flex scroll-mt-168pxr flex-col gap-16pxr'>
      <SectionTitle>시설/환경</SectionTitle>
      <div className='relative flex h-134pxr w-full max-w-1440pxr flex-col gap-16pxr mobile:h-auto mobile:gap-16pxr tablet:gap-13pxr'>
        <div className='absolute -left-10pxr bottom-0pxr flex w-full justify-normal bg-inherit shadow-none mobile:static mobile:flex-col mobile:justify-center mobile:gap-20pxr mobile:rounded-xl mobile:bg-white mobile:pb-24pxr mobile:shadow-categoryItem tablet:justify-normal'>
          <ul className='flex w-full flex-1 gap-16pxr p-0pxr mobile:grid mobile:grid-cols-4 mobile:gap-12pxr mobile:gap-y-20pxr mobile:px-16pxr mobile:py-24pxr mobile:pb-0pxr'>
            <Swiper
              modules={[FreeMode]}
              freeMode={true}
              enabled={false}
              slidesOffsetBefore={10}
              className='!box-border max-w-full !p-10pxr'
              breakpoints={{
                768: { enabled: true, slidesPerView: 'auto', spaceBetween: 0 },
              }}
              id='category-swiper'
            >
              {getIconsAndTextsByOrder(facilitiesArray).map((facility, i) => (
                <SwiperSlide
                  key={facility.text}
                  id='category-slide'
                  className={`shadow-test !w-126pxr rounded-xl mobile:!flex mobile:!h-68pxr mobile:!w-auto mobile:justify-center mobile:shadow-none tablet:!w-114pxr ${i > 7 && !isOpen ? 'mobile:!hidden' : 'mobile:!flex'}`}
                >
                  <li className='h-full w-auto  mobile:w-48pxr'>
                    <div className='flex-center h-134pxr w-126pxr flex-col gap-16pxr rounded-xl bg-white mobile:h-68pxr mobile:w-48pxr mobile:shadow-none tablet:w-114pxr'>
                      <div className='h-28pxr w-28pxr mobile:h-24pxr mobile:w-24pxr'>
                        {facility.icon}
                      </div>
                      <div className='text-nowrap text-gray800 font-body2-semibold mobile:font-caption1-medium'>
                        {facility.text}
                      </div>
                    </div>
                  </li>
                </SwiperSlide>
              ))}
            </Swiper>
          </ul>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={`${facilitiesArray.length > 8 && 'mobile:flex-center gap-3pxr'} hidden `}
          >
            {isOpen ? '접기' : '전체'}
            {isOpen ? <IconNavigationUp /> : <IconNavigationDown />}
          </button>
        </div>
      </div>
    </section>
  );
}

export default CampSiteFacilities;
