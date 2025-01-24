import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useProductDetailAPI = (productId) => {
    const { isFetching, error, data: response } = useQuery({
        queryKey: [productId],
        queryFn: () => axios.get(`https://localhost:7103/Product/id?id=${productId}`),
        enabled: !!productId,
    });

    let product = null;
    if (response?.data) {
        console.log(response)

        product = {
           ...response.data
        };
    }
    return { product, error, isFetching };
};

export default useProductDetailAPI;