import { FC } from "react"
import { PostWithUser } from "types/post";
import { UserProfile } from "types/user";
import Header from "./Header";
import Posts from "./Posts";



interface Props {
    user: UserProfile;
    posts: PostWithUser[];
}

const Profile: FC<Props> = ({ user, posts }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <Header user={user} />
            <Posts posts={posts} />
        </div>)
}

export default Profile