import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GetPopularTagsResponseInterface } from 'src/app/shared/modules/popular-tags/types/getPopularTagsResponse.interface';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';
import { environment } from 'src/environments/environment';

@Injectable()
export class PopularTagsService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    const url = environment.apiUrl + '/api/tags';
    return this.http
      .get(url)
      .pipe(map((res: GetPopularTagsResponseInterface) => res.tags));
  }
}
