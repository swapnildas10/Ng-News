import { Article } from './article';

export interface TopHeadlines {
status: string;
totalResults: number;
articles: Article[];
}
