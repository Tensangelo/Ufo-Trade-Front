import { ReactNode, useState } from "react";
// Material ui
import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
// Icons
import { Visibility, VisibilityOff } from "@mui/icons-material";
// Style
import Style from '@/styles/forms/inputs.module.scss';

interface PasswordTypeProps {
    label?: string;
    required?: boolean;
    disabled?: boolean;
    startIcon?: ReactNode;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordType = ({
    label = 'Contraseña',
    required = false,
    disabled = false,
    startIcon,
    value = "",
    onChange
}: PasswordTypeProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "30rem",
                minWidth: "10rem",
            }}
        >
            <FormControl
                variant="outlined"
                required={required}
                sx={{ width: '100%' }}
                className={Style.inputFormOutlined}
            >
                <InputLabel htmlFor={`outlined-adornment-password-${label}`}>
                    {label}
                </InputLabel>
                <OutlinedInput
                    id={`outlined-adornment-password-${label}`}
                    type={showPassword ? 'text' : 'password'}
                    startAdornment={
                        startIcon &&
                            <InputAdornment position="start">
                                {startIcon}
                            </InputAdornment>}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={
                                    showPassword ? 'ocultar contraseña' : 'mostrar contraseña'
                                }
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label={label}
                    required={required}
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                />
            </FormControl>
        </Box>
    )
}