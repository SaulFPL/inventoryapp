import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    Card,
    CardContent,
    Button,
} from '@mui/material';
import useProductDetailAPI from '../hooks/useProductDetailApi';

const ProductDetailPage = () => {
    const { id } = useParams(); // Obtiene el productId desde la URL
    const navigate = useNavigate(); // Para regresar al listado de productos
    const { product, isFetching, error } = useProductDetailAPI(id);

    if (isFetching) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ mt: 4 }}>
                <Alert severity="error">
                    Error al cargar los detalles del producto: {error.message}
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Detalle del Producto
            </Typography>
            {product ? (
                <Card sx={{ maxWidth: 500, boxShadow: 3, borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="h6">ID: {product.productId}</Typography>
                        <Typography variant="h6">Código: {product.productCode}</Typography>
                        <Typography variant="h6">Nombre: {product.productName}</Typography>
                        <Typography variant="h6">Precio: ${product.productPrice}</Typography>
                        <Typography variant="h6">Tipo: {product.productType}</Typography>
                        <Typography variant="h6">
                            Estado: {product.productStatus ? 'Activo' : 'Inactivo'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Fecha de Creación: {new Date(product.createDate).toLocaleString()}
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <Alert severity="info">No se encontró el producto.</Alert>
            )}

            {/* Botón para regresar al listado */}
            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={() => navigate('/products')}
            >
                Regresar al Listado
            </Button>
        </Box>
    );
};

export default ProductDetailPage;