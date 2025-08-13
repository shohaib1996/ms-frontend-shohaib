import Cookies from 'js-cookie';

interface CookieOptions {
    expires?: number | Date;
    domain?: string;
    path?: string;
    secure?: boolean;
}

/**
 
 *
 * @param name 
 * @param value 
 * @param options 
 */
export const setCookie = (value: string, options: CookieOptions = {}): void => {
    const defaultOptions: CookieOptions = {
        domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
        ...options,
    };

    Cookies.set(
        process.env.NEXT_PUBLIC_TOKEN_NAME as string,
        value,
        defaultOptions,
    );
};
