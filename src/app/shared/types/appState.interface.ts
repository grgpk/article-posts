import { ArticleStateInterface } from 'src/app/article/types/articleState.interface';
import { AuthStateInterface } from 'src/app/auth/types/authState.interface';
import { CreateArticleStateInterface } from 'src/app/create-article/store/types/createArticleState.interface';
import { EditArticleStateInterface } from 'src/app/edit-article/store/types/edit-articleState.interface';
import { SettingsStateInterface } from 'src/app/settings/store/types/settingsState.interface';
import { FeedStateInterface } from 'src/app/shared/modules/feed/types/feedState.interface';
import { PopularTagsStateInterface } from 'src/app/shared/modules/popular-tags/types/popularTagsState.interface';
import { UserProfileStateInterface } from 'src/app/user-profile/types/userProfileState.interface';

export interface AppStateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
  popularTags: PopularTagsStateInterface;
  article: ArticleStateInterface;
  createArticle: CreateArticleStateInterface;
  editArticle: EditArticleStateInterface;
  settings: SettingsStateInterface;
  userProfile: UserProfileStateInterface;
}
