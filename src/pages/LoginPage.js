import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    CircularProgress,
} from '@mui/material';
import useLoginAPI from '../hooks/useLoginApi';

const LoginPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const {user: userData, isFetching, error } = useLoginAPI({
        username: user, password: password
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        console.log(credentials)
        e.preventDefault();
        setUser(credentials.username);
        setPassword(credentials.password)
    };

    if (userData) {
        navigate('/products');
    }

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
                    Iniciar Sesión
                </Typography>

                {error && (
                    <Alert severity="error">
                        {error?.response?.data?.message || 'Error al iniciar sesión'}
                    </Alert>
                )}

                {userData && (
                    <Alert severity="success">¡Inicio de sesión exitoso! Bienvenido, {userData?.username}</Alert>
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
                    label="Telefono"
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
                    {isFetching ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
                </Button>
            </Box>
        </Container>
    );
};

export default LoginPage
