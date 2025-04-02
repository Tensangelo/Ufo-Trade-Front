"use client"
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import dayjs, { Dayjs } from "dayjs";
// Types
import { Gender, RegisterUserData } from "@/types/types";
// Services
import { registerUser } from "@/services/auth/register";
import { getGenders } from "@/services/gender";
// Material UI
import { Alert, Box, Typography } from "@mui/material";
// Icons
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// Styles
import Style from '@/styles/auth/register.module.scss';
// Forms Components
import { PasswordType } from "../forms/inputs/passwordType";
import { InputType } from "../forms/inputs/inputType";
import { ButtonDynamic } from "../forms/buttons/button";
import { DynamicDatePicker } from "../forms/inputs/datePicker";
import { DynamicSelect } from "../forms/inputs/selectType";
import { AlertLoading } from "../loading/verifySession";

export const RegisterPageComponent = () => {
    const { Login, loading, user } = useAuthContext();
    const router = useRouter();
    const [genders, setGenders] = useState<{ value: number; label: string }[]>([]);
    const [formData, setFormData] = useState<RegisterUserData>({
        name: "",
        phone: "",
        address: "",
        birthDate: dayjs().format("YYYY-MM-DD"),
        genderId: 0,
        email: "",
        password: "",
    })
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchGenders = async () => {
            try {
                const data: Gender[] = await getGenders();
                const formattedOptions = data.map(gender => ({
                    value: gender.id,
                    label: gender.name
                }));
                setGenders(formattedOptions);
            } catch (error) {
                console.error("Error al obtener los géneros", error);
            }
        };

        fetchGenders();
    }, []);

    const handleChange = (field: keyof RegisterUserData, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setIsSubmitting(true);

        try {
            const response = await registerUser(formData);
            if (response.success) {
                Login(formData.email, formData.password);
                router.push("/");
            } else {
                setError(response.message || "Error al registrar usuario. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error(error);
            setError("Ocurrió un error inesperado.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading || user) {
        return <AlertLoading textInformation="Verificando sesión..." />;
    }

    return (
        <Box component={'section'} className={Style.containerRegister}>
            <Box component={'div'} className={Style.containerForm}>
                <Box component={'section'}>
                    <Link href={'/login'} className={Style.linkToLogin}>
                        <ArrowBackIcon color='primary' />
                        Volver
                    </Link>
                </Box>
                <Typography variant='h1'>
                    ¡Es un placer conocerte!
                </Typography>
                {successMessage && (
                    <Alert severity="success">
                        {successMessage}
                    </Alert>
                )}
                {error && (
                    <Alert severity="error" sx={{ margin: '1rem 0 2rem 0' }}>
                        {error}
                    </Alert>
                )}
                <Box component={'form'} onSubmit={handleSubmit}>
                    <div>
                        <InputType
                            label="Nombre completo"
                            required={true}
                            type='text'
                            value={formData.name}
                            disabled={false}
                            onChange={(e) => handleChange("name", e.target.value)}
                            startIcon={
                                <PersonIcon color={'primary'} />
                            }
                        />
                        <InputType
                            label="Número Celular"
                            required={true}
                            type='number'
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            startIcon={
                                <SmartphoneIcon color={'primary'} />
                            }
                        />
                        <InputType
                            label="Dirección"
                            required={true}
                            type='text'
                            value={formData.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                            startIcon={
                                <HomeIcon color={'primary'} />
                            }
                        />
                    </div>
                    <div>
                        <DynamicDatePicker
                            label="Fecha de Nacimiento"
                            value={dayjs(formData.birthDate)}
                            onChange={(date: Dayjs | null) =>
                                date && handleChange("birthDate", date.format("YYYY-MM-DD"))
                            }
                            format="DD/MM/YYYY"
                            maxDate={dayjs()}
                        />
                        <Box component={'div'} className={Style.containerSelectAux}>
                            <DynamicSelect
                                label="Seleccione género"
                                options={genders}
                                value={formData.genderId}
                                onChange={(e) => handleChange("genderId", Number(e))}
                            />
                        </Box>
                    </div>
                    <div>
                        <InputType
                            label="Email"
                            required={true}
                            type='email'
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            startIcon={
                                <EmailIcon color={'primary'} />
                            }
                        />
                        <PasswordType
                            required={true}
                            value={formData.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            startIcon={
                                <LockIcon color={'primary'} />
                            }
                        />
                    </div>
                    <Box component={'div'} className={Style.containerBtn}>
                        <ButtonDynamic
                            text="Registrarme"
                            typeBtn='submit'
                            variant="contained"
                            width="15rem"
                            loading={isSubmitting}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}