import * as crypto from 'node:crypto';
import DBEntity from './DBEntity';

export type ProfileEntity = {
  id: string;
  avatar: string;
  sex: string;
  birthday: number;
  country: string;
  street: string;
  city: string;
  memberTypeId: string;
  userId: string;
};
type CreateProfileDTO = Omit<ProfileEntity, 'id'>;
type ChangeProfileDTO = Partial<Omit<ProfileEntity, 'id' | 'userId'>>;

export default class DBProfiles extends DBEntity<
  ProfileEntity,
  ChangeProfileDTO,
  CreateProfileDTO
> {
  async create(dto: CreateProfileDTO) {
    const created: ProfileEntity = {
      ...dto,
      id: crypto.randomUUID(),
    };
    this.entities.push(created);
    return created;
  }
}
