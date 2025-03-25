"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { Alert, Box, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
// Components
import { InputType } from "../forms/inputs/inputType";
import { DynamicDatePicker } from "../forms/inputs/datePicker";
import { DynamicSelect } from "../forms/inputs/selectType";
import { ButtonDynamic } from "../forms/buttons/button";
import { ModalBase } from "../models/ModelBase";
import { ChangePassword } from "../auth/changePassword";
// Icons
import PersonIcon from '@mui/icons-material/Person';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import EmailIcon from '@mui/icons-material/Email';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// Services
import { EmployerProfile } from "@/services/profile";
import { updateEmployer } from "@/services/employer/updateEmployer";
// Types
import { Gender, JobPositions } from "@/types/types";
// Styles
import Style from '@/styles/profile/profile.module.scss';

interface MyEmployerProps {
    profile: EmployerProfile;
}

interface GenderProps {
    genders: Gender[];
}

interface RolesProps {
    roles: JobPositions[];
}

type CombinedProps = MyEmployerProps & GenderProps & RolesProps;

export const MyEmployer = ({ profile, genders, roles }: CombinedProps) => {
    const [formData, setFormData] = useState<EmployerProfile>({
        ...profile,
        birthDate: profile.birthDate || "",
        phone: profile.phone || "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setFormData({
            ...profile,
            birthDate: profile.birthDate || "",
            phone: profile.phone || "",
        });
    }, [profile]);

    const handleChange = (field: keyof EmployerProfile, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const response = await updateEmployer(formData, formData.id);

            setSuccess(response.message);
            setIsEditing(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.error || "Error desconocido";
                setError(errorMessage);
            } else {
                setError("Error desconocido");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box component={'section'} className={Style.containerFormEdit}>
            <Box component={'div'} className={Style.containerTopForm}>
                <Typography variant="h1">
                    Informacion de perfil
                </Typography>
            </Box>
            {error && <Alert sx={{ margin: '1rem 0' }} severity="error"> {error} </Alert>}
            {success && <Alert sx={{ margin: '1rem 0' }} severity="success"> {success} </Alert>}
            <Box component={'form'} className={Style.containerForm}>
                <InputType
                    label="Nombres"
                    required={true}
                    type='text'
                    variant="standard"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    startIcon={
                        <PersonIcon color={'primary'} />
                    }
                    disabled={!isEditing}
                />
                <InputType
                    label="Apellidos"
                    required={true}
                    type='text'
                    variant="standard"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    startIcon={
                        <PersonIcon color={'primary'} />
                    }
                    disabled={!isEditing}
                />
                <InputType
                    label="Email"
                    type='email'
                    variant="standard"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    startIcon={
                        <EmailIcon color={'primary'} />
                    }
                    disabled={!isEditing}
                />
                <InputType
                    label="Número Celular"
                    required={true}
                    type='number'
                    variant="standard"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    startIcon={
                        <SmartphoneIcon color={'primary'} />
                    }
                    disabled={!isEditing}
                />
                <DynamicDatePicker
                    label="Fecha de Nacimiento"
                    value={formData.birthDate ? dayjs(formData.birthDate) : null}
                    onChange={(date: Dayjs | null) =>
                        date && handleChange("birthDate", date.format("YYYY-MM-DD"))
                    }
                    format="DD/MM/YYYY"
                    maxDate={dayjs()}
                    disabled={!isEditing}
                />
                <DynamicSelect
                    label="Género"
                    options={genders.map((g) => ({ value: g.id, label: g.name }))}
                    value={formData.genderId}
                    onChange={(e) => handleChange("genderId", Number(e))}
                    disabled={!isEditing}
                />
                <DynamicSelect
                    label="Cargo"
                    options={roles.map((r) => ({ value: r.id, label: r.name }))}
                    value={formData.jobPositionId}
                    onChange={(e) => handleChange("jobPositionId", Number(e))}
                    disabled={!isEditing}
                />
                <InputType
                    label="Salario Mensual"
                    required={true}
                    type='number'
                    variant="standard"
                    value={formData.salary}
                    onChange={(e) => handleChange("salary", Number(e.target.value))}
                    startIcon={
                        <AttachMoneyIcon color={'primary'} />
                    }
                    disabled={!isEditing}
                />
            </Box>
            <Box component={'div'} className={Style.containerButton}>
                <ButtonDynamic
                    text={'Cambiar contraseña'}
                    typeBtn='button'
                    variant="contained"
                    width="15rem"
                    onClick={() => setModalOpen(true)}
                />
                <ButtonDynamic
                    text={isEditing ? "Guardar" : "Editar datos"}
                    typeBtn='button'
                    variant="contained"
                    width="10rem"
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    loading={isLoading}
                />
            </Box>
            <ModalBase open={isModalOpen} onClose={() => setModalOpen(false)} title="Cambio de contraseña">
                <ChangePassword userId={formData.id} />
            </ModalBase>
        </Box>
    );
}