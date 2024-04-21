import { Tooltip } from 'antd';
import React, { ChangeEventHandler } from 'react';

interface InputProps {
   name: string;
   label: string;
   placeholder?: string;
   type?: string;
   onChange: ChangeEventHandler<HTMLInputElement>;
   dataTip?: string | React.ReactElement;
   required?: boolean;
   errorMessage?: string;
   value: any;
}

const Input = ({
   name,
   label,
   placeholder,
   type = 'text',
   value,
   dataTip,
   onChange,
   required,
   errorMessage,
}: InputProps) => {
   return (
      <div className="mt-4 mb-4">
         <label
            htmlFor={name}
            className={`block text-gray-700 text-sm font-bold mb-2 ${
               required ? 'required' : ''
            }`}
         >
            {label}
         </label>
         <div>
            <Tooltip title={dataTip} overlayStyle={{ maxWidth: 350 }}>
               <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={name}
                  value={value}
                  name={name}
                  placeholder={placeholder}
                  type={type}
                  onChange={onChange}
               />
            </Tooltip>
         </div>
         {errorMessage && (
            <p className="text-red-500 text-xs italic">{errorMessage}</p>
         )}
      </div>
   );
};

export default Input;
