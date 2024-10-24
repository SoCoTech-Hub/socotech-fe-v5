import { useState } from 'react'
import React from 'react'

// Define the prop types
interface CheckboxProps {
  label?: string;
  setter?: (checked: boolean) => void;
  value?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label = ' ',
  setter,
  value = false
}) => {
  const [checked, setChecked] = useState<boolean>(value);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    if (setter) {
      setter(isChecked);
    } else {
      console.log(label);
    }
  };

  return (
    <div className='flex flex-row items-center'>
      <input
        id={label.trim() ? label.replace(' ', '') : 'check'}
        className='mr-1'
        type='checkbox'
        onChange={onChange}
        value={checked ? 'true' : 'false'}
        checked={checked}
        style={{
          backgroundColor: checked ? 'rgb(14,134,212)' : 'white',
          borderColor: checked ? 'white' : '#181818'
        }}
      />
      <label
        className='form-check-label'
        htmlFor={label.trim() ? label.replace(' ', '') : 'check'}
      >
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
