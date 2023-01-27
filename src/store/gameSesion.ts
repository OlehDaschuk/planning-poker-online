import { createSlice } from '@reduxjs/toolkit';

interface SessionState {
  id?: string;
}

const initialState: SessionState | null = null;

const gemeSesionSlice = createSlice({
  name: 'gemeSesion',
  initialState,
  reducers: {
    onSesionCreation: (state: SessionState | null, action) => {
      state = action.payload.initSesionState;
    },
  },
});

export const { onSesionCreation } = gemeSesionSlice.actions;

export default gemeSesionSlice.reducer;
