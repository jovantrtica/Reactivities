export interface User {
    username: string;
    displayName: string;
    token: string;
    image?: string;
    bio?: string; // dodao ja
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}