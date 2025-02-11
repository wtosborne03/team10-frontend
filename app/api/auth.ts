import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    exp: number;
    // Add other properties as needed
}

export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }

    try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;

        // Check if the token is expired
        if (decodedToken.exp < currentTime) {
            localStorage.removeItem('token');
            return false;
        }

        return true;
    } catch (error) {
        console.error('Invalid token:', error);
        return false;
    }
};