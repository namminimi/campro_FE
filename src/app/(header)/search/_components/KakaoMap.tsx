'use client';

import { IconMapMinus, IconMapPlus } from '@/public/svgs';
import { useEffect, useRef } from 'react';
import { MapSizeType } from '../page';
import { CampZoneForSearch } from '../page';

interface Props {
  map: kakao.maps.Map | null;
  setMap: (map: kakao.maps.Map) => void;
  mapSize?: MapSizeType;
  isZoomButtonShadow?: boolean;
  campPlaceData?: CampZoneForSearch[];
  region?: string;
}

function KakaoMap({
  map,
  setMap,
  mapSize,
  isZoomButtonShadow = false,
  campPlaceData,
  region,
}: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const isRegion = region === '전체';

  const handleClickZoomIn = () => {
    if (map) {
      const level = map.getLevel();
      map.setLevel(level - 1);
    }
  };

  const handleClickZoomOut = () => {
    if (map) {
      const level = map.getLevel();
      map.setLevel(level + 1);
    }
  };

  const dropShadow = isZoomButtonShadow
    ? 'drop-shadow-[0px_10px_10px_rgba(0,0,0,0.25)]'
    : '';

  useEffect(() => {
    /* if (typeof window === 'undefined' || !window.kakao) return; */
    kakao.maps.load(() => {
      if (!mapRef.current) return;

      const options = {
        center: new kakao.maps.LatLng(36.7140176374004, 128.10524294165157),
        level: 13,
      };
      const map = new kakao.maps.Map(mapRef.current, options);
      setMap(map);
      return;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map) return;
    map.relayout();

    if (!campPlaceData) return;

    if (campPlaceData.length !== 0) {
      const campPlaceDataLength = campPlaceData.length;
      let sumLng = 0;
      let sumLat = 0;

      campPlaceData.forEach((place) => {
        const { lng, lat } = place;

        sumLng += Number(lng);
        sumLat += Number(lat);
      });

      const averageLng = sumLng / campPlaceDataLength;
      const averageLat = sumLat / campPlaceDataLength;

      map.setCenter(
        isRegion
          ? new kakao.maps.LatLng(36.7140176374004, 128.10524294165157)
          : new kakao.maps.LatLng(averageLng, averageLat),
      );
      map.setLevel(mapSize == 'half' && region !== '전체' ? 11 : 12);

      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegion, campPlaceData, mapSize, map]);

  return (
    <div ref={mapRef} className='h-full w-full'>
      {map && (
        <div className='absolute right-26pxr top-16pxr flex flex-col'>
          <button
            className={`flex-center z-50 rounded-tl-xl rounded-tr-xl border-l border-r border-t border-gray-300 bg-white px-16pxr py-12pxr ${dropShadow}`}
            onClick={handleClickZoomIn}
          >
            <IconMapPlus />
          </button>
          <button
            className={`flex-center z-50 rounded-bl-xl rounded-br-xl border border-gray-300 bg-white px-16pxr py-12pxr ${dropShadow}`}
            onClick={handleClickZoomOut}
          >
            <IconMapMinus />
          </button>
        </div>
      )}
    </div>
  );
}

export default KakaoMap;
