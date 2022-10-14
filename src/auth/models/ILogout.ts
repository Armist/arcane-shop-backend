export interface ILogout extends Request {
  user: {
    sub: number,
    email: string,
    iat: number,
    exp: number
  };
}