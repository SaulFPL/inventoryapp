import React from 'react';
import { Link } from 'react-router-dom';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Alert,
    Button,
} from '@mui/material';
import useProductsAPI from '../hooks/useProductsApi';

const ProductListPage = () => {
    const { products, isFetching, error } = useProductsAPI();

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
                <Alert severity="error">Error al cargar los productos: {error.message}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Lista de Productos
            </Typography>

            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/products/add"
                sx={{ mb: 2 }}
            >
                Agregar Producto
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Código</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.productId}>
                                <TableCell>{product.productId}</TableCell>
                                <TableCell>{product.productCode}</TableCell>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>${product.productPrice}</TableCell>
                                <TableCell>{product.productType}</TableCell>
                                <TableCell>
                                    {product.productStatus ? 'Activo' : 'Inactivo'}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        component={Link}
                                        to={`/products/${product.productId}`}
                                    >
                                        Ver Detalles
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ProductListPage;
