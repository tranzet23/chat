import React, {useState} from 'react';

const UseFetching = (callback: any) => {
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState('');

    const fetching = async () => {
        try {
            setIsLoading(true);
            await callback()
        }
        catch (err: any) {
            setError(err.message)
        }
        finally {
            setIsLoading(false);
        }
    }
    return [fetching, error, isLoading]
};

export default UseFetching;