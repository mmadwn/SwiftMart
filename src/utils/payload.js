import * as jose from 'jose';
import { getToken } from './localStorage';

export const getUserFromPayload = async () => {
    const token = getToken();

    if (!token) {
        return null;
    }

    try {
        const decoded = jose.decodeJwt(token);
        return decoded;
    } catch (error) {
        console.error("JWT Decoding Error:", error.message);
        throw error;
    }
};

