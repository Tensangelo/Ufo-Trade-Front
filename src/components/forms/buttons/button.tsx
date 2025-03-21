import { ReactNode } from "react";
import { Button, CircularProgress } from "@mui/material";
// Styles
import Style from '@/styles/forms/button.module.scss';
import theme from "@/styles/theme";

interface ButtonDynamicProps {
    text: string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    loading?: boolean;
    variant?: "contained" | "outlined" | "text";
    width?: string;
    height?: string;
    typeBtn: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}

export const ButtonDynamic = ({
    text,
    startIcon,
    endIcon,
    loading = false,
    variant = "contained",
    width = '100%',
    height = '48px',
    typeBtn = 'button',
    onClick,
}: ButtonDynamicProps) => {
    return (
        <Button
            type={typeBtn}
            variant={variant}
            startIcon={loading ? <CircularProgress size={20} sx={{ color: theme.palette.lightGray.main }} /> : startIcon}
            endIcon={!loading ? endIcon : undefined}
            disabled={loading}
            onClick={onClick}
            className={Style.ButtonDynamic}
            sx={{ width, height, color: loading ? theme.palette.lightGray.main : "#ffffff" }}
        >
            {loading ? "Cargando..." : text}
        </Button>
    );
};