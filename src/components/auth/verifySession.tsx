import { Box, CircularProgress, Typography } from "@mui/material"

export const VerifySession = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress sx={{ margin: '2rem' }} />
            <Typography mt={2}>Verificando sesión...</Typography>
        </Box>
    )
}