import Btn from '@/components/Btn'
import logout from '@/snippets/logout'

const AuthNavbar = () => (
  <nav className='absolute w-full py-2 shadow-md navbar bg-black justify-content-between'>
    <div className='pl-10'>
      <img
        src='.\logo.png'
        alt=''
        className='desktop:h-14 laptop:h-14 mobile:h-6'
      />
    </div>
    <div className='flex flex-row mr-4'>
      {/* //TODO: @Mario - Where does this go? */}
      {/* <Btn label="Help" color="bg-themeColorMain" /> */}
      <Btn
        label='Logout'
        color='bg-themeColorMain text-black'
        onClickFunction={logout}
      />
    </div>
  </nav>
)

export default AuthNavbar
