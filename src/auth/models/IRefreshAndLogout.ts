import { IUser } from './IUser';

export interface IRefreshAndLogout extends Request {
  user: IUser;
}