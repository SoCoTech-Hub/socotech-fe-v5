//USE MainMenu
interface MainMenuButtonProps {
  icon: React.ReactNode
  color?: string
  title?: string
  description?: string
  doWhat: () => void
  badgeCount?: number
  textColor?: string
  mobile?: boolean
}

const MainMenuButton: React.FC<MainMenuButtonProps> = ({
  icon,
  color = '',
  title = 'Item',
  description,
  doWhat,
  badgeCount,
  textColor,
  mobile,
}) => {
  return (
    <div
      className="w-full rounded-lg cursor-pointer mobile:bg-compBg mobile:px-3 hover:shadow-md"
      onClick={doWhat}
    >
      <div className="flex items-center justify-between w-full align-middle mobile:pb-2">
        {mobile ? (
          <div className="flex flex-wrap items-center px-3">
            <div className={`mobile:w-12 p-2 rounded-lg ${color}`}>
              <div className="mx-auto my-auto text-themeColorMain">{icon}</div>
            </div>
            <div>
              <div className={`text-textColor ${textColor}`}>{title}</div>
            </div>
          </div>
        ) : (
          <div className="flex align-middle align-items-center mobile:gap-2">
            <div
              className={`desktop:w-12 desktop:h-12 laptop:h-10 laptop:w-10 mobile:w-10 mobile:h-12 p-2 rounded-lg ${color}`}
            >
              <div className="mx-auto my-auto text-themeColorMain">{icon}</div>
            </div>
            <div className="ml-2 item">
              <div className={`text-textColor ${textColor}`}>{title}</div>
              {description && (
                <div className={`paragraph text-textColor ${textColor}`}>
                  {description}
                </div>
              )}
            </div>
          </div>
        )}

        {badgeCount ? (
          <div className="flex items-center justify-center w-8 h-8 font-bold text-black align-middle rounded-lg bg-themeColorMain">
            {badgeCount}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default MainMenuButton
