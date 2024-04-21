import { Tooltip } from 'antd';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   classNames: string;
   label: string;
   isDisabled?: boolean;
   dataTip?: string;
   icon?: any;
}
const Button = ({
   classNames,
   label,
   onClick,
   isDisabled,
   type,
   dataTip,
   icon,
}: ButtonProps) => {
   return (
      <Tooltip title={dataTip}>
         <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={`font-bold py-2 px-8 rounded cursor-pointer ${classNames} disabled:bg-slate-50 disabled:text-slate-300`}
         >
            {icon}
            <span>{label}</span>
         </button>
      </Tooltip>
   );
};

export default Button;
