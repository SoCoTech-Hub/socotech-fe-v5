import { useRouter } from 'next/router';
import React from 'react';

const AccessDenied: React.FC = () => {
  const router = useRouter();

  return (
    <div className='px-1 w-30'>
      <h1>Access Denied</h1>
      <a
        className='text-center text-textColor px-3 py-2 rounded-full'
        href='#'
        onClick={() => router.back()}
      >
        Return
      </a>
    </div>
  );
};

export default AccessDenied;
