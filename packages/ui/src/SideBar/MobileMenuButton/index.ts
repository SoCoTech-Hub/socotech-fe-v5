//USE MainMenu

import Link from 'next/link'
import { NotificationDot } from '@/components/NotificationDot'
import { Icon1 } from '@/context/constants'
import React from 'react'

interface MobileMenuButtonProps {
  icon: React.ReactNode
  color?: string
  title?: string
  link: string
  doWhat?: () => void
  textColor?: string
  hasNotification?: boolean
  isActive?: boolean
  animate?: boolean
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  icon,
  color = '',
  title = 'Item',
  link,
  doWhat,
  textColor = '',
  hasNotification = false,
  isActive = false,
  animate = false
}) => {
  const IsLocal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return link.startsWith('http') ? (
      <a onClick={doWhat} href={link}>
        {children}
      </a>
    ) : (
      <Link href={link} passHref>
        <a onClick={doWhat}>{children}</a>
      </Link>
    )
  }

  return (
    <div className="cursor-pointer">
      <IsLocal>
        <div className="flex items-center h-20 -mx-1 align-middle">
          <div className="flex flex-wrap w-24 px-0.5 my-2">
            <div className="flex w-full justify-content-center">
              {icon && (
                <div
                  className={`w-12 h-12 p-0.5 rounded-full ${
                    hasNotification ? '' : 'overflow-hidden'
                  } ${color}  ${
                    isActive
                      ? 'bg-themeColorMain text-white'
                      : 'bg-compBg text-themeColorSecondary'
                  }`}
                >
                  <div style={{ color: Icon1 }}>
                    {icon}
                    {hasNotification ? (
                      <div className="-mx-1 my-[0.6]">
                        <NotificationDot active={isActive} />
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
            <div className="flex w-full justify-content-center">
              <div
                className={`${
                  isActive ? 'font-bold' : ''
                } text-xs mt-1 text-center ${textColor} ${
                  animate ? 'animate-bounce' : ''
                }`}
              >
                {title}
              </div>
            </div>
          </div>
        </div>
      </IsLocal>
    </div>
  )
}

export default MobileMenuButton
