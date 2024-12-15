import React from 'react';

export interface SpinnerProps {
  size?: string;
}

export function Spinner(props: SpinnerProps) {
  const { size = '24px' } = props;
  const sizeInRem = parseInt(size) / 16 + 'rem'; 

  return (
    <div className="flex items-center justify-center flex-grow h-full">
      <div
        className="relative"
        style={{ width: sizeInRem, height: sizeInRem }}
      >
        <div
          className="absolute top-1/2 left-1/2 border-2 border-solid border-gray-300 border-b-sky-400 rounded-full animate-spin"
          style={{
            width: `calc(${sizeInRem} - 0.375rem)`,
            height: `calc(${sizeInRem} - 0.375rem)`,
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
      </div>
    </div>
  );
}