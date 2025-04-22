/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface SessionData {
    counter: number;
    lastVisit: Date;
    favorites: string[];
    article_favorites: string[];
  }
}

// Astroのコンテンツコレクションエントリに拡張プロパティを定義
declare module 'astro:content' {
  interface CollectionEntry<T> {
    slug: string;
  }
}