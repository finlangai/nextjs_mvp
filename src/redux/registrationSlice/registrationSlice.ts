import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegistrationState {
    email: string;
    phone: string;
    password: string;
    fullname: string;
}

const initialState: RegistrationState = {
    email: '',
    phone: '',
    password: '',
    fullname: '',
};

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setDisplayName: (state, action: PayloadAction<string>) => {
            state.fullname = action.payload;
        },
        clearRegistrationData: (state) => {
            state.email = '';
            state.phone = '';
            state.password = '';
            state.fullname = '';
        },
    },
});

export const { setEmail, setPhone, setPassword, setDisplayName, clearRegistrationData } = registrationSlice.actions;

export default registrationSlice.reducer;
