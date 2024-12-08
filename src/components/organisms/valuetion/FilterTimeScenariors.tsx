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
    onDateChange: (month: string, year: string) => void,
    theme?: any
}) {
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

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
        const parsedDate = newValue ? dayjs(newValue) : null;
        setSelectedDate(parsedDate);
        if (newValue) {
            const month = newValue.format('MM'); 
            const year = newValue.format('YYYY');
            onDateChange(month, year); 
        } else {
            onDateChange('', '');
        }
      setOpen(false); 
    };

    return (
        <ThemeProvider theme={theme || defaultTheme}>
            <div className="relative py-[12px] px-[30px] border-b border-fintown-br dark:border-fintown-br-light flex items-center justify-between">
                <div className='text-fintown-txt-1 dark:text-fintown-txt-1-light text-[14px]'>Lọc theo thời gian</div>
                <div
                    ref={(el) => setAnchorEl(el)}
                    onClick={() => setOpen(true)}
                    className="
                    flex items-center w-full max-w-[100px] px-[12px] py-[7px] rounded border border-fintown-br dark:border-fintown-br-light justify-between cursor-pointer text-fintown-txt-2
                    hover:border-fintown-pr9 hover:text-fintown-txt-1 hover:dark:text-fintown-txt-1-light"
                >
                    <i className='bx bx-calendar-event text-[18px] '></i>
                    <div className=" text-[12px]">
                        {selectedDate ? selectedDate.format('MM/YYYY') : dayjs().format('MM/YYYY')}
                    </div>
                </div>

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
                    <DatePicker
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        value={selectedDate}
                        onChange={handleDateChange}
                        disableFuture
                        maxDate={dayjs()}
                        minDate={dayjs('2000-01-01')}
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