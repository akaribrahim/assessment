import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Input from './input';
import { Checkbox, DatePicker, Tooltip } from 'antd';
import dayjs from 'dayjs';
import Button from './button';
import {
   ClearOutlined,
   InfoCircleOutlined,
   SaveOutlined,
} from '@ant-design/icons';

export type FormInputs = {
   id?: string;
   code: string;
   name: string;
   assignDate: string;
   isUpdatable: boolean;
};
interface FormProps {
   onSubmit: SubmitHandler<FormInputs>;
   selectedForm: FormInputs | null;
   setSelectedForm: Function;
}
const Form = ({ onSubmit, selectedForm, setSelectedForm }: FormProps) => {
   const {
      handleSubmit,
      control,
      reset,
      formState: { errors, isSubmitSuccessful },
   } = useForm<FormInputs>({
      defaultValues: { code: '', name: '', assignDate: '', isUpdatable: true },
   });
   useEffect(() => {
      // form submit edildiğinde sıfırlanır.
      if (isSubmitSuccessful) {
         reset();
      }
   }, [isSubmitSuccessful, reset]);
   useEffect(() => {
      if (selectedForm) {
         // tabledan bir entry seçildiğinde form seçilen bilgilerle doldurulur.
         // keepDefaultValues parametresi ile default değerlerin değişmesi engellenir.
         reset(selectedForm, { keepDefaultValues: true });
      }
   }, [selectedForm, reset]);

   return (
      <div>
         <div className="text-2xl">
            {selectedForm ? 'Edit Entry' : 'Create Entry'}
         </div>
         <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
               name="code"
               control={control}
               rules={{
                  required: 'This is required.',
                  pattern: {
                     value: /^[A-Za-z]{2}[0-9]{3}$/,
                     message:
                        'The first 2 characters must be letters and the last 3 characters must be numbers.',
                  },
                  maxLength: {
                     value: 5,
                     message: 'Maximum length must be 5 characters.',
                  },
               }}
               render={({ field }) => {
                  return (
                     <Input
                        name="code"
                        label="Code"
                        dataTip={
                           <div>
                              <div>
                                 <InfoCircleOutlined />
                                 <span className="ml-2">
                                    Maximum length must be 5 characters.
                                 </span>
                              </div>
                              <div>
                                 <InfoCircleOutlined />
                                 <span className="ml-2">
                                    The first 2 characters must be letters and
                                    the last 3 characters must be numbers.
                                 </span>
                              </div>
                           </div>
                        }
                        placeholder="Write your code"
                        value={field.value}
                        required
                        errorMessage={errors.code?.message}
                        onChange={field.onChange}
                     />
                  );
               }}
            />
            <Controller
               name="name"
               control={control}
               rules={{
                  required: 'This is required.',
                  maxLength: {
                     value: 12,
                     message: 'Maximum length must be 12 characters.',
                  },
               }}
               render={({ field }) => {
                  return (
                     <Input
                        name="name"
                        label="Name"
                        dataTip={
                           <div>
                              <InfoCircleOutlined />
                              <span className="ml-2">
                                 Maximum length must be 12 characters.
                              </span>
                           </div>
                        }
                        placeholder="Write your code"
                        value={field.value}
                        required
                        errorMessage={errors.name?.message}
                        onChange={field.onChange}
                     />
                  );
               }}
            />

            <Controller
               name="assignDate"
               control={control}
               rules={{ required: 'This is required.' }}
               render={({ field }) => {
                  const v =
                     field.value && typeof field.value === 'string'
                        ? dayjs(field.value, 'DD/MM/YYYY')
                        : field.value;
                  return (
                     <div className="mt-4 mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 required">
                           Assign Date
                        </label>
                        <Tooltip
                           overlayStyle={{ maxWidth: 350 }}
                           placement="right"
                           title={
                              <div>
                                 <InfoCircleOutlined />
                                 <span className="ml-2">
                                    Enter the date format as DD/MM/YYYY.
                                 </span>
                              </div>
                           }
                        >
                           <DatePicker
                              value={v}
                              format="DD/MM/YYYY"
                              onChange={(d): void => {
                                 field.onChange(d);
                              }}
                           />
                        </Tooltip>
                        {errors.assignDate?.message && (
                           <p className="text-red-500 text-xs italic">
                              {errors.assignDate?.message}
                           </p>
                        )}
                     </div>
                  );
               }}
            />
            <Controller
               name="isUpdatable"
               control={control}
               render={({ field }) => {
                  return (
                     <Checkbox checked={field.value} onChange={field.onChange}>
                        <label className="text-gray-700 text-sm font-bold">
                           Is Updatable?
                        </label>
                     </Checkbox>
                  );
               }}
            />
            <div className="flex justify-end mt-4">
               <Button
                  key="cleanForm"
                  type="button"
                  label="Clean"
                  classNames="bg-rose-500 hover:bg-rose-700 text-white"
                  onClick={() => {
                     reset();
                     setSelectedForm(null);
                  }}
                  icon={<ClearOutlined className="mr-2" />}
               />
               <Button
                  key="submitForm"
                  type="submit"
                  label={selectedForm ? 'Update' : 'Save'}
                  classNames="bg-blue-800 hover:bg-blue-700 text-white ml-4"
                  dataTip={
                     selectedForm
                        ? 'This will update the entry.'
                        : 'This will create a new entry.'
                  }
                  icon={<SaveOutlined className="mr-2" />}
               />
            </div>
         </form>
      </div>
   );
};

export default Form;
