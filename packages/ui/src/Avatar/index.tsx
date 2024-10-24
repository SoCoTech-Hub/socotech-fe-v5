import { AvatarIcon } from '@/components/SvgIcons'
import { PrimaryColor } from '@/context/constants'

interface AvatarProps {
  src?: string;
  userName?: string;
  message?: boolean;
  border?: boolean;
  borderColor?: string;
  borderSize?: string;
  size?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  userName,
  message = false,
  border = false,
  borderColor = PrimaryColor,
  borderSize = '0.125rem',
  size = '2rem'
}) => {

  const Image: React.FC = () => {
    return src ? (
      <img
        className={`rounded-full ${message ? '-mt-5' : ''}`}
        src={src}
        alt={`${userName ? `${userName}'s` : ''} Profile Picture`}
        style={{
          border: border ? `${borderSize} solid ${borderColor}` : 'none',
          borderRadius: '50%',
          width: `${message ? '3rem' : size}`,
          height: `${message ? '3rem' : size}`,
          maxWidth: size,
          maxHeight: size,
          objectFit: 'cover'
        }}
      />
    ) : (
      <AvatarIcon
        className={`rounded-full ${message ? '-mt-5' : ''}`}
        style={{
          border: border ? `${borderSize} solid ${borderColor}` : 'none',
          borderRadius: '50%',
          width: size,
          maxWidth: size,
          height: size,
          maxHeight: size
        }}
      />
    );
  };

  const UserName: React.FC = () => {
    return userName ? (
      <div className='flex flex-row items-center'>
        <Image />
        <span
          className={`mobile:text-xs font-medium ${
            message
              ? 'ml-2 text-textColor text-sm'
              : 'ml-3 text-textColor text-md'
          }`}
        >
          {userName}
        </span>
      </div>
    ) : (
      <Image />
    );
  };

  return <UserName />;
};

export default Avatar;
