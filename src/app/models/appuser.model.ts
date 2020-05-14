export interface AppUser {
  email?: string;
  roles?: {
    admin?: boolean;
  };
  displayName: string;
  uid: string;
}
