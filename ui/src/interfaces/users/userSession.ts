import IUserDetails from "./userDetails";

export interface IUserSession {
  user: IUserDetails;
  accessToken?: string;
  refreshToken?: string;
  // [x: string]: string;
  // expiresIn?: number; //TODO: add this to the interface when we have time
  // roles?: [];
}
