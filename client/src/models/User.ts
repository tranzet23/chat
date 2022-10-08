const roles = ['admin', 'user'] as const;
type UserRoles = typeof roles[number];

export interface User {
    _id: string
    username: string
    email: string,
    country: string,
    role: UserRoles;
    profilePicture?: string | null | any;
    followings?: [];
    followers?: [];
    desc: string,
    city: string,
    age: string | number,
    linkToSocial: string,
}

export type LoginUser = Pick<User, 'email'> & {
    password: string;

};
export type RegisterUser = Pick<User, 'email' | 'username' | 'country'> & {
    password: string;
};



export interface UserForUpdate extends Pick<User, 'country' | 'email' | 'username' | 'desc' | 'linkToSocial' | 'city' | 'age'>{
    userForUpdateId: string;
    userCurrentId: string;
    isAdmin: boolean;
    profilePicture?: string | null;
    userId: string;
}