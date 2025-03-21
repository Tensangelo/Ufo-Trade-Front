import { useState } from "react";
// MAterial ui
import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
// Styles
import Style from '@/styles/forms/datePicker.module.scss';

interface CustomDatePickerProps {
    label?: string;
    value?: Dayjs | null;
    onChange?: (newValue: Dayjs | null) => void;
    format?: string;
    disabled?: boolean;
    minDate?: Dayjs;
    maxDate?: Dayjs;
}

export const DynamicDatePicker = ({
    label = "Selecciona una fecha",
    value,
    onChange,
    format = "DD/MM/YYYY",
    disabled = false,
    minDate,
    maxDate
}: CustomDatePickerProps) => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(value || dayjs());

    const handleChange = (newValue: Dayjs | null) => {
        setSelectedDate(newValue);
        if (onChange) onChange(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box component={'div'} className={Style.containerDatePicker}>
                <DatePicker
                    label={label}
                    value={selectedDate}
                    onChange={handleChange}
                    format={format}
                    disabled={disabled}
                    minDate={minDate}
                    maxDate={maxDate}
                    sx={{ width: "100%" }}
                    slotProps={{ textField: { fullWidth: true } }}
                    className={Style.datePicker}
                />
            </Box>
        </LocalizationProvider>
    );
};