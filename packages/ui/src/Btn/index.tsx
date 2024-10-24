import Link from 'next/link'
import React from 'react'

// Define the prop types
interface BtnProps {
  label?: string;
  link?: string | null;
  onClickFunction?: () => void;
  disable?: boolean;
  color?: string;
  textSize?: string;
  fontWeight?: string;
  trackingAction?: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
  btnWidth?: string;
}

const Btn: React.FC<BtnProps> = ({
  label = 'Save',
  link = null,
  onClickFunction,
  disable = false,
  color = 'current',
  textSize = 'text-xs',
  fontWeight = '',
  trackingAction = '',
  target = '_self',
  btnWidth = `w-full`
}) => {
  const font = `font-${fontWeight}`;

  if (disable) {
    return (
      <div className='px-1 cursor-pointer w-30'>
        <button
          data-tracking-action={trackingAction}
          disabled={disable}
          className={`${color} text-center text-white px-4 py-2 rounded-md ${btnWidth} ${textSize} ${font}`}
        >
          {label}
        </button>
      </div>
    );
  }

  if (!link) {
    return (
      <div className='px-1 cursor-pointer w-30'>
        <button
          data-tracking-action={trackingAction}
          className={`${color} text-center text-white px-4 py-2 rounded-md ${btnWidth} ${textSize} ${font}`}
          onClick={onClickFunction}
        >
          {label}
        </button>
      </div>
    );
  }

  return (
    <div
      className='px-1 w-30'
      data-tracking-action={trackingAction}
    >
      {link.startsWith('http') ? (
        <a
          href={link}
          target={target}
          rel='noreferrer'
          className={`${color} cursor-pointer text-center text-white px-4 py-2 rounded-md ${btnWidth} ${textSize} ${font}`}
        >
          {label}
        </a>
      ) : (
        <Link href={link} passHref>
          <div
            className={`${color} cursor-pointer text-center text-white px-4 py-2 rounded-md ${btnWidth} ${textSize} ${font}`}
          >
            {label}
          </div>
        </Link>
      )}
    </div>
  );
}

export default Btn;
