import React from 'react';

import Image from 'next/image';

import dateIcon from '@public/svg/calendar.svg';

export default function CalendarIcon() {
  return (
    <div>
      <Image src={dateIcon} alt="calendar icon" />
    </div>
  );
}
