# howdy39.dev

Mintlify で作った個人サイト（自己紹介・Blog・Speaking）。`howdy39.github.io` からの移行先。

## 開発

- Node 22 が必要。`.node-version` で固定している（nodenv）。Node 25 では `mint` が動かない。
- プレビュー: `nodenv exec npx mint dev`（http://localhost:3000）
- 検証: `mint validate` と `mint broken-links`
- コミットは Conventional Commits 形式。作業の区切りごとに、確認を待たずにコミットしてよい。
- push は、本番（`*.mintlify.site`）で確認したいときだけ行う。毎回は push しない。

## 構成

- `ja/` が既定の言語。`en/` は、Home・Blog・Speaking を英訳している（Blog と Speaking は、日本語版と同じ作りで、タイトルとタグを英訳）。
- `docs.json` の `navigation.languages` に、言語ごとのページを並べている。タブは使わず、サイドバーに Home / Blog / Speaking の3項目だけを出す。
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
     会社のブログに載った記事は、掲載元を `STORES note`（note.st.inc）や `STORES Product Blog`（product.st.inc）にする。ファイル名の掲載元の部分は `stores-note` / `stores-product-blog`。Card の本文も同じ名前。インタビューなど、自分が載っている記事も、同じ形で足す。
2. `docs.json` の `ja` の「Blog posts」グループにある、`YYYY/MM` のグループ（なければ新しく作る。新しい月が上）に、ページを追加する。このグループは、サイドバーには出さず（`style.css` で隠す）、サイト内検索と `llms.txt` に載せるためだけにある。
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
   - `docs.json` の `en` の「Blog posts」グループに、同じ月のグループで、ページを追加する。
   - `en/blog/index.mdx` に、同じ `Update` ブロックを追加する。タイトルとタグだけ英訳し、日付・画像・リンクは同じにする。
   - タグの英訳: `AI` / `Notion` / `GAS` / `Google Workspace` / `SaaS management` / `ID` / `Security` / `Corporate IT`（情シス）/ `Management`（マネジメント）/ `Essay`（エッセイ）/ `Front-end`（フロントエンド）

## トピックのタグ

表記ゆれがあるとフィルターが別のタグに分かれるので、次の表記を使う。1記事に複数付けてよい。
一覧にないトピックが必要になったら、勝手に足さず、先に相談する。
一覧のどれにも合わない記事（今は STORES の PX アドベントカレンダーの告知の1件）は、`tags` を付けず、`Update` の `tags` 属性を省略している。

`AI` / `Notion` / `GAS` / `Google Workspace` / `SaaS管理` / `ID` / `セキュリティ` / `情シス` / `マネジメント` / `エッセイ` / `フロントエンド`

## Speaking（登壇・メディア掲載・スライド）

一覧は `ja/speaking.mdx` と `en/speaking.mdx` に、`Update` と `Card` を新しい順で並べる。あわせて、1エントリにつき1ページを `ja/talks/`・`en/talks/` に作る（検索・`llms.txt`・年月のグループのため。Blog の記事と同じ考え方）。

1. 一覧にエントリを足す。

   ```
   <Update label="YYYY/MM/DD" tags={["登壇"]}>
     <Card title={"主催者名 イベント名"} img="OGP画像のURL" href="イベントページのURL" cta="イベントページ" arrow="true" />
   </Update>
   ```

   - `title` は、イベントの正式な名称（主催者とタイトル）をそのまま書く。`"` は `\"` と書く。
   - `href`・`img`・`cta` は、リンクがあるときだけ付ける。リンクのない Card は、クリックできない枠になる。
   - 画像は、イベントページの `og:image` をそのまま使う。画像がなければ付けない。
2. `ja/talks/YYYY-MM-DD-<スラッグ>.mdx` を作る。同じ日付に複数あっても、スラッグで区別する。

   ```
   ---
   title: "Card と同じ title"
   description: "YYYY年M月D日、<title>（<役割>）。"
   url: "href と同じ URL"
   tag: "登壇"
   ---
   ```

   - リンクのないエントリは、`url` を書かず、本文に `YYYY/MM/DD · 役割` と書く。
