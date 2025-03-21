import { ReactNode } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// Style
import Style from '@/styles/modals/modalBase.module.scss';

type DynamicModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
};

export const ModalBase = ({ open, onClose, title, children }: DynamicModalProps) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box className={Style.modalContainer}>
                <Box className={Style.modalHeader}>
                    {title && <Typography variant="h6" color="primary">{title}</Typography>}
                    <IconButton onClick={onClose} className={Style.closeButton}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box className={Style.modalContent}>{children}</Box>
            </Box>
        </Modal>
    );
};