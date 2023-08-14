import { UserMetadata } from 'firebase/auth';

export interface IFirestoreUser {
  uid: string;
  email: string;
  displayName: string | '' | null;
  photoURL: string | '' | null;
  emailVerified: boolean;
  phoneNumber: string | '' | null;
  providerId: string | '' | null;
  metadata: UserMetadata;
  refreshToken: string;
  isAnonymous: boolean;
}
