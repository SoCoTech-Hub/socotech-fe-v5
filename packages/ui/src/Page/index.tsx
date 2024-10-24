import React from 'react';
import { baseUrl } from '@/context/constants';
import LogoOverlay from '@/components/LogoOverlay';
import Alert from '@/components/Alert';

interface PageProps {
  header: string;
  message: string;
  buttons?: React.ReactNode[]; // Optional array of React nodes
  background?: string; // Optional background image URL
  error?: boolean; // Optional boolean for error state
  success?: boolean; // Optional boolean for success state
}

export const Page: React.FC<PageProps> = ({
  header,
  message,
  buttons,
  background,
  error,
  success
}) => (
  <div className='flex items-center justify-center w-full h-screen'>
    <div
      className='flex items-center justify-center w-full h-full'
      style={{
        backgroundImage: `url(${background || `${baseUrl}/background1.png`})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    >
      <div className='flex flex-col bg-compBg rounded-3xl mobile:w-11/12 laptop:w-1/2 desktop:w-1/2 mobile:p-4 laptop:px-20 laptop:py-8 mobile:my-5 laptop:my-10 filter drop-shadow-2xl gap-y-4'>
        <div className='flex justify-center mt-4'>
          <LogoOverlay />
        </div>
        <div className='text-2xl font-bold text-center text-textColor'>
          {header}
        </div>
        <div className='w-full px-4 text-center text-themeColorSecondary'>
          {message}
        </div>
        <div className='desktop:px-20 laptop:px-20 mobile:px-2'>
          <Alert
            error={error}
            success={success}
          />
        </div>
        <div className='flex flex-wrap justify-center gap-4 mb-4'>
          {buttons?.map((button, index) => (
            <div key={index}>{button}</div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Page;
