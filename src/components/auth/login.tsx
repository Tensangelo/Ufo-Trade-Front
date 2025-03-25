"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
// Material UI
import { Alert, Box, Typography } from "@mui/material";
// Styles
import Style from '@/styles/auth/login.module.scss';
// Forms Components
import { PasswordType } from "../forms/inputs/passwordType";
import { InputType } from "../forms/inputs/inputType";
import { ButtonDynamic } from "../forms/buttons/button";
import { AlertLoading } from "../loading/verifySession";

export const LoginPageComponent = () => {
    const { Login, loading } = useAuthContext();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formLoading, setFormLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        setError(false);

        try {
            await Login(email, password);
            console.log("✅ Inicio de sesión exitoso");
            setSuccess(true);
            router.replace("/"); // Redirige a la página principal
        } catch (error) {
            console.log("❌ Credenciales incorrectas", error);
            setError(true);
        } finally {
            setFormLoading(false);
        }
    };

    if (loading) {
        return (
            <AlertLoading textInformation="Verificando sesión..." />
        );
    }

    return (
        <Box component={'section'} className={Style.containerGeneral}>
            <Box component={'div'} className={Style.containerLogin}>
                <Box component={'div'} className={Style.containerText}>
                    <article>
                        <Typography  variant="h3">
                            Bienvenido a UFO-Trade 👽
                        </Typography>
                        {/* <Typography variant='body1'>
                            Intercambios intergalácticos comienzan aquí.
                        </Typography> */}
                        <Typography variant='body1'>
                            Gestiona tu tripulación, controla accesos y mantén todo en órbita.
                        </Typography>
                    </article>
                </Box>
                <Box component={'section'} className={Style.containerForm}>
                    <article>
                        <Typography  variant="h4">
                            ¡Hola!
                        </Typography>
                        <Typography variant='body1'>
                            Ingresa con tu cuenta
                        </Typography>
                    </article>
                    <Alert severity='info' sx={{ margin: '1rem 0 2rem 0', textAlign: 'start' }}>
                        User admin
                        <br />
                        correo: arthur02morgan@hotmail.com
                        <br />
                        password: hiJohn2
                    </Alert>
                    {error && (
                        <Alert severity="error" sx={{ margin: '1rem 0 2rem 0' }}>
                            Las credenciales ingresadas son incorrectas. Inténtalo de nuevo.
                        </Alert>
                    )}
                    {success && (
                        <Alert severity='success' sx={{ margin: '1rem 0 2rem 0' }}>
                            Ingreso confirmado. Redirigiendo, por favor espera...
                        </Alert>
                    )}
                    <Box component={'form'} onSubmit={handleSubmit} className={Style.containerInputs}>
                        <InputType
                            label="Email"
                            required={true}
                            type='email'
                            value={email}
                            disabled={formLoading}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <PasswordType
                            required={true}
                            disabled={formLoading}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <ButtonDynamic
                            text="Iniciar sesión"
                            typeBtn='submit'
                            variant="contained"
                            width="15rem"
                            loading={formLoading}
                        />
                    </Box>
                    <Box component={'article'} className={Style.containerLinkSignin}>
                        <Typography  variant="body2">
                            ¿Aún no tienes una cuenta?
                        </Typography>
                        <Link
                            href={'/register'}
                            passHref
                        >
                            Regístrate aquí
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}