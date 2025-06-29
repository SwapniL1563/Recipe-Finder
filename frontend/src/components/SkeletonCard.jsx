import React from 'react'

const SkeletonCard = () => {
  return (
    <div className='flex flex-col gap-3'>
      <div className='skeleton h-32 md:h-60 w-full bg-gray-300 rounded'></div>
      <div className='skeleton h-2 md:h-4 w-3/4 bg-gray-300 rounded mx-auto'></div>
    </div>
  );
};

export default SkeletonCard;