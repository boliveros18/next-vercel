export interface Answer {
    _id?: string;
    parent_id: string;
    user_photo: string;
    user_name: string;
    user_id: string;
    description: string;
    user_tag_id: string;
    user_tag_name: string;
    createdAt: number;
    updatedAt: number;
    //likes: []
}