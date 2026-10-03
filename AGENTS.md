# howdy39.dev

Mintlify で作った個人サイト（自己紹介・Blog・Archive）。`howdy39.github.io` からの移行先。

## 開発

- Node 22 が必要。`.node-version` で固定している（nodenv）。Node 25 では `mint` が動かない。
- プレビュー: `nodenv exec npx mint dev`（http://localhost:3000）
- 検証: `mint validate` と `mint broken-links`
- コミットは Conventional Commits 形式。

## 構成

- `ja/` が既定の言語。`en/` は、Home・Blog・Speaking を英訳している（Blog と Speaking は、日本語版と同じ作りで、タイトルとタグを英訳）。Archive は、日本語版への案内だけ。
- `docs.json` の `navigation.languages` に、言語ごとのページを並べている。タブは使わず、サイドバーに Home / Blog / Speaking / Archive の4項目だけを出す。
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
2. `docs.json` の `ja` の「Blog posts」グループ（年ごとのグループ）に、新しい順でページを追加する。このグループは、サイドバーには出さず（`style.css` で隠す）、サイト内検索と `llms.txt` に載せるためだけにある。
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
4. 英語版も作る。`llms.txt` は、既定の言語（日本語）のページだけが本体で、英語は別の索引（`/_llms/en.md`）になるので、英語のページがないと、英語の AI や検索から記事が見つからない。
   - `en/blog/<日本語版と同じファイル名>.mdx`: `title`（英訳）、`description`（日本語の紹介文を、同じ一人称の文体で英訳）、`keywords`（英語）、`url` と `tag`（日本語版と同じ）。
   - `docs.json` の `en` の「Blog posts」グループ（年ごとのグループ）に、同じ順でページを追加する。
   - `en/blog/index.mdx` に、同じ `Update` ブロックを追加する。タイトルとタグだけ英訳し、日付・画像・リンクは同じにする。
   - タグの英訳: `AI` / `Notion` / `GAS` / `Google Workspace` / `SaaS management` / `ID` / `Security` / `Corporate IT`（情シス）/ `Management`（マネジメント）/ `Essay`（エッセイ）

## トピックのタグ

表記ゆれがあるとフィルターが別のタグに分かれるので、次の表記を使う。1記事に複数付けてよい。
一覧にないトピックが必要になったら、勝手に足さず、先に相談する。

`AI` / `Notion` / `GAS` / `Google Workspace` / `SaaS管理` / `ID` / `セキュリティ` / `情シス` / `マネジメント` / `エッセイ`

## Speaking（登壇・メディア掲載）

`ja/speaking.mdx` と `en/speaking.mdx` に、`Update` を新しい順で並べる。Blog と違い、1エントリ1ファイルにはしない。

```
<Update label="YYYY/MM/DD" tags={["登壇"]}>
  [イベント名](イベントページのURL) / [資料](Speaker DeckのURL)
</Update>
```

- 本文は、イベントの正式な名称（主催者とタイトル）をそのまま書く。リンクは、イベントページがあれば付け、資料があれば「/ 資料」で足す。
- `tags` は**役割**だけで、1エントリに1つ。Blog のトピックのタグは使わない（フィルターの軸が別）。
  - `登壇`（通常の登壇、ゲスト、パネルなど）/ `基調講演`（キーセッションを含む）/ `LT` / `ファシリテーター` / `外部講師` / `メディア` / `スライド`
  - 英語版は `Talk` / `Keynote` / `Lightning talk` / `Facilitator` / `Guest lecturer` / `Media` / `Slides`
- `スライド` は、Speaker Deck の資料を、1件1エントリで載せるときのタグ。日付は Speaker Deck の公開日、タイトルは資料のタイトル、リンクの文言（`cta`）は `Speaker Deck`。登壇のエントリに、資料のリンクを足す形にはしない。
- 日本語版と英語版の両方を更新する。英語版は、イベント名の説明部分を英訳し、会社名やイベント名の英語表記が不確かなものは日本語のままにする。
- 登壇の「予定」は、専用のタグを作らず、そのまま `登壇` として足す。

## 注意

- `style.css` は次の2つのためのもの。Mintlify の DOM（`.update`、`#content`、`#navigation-items`）に頼っているので、Mintlify の更新で崩れる可能性がある。
  - サイドバーの「Blog posts」グループ（`#navigation-items > div`）を隠す。
  - `Update` を並べたページ（Blog、Speaking）を2カラムにする。
- 公開後の `/llms.txt` は CDN にキャッシュされる。最新の中身を見たいときは `/llms.txt?nocache=1` のようにクエリを付ける。
