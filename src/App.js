import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/LoginPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProtectedRoute from './components/ProtectedRoute'; 
import './App.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, 
            retry: 1,
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

                        {/* Rutas protegidas */}
                        <Route
                            path="/products"
                            element={
                                <ProtectedRoute>
                                    <ProductListPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/products/:id"
                            element={
                                <ProtectedRoute>
                                    <ProductDetailPage />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Container>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
