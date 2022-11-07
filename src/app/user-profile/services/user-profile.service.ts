import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GetUserProfileResponseInterface } from 'src/app/user-profile/types/getUserProfileResponse.interface';
import { UserProfileInterface } from 'src/app/user-profile/types/userProfile.Interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(slug: string): Observable<UserProfileInterface> {
    const url = `${environment.apiUrl}/api/profiles/${slug}`;

    return this.http
      .get(url)
      .pipe(
        map((response: GetUserProfileResponseInterface) => response.profile)
      );
  }
}
