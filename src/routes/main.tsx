import { Layout, Table } from 'antd';
import React, { useState } from 'react';
import RandExp from 'randexp';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import Form, { FormInputs } from '../components/form';
import {
   bulkUpdate,
   clearAll,
   editForm,
   saveForm,
} from '../store/reducers/dataSlice';
import { IRootState } from '../store';
import { dataGridColumns } from '../components/tableHeaders';
import classNames from 'classnames';
import Button from '../components/button';
import {
   DeleteOutlined,
   InfoCircleOutlined,
   PlusSquareOutlined,
} from '@ant-design/icons';
import { useWindowSize } from '../hooks/useWindowSize';

const { Header, Content } = Layout;

const Main = () => {
   const dispatch = useDispatch();
   const windowSize = useWindowSize();
   const data: FormInputs[] = useSelector((state: IRootState) => state.data);
   const [selectedRow, setSelectedRow] = useState<FormInputs | null>(null);

   const handleSubmitForm = (data: FormInputs): void => {
      const submitPayload = {
         ...data,
         assignDate: dayjs(data.assignDate).format('DD/MM/YYYY'),
      };
      if (submitPayload.id) {
         setSelectedRow(null);
         dispatch(editForm(submitPayload));
      } else dispatch(saveForm(submitPayload));
   };

   const generateRandomData = (): void => {
      const generated: FormInputs[] = Array.from({ length: 8 }, () => ({
         id: uuid(),
         code: new RandExp(/^[A-Za-z]{2}[0-9]{3}$/).gen(),
         name: new RandExp(/^[A-Za-z]{4}[0-9]{3}[a-z]{3}$/).gen(),
         assignDate: new RandExp(/^(0[1-9]|[12][0-9]|3[0])\/04\/2024$/).gen(),
         isUpdatable: Math.random() >= 0.25,
      }));
      dispatch(bulkUpdate(generated));
   };

   return (
      <Layout className="flex flex-col h-screen">
         <Header>
            <div className="text-white">Assessment</div>
         </Header>
         <Content className="flex-1 flex flex-col xl:flex-row ">
            <div className="h-full p-4 w-full md:w-3/5 xl:w-2/5">
               <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <Form
                     onSubmit={handleSubmitForm}
                     selectedForm={selectedRow}
                     setSelectedForm={setSelectedRow}
                  />
               </div>
            </div>
            <div className="h-full flex-1 xl:w-3/5 p-4">
               <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="flex justify-between items-center flex-wrap">
                     <div className="text-2xl mb-2">Data Grid</div>
                     <div>
                        <Button
                           key="generateData"
                           type="button"
                           label="Generate Random Data"
                           classNames="text-sky-600"
                           onClick={generateRandomData}
                           icon={<PlusSquareOutlined className="mr-2" />}
                        />
                        <Button
                           key="cleanAllData"
                           type="button"
                           label="Clear All"
                           classNames="text-red-600 ml-2"
                           onClick={() => {
                              dispatch(clearAll());
                           }}
                           icon={<DeleteOutlined className="mr-2" />}
                        />
                     </div>
                  </div>
                  <div className="mb-4">
                     <div className="text-blue-500">
                        <InfoCircleOutlined />
                        <span className="ml-2">
                           Saved data appears in this table.
                        </span>
                     </div>
                     <div className="text-blue-500">
                        <InfoCircleOutlined />
                        <span className="ml-2">
                           You can update a record by clicking on it.
                        </span>
                     </div>
                  </div>
                  <Table
                     scroll={{ y: windowSize.height - 400 }}
                     dataSource={data}
                     columns={dataGridColumns}
                     pagination={{
                        showTotal: (total) => `Total ${total} entry`,
                     }}
                     rowClassName={(row) => {
                        return classNames({
                           'cursor-pointer': row.isUpdatable,
                           'pointer-events-none bg-gray-300 text-slate-500':
                              !row.isUpdatable,
                           'bg-sky-100': selectedRow?.id === row.id,
                        });
                     }}
                     onRow={(row) => {
                        return {
                           onClick: () => {
                              setSelectedRow(row);
                           },
                        };
                     }}
                  />
               </div>
            </div>
         </Content>
      </Layout>
   );
};

export default Main;
