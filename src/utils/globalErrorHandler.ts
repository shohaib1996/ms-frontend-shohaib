import { toast } from 'sonner';

export interface TGenericErrorResponse {
    status: number;
    data?: {
        error?: string;
        success?: boolean;
    };
}
export interface TGenericErrorResponse2 {
    message: {
        status: number;
        success: boolean;
        message: string;
        stack?: string | null;
    };
}

export const globalErrorHandler = (error: unknown) => {
    const typeError = error as TGenericErrorResponse;
    const typeError2 = error as TGenericErrorResponse2;
    console.error(error);
    if (typeError?.data?.error) {
        toast.error(typeError?.data?.error);
    } else if (typeError2?.message?.message) {
        // Todo - remove this else if part after fixing the error format from the backend
        toast.error(typeError2?.message?.message);
    } else {
        toast.error('An unknown error occurred');
    }
};
