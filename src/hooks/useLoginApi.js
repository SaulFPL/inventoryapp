import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useLoginApi = ({ username, password }) => {
    const { isFetching, error, data: response } = useQuery({
        queryKey: [username, password],
        queryFn: () => axios.get(`https://localhost:7103/User/login?userName=${username}&userPhone=${password}`),
        enabled: !!username && !!password,
    });

    let user = null;
    console.log(response)
    if (response?.data) {
        user = {
            ...response.data
        };
    }
    return { user, error, isFetching };
};

export default useLoginApi;