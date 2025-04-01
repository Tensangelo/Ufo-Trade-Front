import { ReactNode } from "react";
// Material ui
import { Box, FormControl, Input, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
// Style
import Style from '@/styles/forms/inputs.module.scss';

interface DynamicInputProps {
    type?: "text" | "email" | "number";
    label?: string;
    variant?: 'outlined' | 'standard';
    placeholder?: string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputType = ({
    type = "text",
    label = "Campo",
    variant = 'outlined',
    placeholder = "",
    startIcon,
    endIcon,
    required = false,
    readOnly = false,
    disabled = false,
    value = "",
    onChange,
}: DynamicInputProps) => {

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "30rem",
                minWidth: "8rem",
            }}
        >
            {variant === 'outlined' ? (
                <FormControl
                    variant={'outlined'}
                    required={required}
                    className={Style.inputFormOutlined}
                    fullWidth
                >
                    <InputLabel htmlFor={`dynamic-input-${label}`}>
                        {label}
                    </InputLabel>
                    <OutlinedInput
                        id={`dynamic-input-${label}`}
                        type={type}
                        placeholder={placeholder}
                        startAdornment={
                            startIcon &&
                                <InputAdornment position="start">
                                    {startIcon}
                                </InputAdornment>}
                        endAdornment={
                            endIcon &&
                                <InputAdornment position="end">
                                    {endIcon}
                                </InputAdornment>}
                        label={label}
                        required={required}
                        readOnly={readOnly}
                        disabled={disabled}
                        value={value}
                        onChange={onChange}
                        autoComplete="off"
                    />
                </FormControl>
            ) : (
                <FormControl
                    variant={'standard'}
                    required={required}
                    className={Style.inputFormStandard}
                    fullWidth
                >
                    <InputLabel htmlFor={`dynamic-input-${label}`}>
                        {label}
                    </InputLabel>
                    <Input
                        id={`dynamic-input-${label}`}
                        type={type}
                        placeholder={placeholder}
                        startAdornment={
                            startIcon &&
                                <InputAdornment position="start">
                                    {startIcon}
                                </InputAdornment>}
                        endAdornment={
                            endIcon &&
                                <InputAdornment position="end">
                                    {endIcon}
                                </InputAdornment>}
                        required={required}
                        readOnly={readOnly}
                        disabled={disabled}
                        value={value}
                        onChange={onChange}
                        autoComplete="off"
                    />
                </FormControl>
            )}
        </Box>
    );
};