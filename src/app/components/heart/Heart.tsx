import React from 'react';

interface Heartprops {
  width: string;
  height: string;
}

export default function Heart({ height, width }: Heartprops) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.90776 6.51293L4.96216 9.31125L2.01656 6.51293C1.67402 6.18751 1.48158 5.74616 1.48158 5.28596C1.48158 4.82575 1.67402 4.38439 2.01656 4.05898C2.3591 3.73357 2.82368 3.55075 3.30811 3.55075C3.79253 3.55075 4.25712 3.73357 4.59966 4.05898L4.96216 4.40336L5.32466 4.05898C5.6672 3.73357 6.13178 3.55075 6.61621 3.55075C7.10063 3.55075 7.56522 3.73357 7.90776 4.05898C8.2503 4.3844 8.44274 4.82575 8.44274 5.28595C8.44274 5.74616 8.2503 6.18751 7.90776 6.51293Z"
        stroke="var(--beige)"
      />
    </svg>
  );
}
