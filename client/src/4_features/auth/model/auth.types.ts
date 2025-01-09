import { z } from 'zod';
import { authResponseSchema } from './auth.schema';
import { UserType } from '../../../5_entities/user/model/user.types';

export enum AuthStatus {
  fetching = 'fetching',
  guest = 'guest',
  authenticated = 'authenticated',
}

export type AuthResponseT = z.infer<typeof authResponseSchema>;

export type AuthType =
  | {
      status: AuthStatus.fetching;
    }
  | {
      status: AuthStatus.guest;
    }
  | {
      status: AuthStatus.authenticated;
      user: UserType;
    };

export type AuthSliceType = {
  accessToken: string | null;
  data: AuthType;
};
