const roles = ['admin', 'user'] as const;
type UserRoles = typeof roles[number];

export interface User {
    _id: string
    username: string
    email: string,
    password: string,
    country: string,
    role: UserRoles;
}

export type LoginUser = Omit<User, 'country' | 'username'>;
