import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GymState {
  address: string;
  closeHours: string | null;
  description: string | null;
  email: string;
  id: string;
  image: string | null;
  name: string;
  openHours: string | null;
  owner: string;
  phone: string;
  slug: string;
}

const initialState: GymState = {
  address: '',
  closeHours: null,
  description: null,
  email: '',
  id: '',
  image: null,
  name: '',
  openHours: null,
  owner: '',
  phone: '',
  slug: ''
};

const gymSlice = createSlice({
  name: 'gym',
  initialState,
  reducers: {
    setGymInfo: (state, action: PayloadAction<GymState>) => {
      state.address = action.payload.address;
      state.closeHours = action.payload.closeHours;
      state.description = action.payload.description;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.image = action.payload.image;
      state.name = action.payload.name;
      state.openHours = action.payload.openHours;
      state.owner = action.payload.owner;
      state.phone = action.payload.phone;
      state.slug = action.payload.slug;
      sessionStorage.setItem('slug', action.payload.slug);
      sessionStorage.setItem('gymName', action.payload.name);
      sessionStorage.setItem('gymEmail', action.payload.email);
      sessionStorage.setItem('address', action.payload.address);
      sessionStorage.setItem('phone', action.payload.phone);
      sessionStorage.setItem('openHours', JSON.stringify(action.payload.openHours));
      sessionStorage.setItem('closeHours', JSON.stringify(action.payload.closeHours))
    },
    clearGymInfo: (state) => {
      state.address = '';
      state.closeHours = null;
      state.description = null;
      state.email = '';
      state.id = '';
      state.image = null;
      state.name = '';
      state.openHours = null;
      state.owner = '';
      state.phone = '';
      state.slug = '';
      sessionStorage.clear();
    
    }
  }
});

export const { setGymInfo, clearGymInfo } = gymSlice.actions;
export default gymSlice.reducer;
