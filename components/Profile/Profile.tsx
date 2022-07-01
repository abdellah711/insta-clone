import type { Post, User } from "@prisma/client";
import { FC } from "react"
import Header from "./Header";
import Posts from "./Posts";

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

interface Props {
    user: UserProfile;
    posts: (Post & { _count: { likes: number; } })[];
}

const Profile: FC<Props> = ({ user, posts }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <Header user={user} />
            <Posts posts={posts} />
        </div>)
}

export default Profile