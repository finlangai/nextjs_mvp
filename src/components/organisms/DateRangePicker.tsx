import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'dayjs/locale/vi';
import { selectDarkMode } from '@/src/redux/darkmode';
import { useAppSelector } from '@/src/redux/hooks/useAppStore';

export default function BasicDatePicker({ onDateChange } : {onDateChange:any}) {
  const isDarkMode = useAppSelector(selectDarkMode);

  dayjs.locale('vi');

  const theme = createTheme({
    palette: {
      mode: `${!isDarkMode ? 'dark' : 'light'}`,
      primary: {
        main: '#25B770',
      },
      secondary: {
        main: '#dc004e',
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: '4px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#2B3139',
                borderRadius: '12px',
              },
              borderRadius: '4px',
              padding: '0px 12px',
              fontSize: '14px',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            // color: 'white',
            borderRadius: '4px',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label="Chọn ngày"
            disableFuture
            maxDate={dayjs()}
            slotProps={{
              actionBar: {
                actions: ['today'],
              },
            }}
            format="DD/MM/YYYY"
            onChange={(newValue) => {
              onDateChange(newValue);
            }}
            sx={{
              maxWidth: '60px',
              padding: '0px',
              color: 'white',
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
