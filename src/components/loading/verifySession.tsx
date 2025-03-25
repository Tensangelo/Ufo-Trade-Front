import { Box, CircularProgress, Typography } from "@mui/material"

interface PropsAlertLoading {
    textInformation: string;
}

export const AlertLoading = ({textInformation}: PropsAlertLoading) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress sx={{ margin: '2rem' }} />
            <Typography mt={2}>{textInformation}</Typography>
        </Box>
    )
}