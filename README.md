# howdy39.dev

howdy39（中野 達也）の個人サイトとブログ。[Mintlify](https://mintlify.com) で作っています。
Personal site and blog of howdy39 (Tatsuya Nakano), built with Mintlify.

## サイト

- <https://howdy39.dev/>（日本語 `/ja`、英語 `/en`）

## 中身

- **Home**: 自己紹介、登壇予定、最近書いたブログ、経歴、お仕事のご依頼
- **Blog**: note / Zenn / Qiita などの記事への一覧（外部サイトへのリンクと OGP 画像）
- **Speaking**: 登壇、メディア掲載、スライド
- **Books**: 技術同人誌（無料の電子書籍）
- **Videos**: YouTube に出演した動画

日本語（`ja/`）が既定で、英語（`en/`）は翻訳です。

## 開発

Node 22 が必要です（`.node-version` で固定。nodenv を使っています）。

```bash
nodenv exec npm run dev          # http://localhost:3000 でプレビュー
nodenv exec npm run validate     # ビルドの検証
nodenv exec npm run broken-links # リンク切れの確認
```

`main` にマージすると、Mintlify が自動でデプロイします。

記事や登壇の追加の手順、タグの一覧、`docs.json` やスタイルの注意点は [AGENTS.md](./AGENTS.md) にあります。
