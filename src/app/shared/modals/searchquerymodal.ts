import { Article } from './article';

export interface SearchQueryModal {
    status: string;
    totalResults: number;
    articles: Article[];
}
