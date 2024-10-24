import { useEffect, useState } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { PrimaryColor } from '@/context/constants'

const Index: React.FC = () => {
  const [showButton, setShowButton] = useState<boolean>(false)
  const scroller = typeof document !== 'undefined' ? document.getElementById('scrollplz') : null

  const toggleVisibility = () => {
    if (scroller?.scrollTop && scroller.scrollTop > 10) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }

  useEffect(() => {
    if (scroller) {
      scroller.addEventListener('scroll', toggleVisibility)
    }
    return () => {
      scroller?.removeEventListener('scroll', toggleVisibility)
    }
  }, [scroller])

  const scrollToTop = () => {
    scroller?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setShowButton(false)
  }

  return (
    <>
      {showButton && (
        <div
          onClick={scrollToTop}
          className='absolute flex justify-center p-3 align-middle rounded-full cursor-pointer text-textColor w-14 h-14 shadow-md'
          style={{
            bottom: 50,
            right: 300,
            background: PrimaryColor
          }}
        >
          <ArrowUpwardIcon fontSize='large' />
        </div>
      )}
    </>
  )
}

export default Index
