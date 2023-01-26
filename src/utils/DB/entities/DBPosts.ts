import * as crypto from 'node:crypto';
import DBEntity from './DBEntity';

export type PostEntity = {
  id: string;
  title: string;
  content: string;
  userId: string;
};
export type CreatePostDTO = Omit<PostEntity, 'id'>;
export type ChangePostDTO = Partial<Omit<PostEntity, 'id' | 'userId'>>;

export default class DBPosts extends DBEntity<
  PostEntity,
  ChangePostDTO,
  CreatePostDTO
> {
  async create(dto: CreatePostDTO) {
    const created: PostEntity = {
      ...dto,
      id: crypto.randomUUID(),
    };
    this.entities.push(created);
    return created;
  }
}
