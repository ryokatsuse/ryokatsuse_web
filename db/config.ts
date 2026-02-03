import { defineDb, defineTable, column } from 'astro:db';

// いいねテーブル: 記事ごとのいいね数を保存
const Likes = defineTable({
  columns: {
    slug: column.text({ primaryKey: true }),
    count: column.number({ default: 0 }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Likes },
});
