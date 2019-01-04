import { Article } from './article';

export interface UserDashboard {
   articles: Article[];
    cols: number;
    rows: number;
  }


export interface UserFavorites {
  ID: string;
  favoriteTags: string[];
}
