import { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box } from "@mui/material";
// Styles
import Style from '@/styles/forms/select.module.scss';

interface DynamicSelectProps {
    label?: string;
    options: { value: string | number; label: string; disabled?: boolean }[];
    value?: string | number;
    onChange?: (value: string | number) => void;
    fullWidth?: boolean;
    disabled?: boolean;
}

export const DynamicSelect = ({
    label = "Seleccionar",
    options,
    value,
    onChange,
    fullWidth = true,
    disabled = false
}: DynamicSelectProps) => {
    const [selectedValue, setSelectedValue] = useState<string | number>(value || "");

    useEffect(() => {
        setSelectedValue(value || "");
    }, [value]);

    const handleChange = (event: SelectChangeEvent<string | number>) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
        if (onChange) onChange(newValue);
    };

    return (
        <Box component={'div'} className={Style.containerSelect}>
            <FormControl fullWidth={fullWidth} disabled={disabled}>
                <InputLabel id={`input-select-dynamic-${label}`} >{label}</InputLabel>
                <Select
                    id={`demo-simple-select-${label}`}
                    labelId={`input-select-dynamic-${label}`}
                    label={label}
                    value={selectedValue}
                    onChange={handleChange}
                    displayEmpty
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                        {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};