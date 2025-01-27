import { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    CircularProgress,
} from '@mui/material';
import useLoginApi from '../hooks/useLoginApi';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { login, isFetching, error } = useLoginApi();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(credentials); 
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    p: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h4" textAlign="center" gutterBottom>
                    Iniciar Sesi�n
                </Typography>

                {error && (
                    <Alert severity="error">
                        {error?.response?.data?.message || 'Error al iniciar sesi�n'}
                    </Alert>
                )}

                <TextField
                    label="Nombre"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    fullWidth
                    required
                />

                <TextField
                    label="Tel�fono"
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                    fullWidth
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isFetching}
                >
                    {isFetching ? <CircularProgress size={24} /> : 'Iniciar Sesi�n'}
                </Button>
            </Box>
        </Container>
    );
};

export default LoginPage;
