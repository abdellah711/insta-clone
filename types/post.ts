import { Like, Post, User } from "@prisma/client";

export type PostWithUser = Post & {
    _count: { likes: number };
    owner: Pick<User, "fullname" | "id"> & {username: string | null; image: string | null};
    likes: Like[];
} 