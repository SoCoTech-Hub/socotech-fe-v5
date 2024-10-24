import React from 'react';
import { baseUrl } from '@/context/constants';

const SplashScreen: React.FC = () => {
  return (
    <div
      id='splashScreen'
      className='flex items-center justify-center h-screen bg-appBg'
    >
      <img
        src={`${baseUrl}/animations/loading.gif`}
        className='w-11/12'
        alt='Loading'
      />
    </div>
  );
};

export default SplashScreen;
