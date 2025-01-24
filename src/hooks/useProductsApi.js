import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const useProductsApi = () => {
    const { isFetching, error, data } = useQuery({
        queryFn: () => axios.get('https://localhost:7103/Product')
    });

    return {
        isFetching,
        error,
        products: data?.data || []
    };
};

export default useProductsApi;