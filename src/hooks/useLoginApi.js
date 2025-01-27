import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useLoginApi = () => {
    const navigate = useNavigate(); 
    const {
        mutate: login,
        isLoading: isFetching,
        error,
        data: response,
    } = useMutation({
        mutationFn: async ({ username, password }) => {
            const res = await axios.post('https://localhost:7103/User/login', {
                userName: username,
                userPhone: password,
            });

            return res.data;
        },
        onSuccess: (data) => {
            if (data?.token) {
                localStorage.setItem('token', data.token);
                navigate('/products');
            }
        },
    });

    let user = null;
    if (response) {
        user = {
            ...response,
        };
    }

    return { login, user, error, isFetching };
};

export default useLoginApi;