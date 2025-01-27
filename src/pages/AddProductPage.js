import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Switch,
    FormControlLabel,
    CircularProgress,
    Alert,
} from '@mui/material';
import useAddProductAPI from '../hooks/useAddProductApi';

const AddProductPage = () => {
    const [product, setProduct] = useState({
        productCode: '',
        productName: '',
        productPrice: '',
        productType: '',
        productStatus: false,
    });

    const { isLoading, isError, addProduct } = useAddProductAPI();
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (e) => {
        setProduct((prev) => ({ ...prev, productStatus: e.target.checked }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addProduct(product);
            setSuccessMessage('Producto agregado exitosamente.');
            setProduct({
                productCode: '',
                productName: '',
                productPrice: '',
                productType: '',
                productStatus: false,
            });
        } catch (error) {
            console.error('Error al agregar el producto:', error);
        }
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Crear Nuevo Producto
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    maxWidth: 500,
                    mx: 'auto',
                    p: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                {isError && <Alert severity="error">Error al agregar el producto.</Alert>}
                {successMessage && <Alert severity="success">{successMessage}</Alert>}

                <TextField
                    label="Código del Producto"
                    name="productCode"
                    value={product.productCode}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Nombre del Producto"
                    name="productName"
                    value={product.productName}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Precio del Producto"
                    name="productPrice"
                    value={product.productPrice}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                    required
                />
                <FormControl fullWidth>
                    <InputLabel id="product-type-label">Tipo de Producto</InputLabel>
                    <Select
                        labelId="product-type-label"
                        name="productType"
                        value={product.productType}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Testing">Testing</MenuItem>
                        <MenuItem value="Production">Production</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </FormControl>
                <FormControlLabel
                    control={
                        <Switch
                            checked={product.productStatus}
                            onChange={handleSwitchChange}
                            name="productStatus"
                        />
                    }
                    label={product.productStatus ? 'Activo' : 'Inactivo'}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} /> : 'Crear Producto'}
                </Button>
            </Box>
        </Box>
    );
};

export default AddProductPage;