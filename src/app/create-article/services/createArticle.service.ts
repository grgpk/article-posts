import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ArticleInputInterface } from 'src/app/shared/types/article-input.interface';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { SaveArticleResponseInterface } from 'src/app/shared/types/saveArticleResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class CreateArticleService {
  constructor(private http: HttpClient) {}

  createArticle(
    articleInput: ArticleInputInterface
  ): Observable<ArticleInterface> {
    const fullurl = environment.apiUrl + '/api/articles';
    return this.http
      .post<SaveArticleResponseInterface>(fullurl, {
        article: articleInput,
      })
      .pipe(
        map((response: SaveArticleResponseInterface) => {
          return response.article;
        })
      );
  }
}
