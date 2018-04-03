import { Article } from './article';

export interface SearchQueryModal {
    status: string;
    totalResult: number;
    articles: Article[];
}
