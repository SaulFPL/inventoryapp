import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/LoginPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import logo from './logo.svg';
import './App.css';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // Evita refetch al cambiar de ventana
            retry: 1, // Reintentos en caso de error
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/products" element={<ProductListPage />} />
                        <Route path="/products/:id" element={<ProductDetailPage />} />
                    </Routes>
                </Container>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
