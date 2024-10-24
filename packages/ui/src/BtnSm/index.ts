interface BtnSmProps {
  label?: string;
  onClickFunction: () => void;
  color?: string;
  textSize?: string;
  trackingAction?: string;
  textColor?: string;
  borderColor?: string;
  width?: string;
  id?: string;
}

const BtnSm: React.FC<BtnSmProps> = ({
  label = 'Save',
  onClickFunction,
  color = 'current',
  textSize = 'text-xs',
  trackingAction = '',
  textColor = 'text-black',
  borderColor = 'border-none',
  width = 'w-16',
  id
}) => {
  return (
    <button
      data-tracking-action={trackingAction}
      className={`${color} text-center border-2 ${textColor} ${borderColor} rounded-full ${textSize} ${width}`}
      onClick={onClickFunction}
      id={id}
    >
      {label}
    </button>
  )
}

export default BtnSm
//just use button