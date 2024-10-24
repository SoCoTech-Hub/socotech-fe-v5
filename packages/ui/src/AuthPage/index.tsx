import AuthNavbar from '@/components/AuthNavbar'
import React, { ReactNode } from 'react'

// Define the prop types
interface AuthPageProps {
  bgImage?: string;
  bgColor?: string;
  bgSize?: string;
  leftTitle?: ReactNode;
  content?: ReactNode;
  contentBgColor?: string;
  hasNavbar?: boolean;
  customNavbar?: ReactNode;
}

const AuthPage: React.FC<AuthPageProps> = ({
  bgImage,
  bgColor,
  bgSize,
  leftTitle,
  content,
  contentBgColor,
  hasNavbar = true, // You can set default values for props like this
  customNavbar,
}) => {
  return (
    <>
      {hasNavbar ? (
        customNavbar ? (
          customNavbar
        ) : (
          <div
            className='fixed w-full'
            style={{
              zIndex: '999'
            }}
          >
            <AuthNavbar />
          </div>
        )
      ) : null}
      <div
        className='flex desktop:flex-row laptop:flex-row mobile:flex-col w-full h-screen'
        style={{ zIndex: '1' }}
      >
        <div
          style={{
            backgroundImage: bgImage ? `url(${bgImage})` : 'none',
            backgroundRepeat: 'no-repeat',
            backgroundColor: bgColor || 'inherit',
            backgroundPosition: 'center',
            backgroundSize: bgSize || 'cover',
            height: '110vh',
            userSelect: 'none',
            msUserSelect: 'none',
            MozUserSelect: 'none',
            WebkitUserSelect: 'none'
          }}
          className='w-1/2 h-auto mobile:hidden flex justify-center items-center'
        >
          {leftTitle || null}
        </div>
        <div
          className='w-1/2 h-auto mobile:w-full flex justify-center items-start overflow-y-scroll'
          style={{
            backgroundColor: contentBgColor || 'inherit'
          }}
        >
          {content || null}
        </div>
      </div>
    </>
  );
}

export default AuthPage;
