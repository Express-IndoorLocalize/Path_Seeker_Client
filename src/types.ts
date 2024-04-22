export type LoginContextType = {
    isLoggedIn?: boolean;
    setIsLoggedIn?: (value: boolean) => void;
};

export type User = {
    fullName: string;
    email: string;
    userId: string|null;
    dateOfBirth?: any;
    profileUri?: string;
    mobile?: string;
};