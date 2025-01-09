import { type AxiosInstance } from 'axios';
import axiosInstance from '../../../6_shared/api/axiosInstance';
import { userSchema } from '../model/user.schema';
import { UserType } from '../model/user.types';

class UserService {
  constructor(private readonly client: AxiosInstance) {}

  async getUsers(): Promise<UserType[]> {
    const response = await this.client('/users');
    return userSchema.array().parse(response.data);
  }
}

const userService = new UserService(axiosInstance);

export default userService;
