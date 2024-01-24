import Link from 'next/link';
import { IconComming, IconPeople } from '../../../../public/svgs';

function Header() {
  return (
    <nav className='flex h-52pxr items-center justify-between gap-10pxr px-40pxr py-18pxr tablet:h-80pxr tablet:gap-24pxr'>
      <div className='flex items-center gap-15pxr'>
        <div className='flex-center w-62pxr bg-primary100 px-10pxr py-8pxr text-gray50 font-title2-semibold'>
          로고
        </div>
        <h1 className=' hidden h-full text-gray900 font-title3-semibold tablet:block'>
          CamPro
        </h1>
      </div>
      {/* <h3 className='text-gray900 font-title3-bold mobile:font-body2'>
        캠핑 유형 테스트
      </h3> */}
      <ul className='font-caption1-semibold align-center font-caption1-semibold flex items-center justify-between gap-16pxr tablet:gap-48pxr tablet:tablet:font-title3-bold'>
        <li className='leading-0 shrink-0 text-primary100'>
          <Link href='#none'>캠퍼 테스트</Link>
        </li>
        <li>
          <Link href='#none'>
            <IconComming className='block tablet:hidden' />
            <span className='hidden tablet:block'>오픈 일정</span>
          </Link>
        </li>
        <li className='ml-0 text-gray500 tablet:ml-32pxr'>
          <Link href='#none'>
            <IconPeople className='block tablet:hidden' />
            <span className='hidden tablet:block'>로그인/회원가입</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
