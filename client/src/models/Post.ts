export type IPost = {
    userId: string;
    desc: string;
    likes: number;
    title: string;
    _id: string;
}


export interface PostForUpdate extends Pick<IPost, 'userId' | 'desc' | 'title' | '_id'> {
    postId: string;
}

export type UsersPost = {
    userId: string,
    username: string;
}



