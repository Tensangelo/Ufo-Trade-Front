import { useState } from "react";
import axios from "axios";
// Icons
import LockIcon from '@mui/icons-material/Lock';
// Components
import { ButtonDynamic } from "../forms/buttons/button";
import { PasswordType } from "../forms/inputs/passwordType"
// Material ui
import { Alert, Box } from "@mui/material";
// SErvices
import { updatePassword } from "@/services/auth/changePassword";

interface PropsId {
    userId: number;
}

export const ChangePassword = ({ userId }: PropsId) => {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const message = await updatePassword({
                userId: userId,
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
            });

            setSuccess(message);
            setFormData({ oldPassword: "", newPassword: "" });
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data?.error || "Error desconocido";
                setError(errorMessage);
            } else {
                setError("Error desconocido");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            {error && <Alert sx={{ margin: '1rem 0' }} severity="error"> {error} </Alert>}
            {success && <Alert sx={{ margin: '1rem 0' }} severity="success"> {success} </Alert>}
            <PasswordType
                required={true}
                label="Contraseña actual"
                value={formData.oldPassword}
                onChange={(e) => handleChange("oldPassword", e.target.value)}
                startIcon={<LockIcon color="primary" />}
            />
            <PasswordType
                required={true}
                label="Nueva contraseña"
                value={formData.newPassword}
                onChange={(e) => handleChange("newPassword", e.target.value)}
                startIcon={<LockIcon color="primary" />}
            />
            <Box component={'div'} display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                <ButtonDynamic
                    text={loading ? "Cambiando..." : "Actualizar Contraseña"}
                    typeBtn='button'
                    variant="contained"
                    width="15rem"
                    loading={loading}
                    onClick={handleSubmit}
                />
            </Box>
        </section>
    )
}