import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { FormInputs } from '../../components/form';

export const dataSlice = createSlice({
   name: 'dataReducer',
   initialState: [],
   reducers: {
      saveForm: (
         state: Array<FormInputs>,
         action: PayloadAction<FormInputs>
      ) => {
         state.push({ ...action.payload, id: uuid() });
      },
      editForm: (
         state: Array<FormInputs>,
         action: PayloadAction<FormInputs>
      ) => {
         const foundIndex = state.findIndex(
            (row) => row.id === action.payload.id
         );
         if (foundIndex >= 0) {
            state[foundIndex] = action.payload;
         }
      },
      bulkUpdate: (
         state: Array<FormInputs>,
         action: PayloadAction<FormInputs[]>
      ) => {
         state.push(...action.payload);
      },
      clearAll: (state: Array<FormInputs>) => {
         state.splice(0, state.length);
      },
   },
});

export const { saveForm, editForm, bulkUpdate, clearAll } = dataSlice.actions;

export default dataSlice.reducer;
