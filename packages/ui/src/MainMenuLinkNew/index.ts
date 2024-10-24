import Link from 'next/link'
import styles from './MainMenuLink.module.css'
import React from 'react'

interface MainMenuLinkNewProps {
  icon: React.ReactNode
  activeIcon: React.ReactNode
  title: string
  link?: string | null
  badgeCount?: number
  dataTour?: string
  isActive: boolean
}

const MainMenuLinkNew: React.FC<MainMenuLinkNewProps> = ({
  icon,
  activeIcon,
  title,
  link = null,
  badgeCount,
  dataTour,
  isActive,
}) => {
  const IsLocal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return link?.startsWith('http') ? (
      <a href={link || undefined}>{children}</a>
    ) : (
      <Link href={link || ''} passHref>
        <a>{children}</a>
      </Link>
    )
  }

  return (
    <a id="text-decoration" href={link || undefined} className={styles.menuParentHover}>
      <div data-tour={dataTour}>
        <div
          className={`w-full cursor-pointer rounded-3xl ${
            isActive
              ? 'bg-themeColorMain text-white'
              : 'bg-compBg text-themeColorSecondary'
          }`}
          style={{
            marginTop: '0.2rem',
            marginBottom: '0.2rem',
          }}
        >
          <div className="flex flex-row items-center">
            <div
              className={`${
                title ? 'mr-3 laptop:mr-0' : ''
              } menu-icon-hover ${styles.menuIconHover}`}
              style={{
                height: '3rem',
                width: '3rem',
                maxHeight: '3rem',
                maxWidth: '3rem',
                aspectRatio: '1 / 1',
              }}
            >
              {isActive ? activeIcon : icon}
            </div>
            {title ? (
              <div
                className={`${isActive ? 'text-textColor' : 'text-textColor'}`}
                style={{
                  textDecorationThickness: '2px',
                }}
              >
                {title}
              </div>
            ) : null}
            {badgeCount ? (
              <div
                className={`flex items-center w-6 h-6 ml-auto rounded-full ${
                  isActive
                    ? 'bg-compBg text-textColorSecondary'
                    : 'bg-themeColorMain text-textColor'
                }`}
                style={{
                  height: '1.5rem',
                  width: '1.5rem',
                  justifyContent: 'center',
                  marginRight: '4px',
                }}
              >
                <div>{badgeCount}</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </a>
  )
}

export default MainMenuLinkNew
