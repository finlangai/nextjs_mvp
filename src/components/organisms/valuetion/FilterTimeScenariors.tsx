import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs from "dayjs";
import 'dayjs/locale/vi';

export default function FilterTimeScenariors({ 
  onDateChange, 
  theme 
}: { 
  onDateChange: any, 
  theme?: any 
}) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  // Tạo theme mặc định nếu không truyền
  const defaultTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#25B770',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setSelectedDate(newValue);
    onDateChange(newValue);
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme || defaultTheme}>
      <div className="relative py-[12px] px-[30px] border-b border-fintown-br flex items-center justify-between">
        <div className='text-fintown-txt-1 text-[14px]'>Lọc theo</div>
        <div
          ref={(el) => setAnchorEl(el)}
          onClick={() => setOpen(true)}
          className="flex items-center w-full max-w-[117px] px-[12px] py-[7px] rounded border border-fintown-br justify-between cursor-pointer"
        >
          <i className='bx bx-calendar-event text-[18px] text-fintown-txt-2'></i>
          <div className="text-fintown-txt-2 text-[12px]">
            {selectedDate ? selectedDate.format('MM/YYYY') : '07/2024'}
          </div>
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            value={selectedDate}
            onChange={handleDateChange}
            disableFuture
            maxDate={dayjs()}
            minDate={dayjs('2000-01-01')} // Giới hạn năm bắt đầu từ 2000
            views={['month', 'year']}
            format="MM/YYYY"
            slots={{
              openPickerButton: () => null,
            }}
            slotProps={{
              actionBar: {
                actions: ['today'],
              },
              popper: {
                anchorEl: anchorEl,
                placement: 'bottom-end',
              },
              textField: {
                style: { display: 'none' },
              }
            }}
            sx={{
              display: 'none',
            }}
          />
        </LocalizationProvider>
      </div>
    </ThemeProvider>
  );
}