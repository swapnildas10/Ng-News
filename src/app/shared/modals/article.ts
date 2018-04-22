import { ArticleSource } from './article-source';
import { CompanyLogo } from './company-logo';
import { DomainLogo } from './domain-logo';

export interface Article {
source: ArticleSource;
author: string;
title: string;
description: string;
url: string;
urlToImage: string;
publishedAt: string;
companyLogo?: CompanyLogo;
domainLogo?: DomainLogo;
}
