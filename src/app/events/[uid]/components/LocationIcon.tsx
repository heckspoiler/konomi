import React from 'react';

import Image from 'next/image';

import locationIcon from '@public/svg/location.svg';

export default function LocationIcon() {
  return (
    <div>
      <Image src={locationIcon} alt="Location Icon" />
    </div>
  );
}
