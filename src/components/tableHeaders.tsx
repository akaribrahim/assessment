import { TableProps } from 'antd';
import { FormInputs } from './form';

export const dataGridColumns: TableProps<FormInputs>['columns'] = [
   {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
   },
   {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <div>{text}</div>,
   },
   {
      title: 'Assign Date',
      dataIndex: 'assignDate',
      key: 'assignDate',
   },
   {
      title: 'Is Updatable',
      dataIndex: 'isUpdatable',
      key: 'isUpdatable',
      render: (item) =>
         item ? (
            <div className="text-green-700 font-bold">Yes</div>
         ) : (
            <div className="text-red-700 font-bold">No</div>
         ),
   },
];
