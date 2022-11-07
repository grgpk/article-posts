import { UserProfileInterface } from 'src/app/user-profile/types/userProfile.Interface';

export interface UserProfileStateInterface {
  data: UserProfileInterface | null;
  isLoading: boolean;
  error: string | null;
}
