import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';

const ADD_PRODUCT_API_URL = 'https://localhost:7103/product/'

const useAddProductAPI = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { isError, mutateAsync } = useMutation({
        mutationFn: (productData) => {
            return axios.post(ADD_PRODUCT_API_URL, {
                ...productData,
                createDate: new Date().toISOString(),
            });
        },
        onSettled: () => {
            setIsLoading(false);
        },
    });

    const addProduct = async (productData) => {
        setIsLoading(true);
        return mutateAsync(productData);
    };

    return {
        isLoading,
        isError,
        addProduct, 
    };
};

export default useAddProductAPI;