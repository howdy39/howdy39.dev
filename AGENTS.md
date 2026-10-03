# howdy39.dev

Mintlify で作った個人サイト（自己紹介・Blog・Archive）。`howdy39.github.io` からの移行先。

## 開発

- Node 22 が必要。`.node-version` で固定している（nodenv）。Node 25 では `mint` が動かない。
- プレビュー: `nodenv exec npx mint dev`（http://localhost:3000）
- 検証: `mint validate` と `mint broken-links`
- コミットは Conventional Commits 形式。

## 構成

- `ja/` が既定の言語、`en/` は Home だけ英訳して、Blog と Archive は日本語版への案内。
- `docs.json` の `navigation.languages` に言語ごとのタブ（Home / Blog / Archive）を定義している。
- ページは `ja/` `en/` の下に置く。内部リンクは `/ja/...` のようにパス付きで書く。

## Blog の記事の追加

外部サイト（note / Zenn / Qiita）の記事は、`url` フロントマター付きのページを1記事1ファイルで作る。
ページを作るのは、サイト内検索と `llms.txt` に載せるため。リンクだけの Card では載らない。

1. `ja/blog/YYYY-MM-DD-<掲載元>-<スラッグ>.mdx` を作る。本文は書かない。

   ```
   ---
   title: "記事のタイトル"
   description: "紹介文"
   keywords: ["検索用の語"]
   url: "元記事のURL"
   tag: "note"
   ---
   ```

   - `description`: 著者が自分で紹介する口調（です・ます調、主語は省く）で、150〜200字ほど。記事に書いていない感想は足さない。`llms.txt` と検索に使われる。
   - `tag`: 掲載元（`note` / `Zenn` / `Qiita`）。サイドバーに表示される。
2. `docs.json` の Blog タブに、新しい順でページを追加する。
3. `ja/blog/index.mdx` に `Update` ブロックを、新しい順で追加する。

   ```
   <Update label="YYYY/MM/DD" tags={["GAS", "AI"]}>
     <Card title="タイトル" img="OGP画像のURL" href="元記事のURL">
       note
     </Card>
   </Update>
   ```

   - `tags` はトピックだけ。掲載元は入れない（タグは OR 選択で、掲載元での絞り込みに意味がないため）。
   - Card の本文は掲載元の名前。
   - OGP 画像は、元記事の `og:image` の URL をそのまま使う。

## トピックのタグ

表記ゆれがあるとフィルターが別のタグに分かれるので、次の表記を使う。1記事に複数付けてよい。
一覧にないトピックが必要になったら、勝手に足さず、先に相談する。

`AI` / `Notion` / `GAS` / `Google Workspace` / `SaaS管理` / `ID` / `セキュリティ` / `情シス` / `マネジメント` / `エッセイ`

## 注意

- `style.css` は、Blog 一覧（`Update`）を2カラムにするためのもの。Mintlify の DOM（`.update`、`#content`）に頼っているので、Mintlify の更新で崩れる可能性がある。
- 公開後の `/llms.txt` は CDN にキャッシュされる。最新の中身を見たいときは `/llms.txt?nocache=1` のようにクエリを付ける。
