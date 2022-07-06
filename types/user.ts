import { User } from "@prisma/client";

export type UserProfile = UserPublicInfo & {
    followers: {
        followerId: number;
    }[];
    _count: {
        followers: number;
        following: number;
        posts: number;
    };
};

export type UserPublicInfo = Omit<User, 'password' | 'fId' | 'email'>
