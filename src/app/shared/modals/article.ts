import { ArticleSource } from './article-source';

export interface Article {
Source: ArticleSource;
Author: string;
Title: string;
Description: string;
URL: string;
URLtoImage: string;
PublishedAt: string;
}
