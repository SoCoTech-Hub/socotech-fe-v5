import Btn from '@/components/Btn'
import logout from '@/snippets/logout'

const AuthNavbar: React.FC = () => (
  <nav className='absolute w-full py-2 shadow-md navbar navbar-light bg-light justify-content-between'>
    <div className='pl-10'>
      <img
        src='./logo.png'
        alt='Logo'
        className='desktop:h-14 laptop:h-14 mobile:h-10'
      />
    </div>
    <div className='flex flex-row mr-4'>
      {/* <Btn label="Help" color="bg-themeColorMain" /> */}
      <Btn
        label='Logout'
        color='bg-themeColorSecondary'
        textColor='text-white'
        onClickFunction={logout}
      />
    </div>
  </nav>
);

export default AuthNavbar;