3. `docs.json` の `ja` の「Speaking」グループにある、`YYYY/MM` のグループ（なければ新しく作る。新しい月が上）に、ページを追加する。
4. 英語版も同じ手順で作る（`en/speaking.mdx`、`en/talks/`、`docs.json` の `en`）。`title` は、イベント名の説明部分を英訳し、会社名やイベント名の英語表記が不確かなものは日本語のままにする。`description` は `Month D, YYYY: <title> (<role>).`。

- `tags` は**役割**だけで、1エントリに1つ。Blog のトピックのタグは使わない（フィルターの軸が別）。
  - `登壇`（通常の登壇、ゲスト、パネルなど）/ `基調講演`（キーセッションを含む）/ `LT` / `ファシリテーター` / `外部講師` / `メディア` / `スライド`
  - 英語版は `Talk` / `Keynote` / `Lightning talk` / `Facilitator` / `Guest lecturer` / `Media` / `Slides`
- `スライド` は、Speaker Deck の資料を、1件1エントリで載せるときのタグ。日付は Speaker Deck の公開日、タイトルは資料のタイトル、リンクの文言（`cta`）は `Speaker Deck`。登壇のエントリに、資料のリンクを足す形にはしない。
- 登壇の「予定」は、専用のタグを作らず、そのまま `登壇` として足す。あわせて、ホームの「登壇予定」（`UpcomingTalks`）にも足す。

## ホームの「登壇予定」「最近書いたブログ」

`ja/index.mdx` と `en/index.mdx` の先頭に、登壇予定と、最近書いたブログ4件を、この順に、セクションを縦に並べて載せている（自動では更新されない）。

- 最近書いたブログ: 2列（`CardGroup`）の画像付き Card を4枚載せる。Blog のエントリを足したら、新しい順の上位4件になるよう、ホームの Card も差し替える。Card は、一覧（`blog/index.mdx`）と同じ `title`・`img`・`href` を使い、本文は `YYYY/MM/DD · 掲載元`。
- 登壇予定: `snippets/upcoming-talks.jsx` の `UpcomingTalks` を使う。`talks` に、`date`（`YYYY/MM/DD`）・`title`・`img`・`href` を並べると、サイトを開いた日以降（当日を含む）の登壇だけが、ブラウザ側で表示される。開催日が過ぎたものは自動で消え、1件もなければ「現在、公開している登壇予定はありません。」が出る。新しい登壇の予定が決まったら、Speaking の一覧に足すのと一緒に、ここにも足す（過ぎたものは消さなくてよいが、溜まったら消す）。
- 見出しは、右側の目次に出すため `##` にしている。日本語版は日本語（登壇予定 / 最近書いたブログ / 経歴 / お仕事のご依頼）、英語版は英語（Upcoming talks / Recent posts / Career / Work with me）。
- SNS のリンクは、`docs.json` の `navbar.links`（ヘッダー右上）に置いている。アバター（`images/avatar.png`）は、ファビコンと、ヘッダーのロゴ（`images/logo-light.svg` と `images/logo-dark.svg`。アバターと「howdy39.dev」の文字を、パスにして1枚にした SVG）に使っている。ロゴを作り直すときは、アバターを80px ほどにして埋め込み、Inter Bold の文字をパスにする。

## 注意

- `style.css` は次の3つのためのもの。Mintlify の DOM（`.update`、`#content`、`#navigation-items`）に頼っているので、Mintlify の更新で崩れる可能性がある。
  - サイドバーの「Blog posts」「Speaking」グループ（`#navigation-items > div`）を隠す。
  - `Update` を並べたページ（Blog、Speaking）を2カラムにする。
  - 外部リンクの Card は右上に矢印が付くので、タイトルが矢印に重ならないよう、タイトルの右に余白を足す（`a:has(> div.absolute) h2`）。
- 公開後の `/llms.txt` は CDN にキャッシュされる。最新の中身を見たいときは `/llms.txt?nocache=1` のようにクエリを付ける。
