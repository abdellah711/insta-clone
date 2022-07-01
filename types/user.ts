import { User } from "@prisma/client";

export type UserProfile = Omit<User, 'password' | 'fId'> & {
    followers: {
        followerId: number;
    }[];
    _count: {
        followers: number;
        following: number;
        posts: number;
    };
};