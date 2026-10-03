# howdy39.dev

Mintlify で作った個人サイト（自己紹介・Blog・Speaking）。`howdy39.github.io` からの移行先。

## 開発

- Node 22 が必要。`.node-version` で固定している（nodenv）。Node 25 では `mint` が動かない。
- プレビュー: `nodenv exec npx mint dev`（http://localhost:3000）
- 検証: `mint validate` と `mint broken-links`
- コミットは Conventional Commits 形式。作業の区切りごとに、確認を待たずにコミットしてよい。
- push は、本番（`https://howdy39.dev/`）で確認したいときだけ行う。毎回は push しない。

## 構成

- `ja/` が既定の言語。`en/` は、Home・Blog・Speaking・Books・Videos を英訳している（Blog と Speaking は、日本語版と同じ作りで、タイトルとタグを英訳）。
- `docs.json` の `navigation.languages` に、言語ごとのページを並べている。タブは使わず、サイドバーに Home / Blog / Speaking / Books / Videos の5項目だけを出す。
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
2. `docs.json` の `ja` の、`Blog › YYYY/MM` というグループ（なければ新しく作る。`navigation` の直下に、新しい月が上になるよう並べる）に、ページを追加する（掲載元ごとには分けない）。これらのグループは、サイドバーには出さず（`style.css` で隠す）、サイト内検索と `llms.txt` に載せるためだけにある。検索結果には、`Blog › 2025/08` と出る。グループを入れ子にして「Blog」を上の段に置くと、検索画面は、語によって上の段を省略する（月しか出ない）ので、名前に「Blog › 」を含めた1段のグループにしている。
3. `ja/blog/index.mdx` に `Update` ブロックを、新しい順で追加する。既存のブロックを1つ、まるごとコピーして、日付・タグ・リンク・画像・タイトル・掲載元を直すのが確実。

   ```
   <Update label="YYYY/MM/DD" tags={["GAS", "AI"]}>
     <div className="not-prose">
       <a href="元記事のURL" className="group flex flex-col overflow-hidden rounded-2xl border …">
         <img src="OGP画像のURL" alt="" width="1200" height="630" loading="lazy" decoding="async" className="w-full m-0 object-cover" style={{ aspectRatio: "1200 / 630" }} />
         <div className="flex items-start justify-between gap-3 p-4">
           <div className="min-w-0">
             <div className="font-semibold text-base text-gray-800 dark:text-white">タイトル</div>
             <div className="mt-1 text-gray-500 dark:text-gray-400">note</div>
           </div>
           <span aria-hidden="true" className="…">↗</span>
         </div>
       </a>
     </div>
   </Update>
   ```

   - 標準の `Card` ではなく、自作の HTML のカードにしている。画像に `width`・`height` と `loading="lazy"` を付けて、読み込み時のレイアウトのずれ（CLS）と、画面外の画像の先読みを防ぐため（記事が160件を超え、`Card` のままだと、ページの転送量が約9MB になった）。
   - 新しい順の先頭4件だけは、`loading="lazy"` を付けず、先頭2件に `fetchPriority="high"` を付ける（LCP の画像）。追加して先頭からはみ出した記事は、`loading="lazy"` にする。
   - `tags` はトピックだけ。掲載元は入れない（タグは OR 選択で、掲載元での絞り込みに意味がないため）。
   - カードの下の行は掲載元の名前。
   - タイトルに `{` `}` を含むときは、`&#123;` `&#125;` と書く。
   - OGP 画像は、元記事の `og:image` の URL をそのまま使う。
4. 英語版も作る。`llms.txt` は、既定の言語（日本語）のページだけが本体で、英語は別の索引（`/_llms/en.md`）になるので、英語のページがないと、英語の AI や検索から記事が見つからない。
   - `en/blog/<日本語版と同じファイル名>.mdx`: `title`（英訳）、`description`（日本語の紹介文を、同じ一人称の文体で英訳）、`keywords`（英語）、`url` と `tag`（日本語版と同じ）。
   - `docs.json` の `en` の、同じ `Blog › YYYY/MM` のグループに、ページを追加する。
   - `en/blog/index.mdx` に、同じ `Update` ブロックを追加する。タイトルとタグだけ英訳し、日付・画像・リンクは同じにする。
   - タグの英訳: `AI` / `Notion` / `GAS` / `Google Workspace` / `SaaS management` / `ID` / `Security` / `Corporate IT`（情シス）/ `Management`（マネジメント）/ `Essay`（エッセイ）/ `Front-end`（フロントエンド）/ `Retrospective`（振り返り）

## トピックのタグ

表記ゆれがあるとフィルターが別のタグに分かれるので、次の表記を使う。1記事に複数付けてよい（年ごとの振り返りは、`エッセイ` と `振り返り` の両方）。
一覧にないトピックが必要になったら、勝手に足さず、先に相談する。
一覧のどれにも合わない記事（今は STORES の PX アドベントカレンダーの告知と、Google Cloud API・Postman・Jsonnet・GitHub のトピックなど、2016〜2017年の Qiita の記事5件）は、`tags` を付けず、`Update` の `tags` 属性を省略している。

`AI` / `Notion` / `GAS` / `Google Workspace` / `SaaS管理` / `ID` / `セキュリティ` / `情シス` / `マネジメント` / `エッセイ` / `フロントエンド` / `振り返り`

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
3. `docs.json` の `ja` の、`Speaking › YYYY/MM` というグループ（なければ新しく作る。Blog の月のグループの後ろに、新しい月が上になるよう並べる）に、ページを追加する。
4. 英語版も同じ手順で作る（`en/speaking.mdx`、`en/talks/`、`docs.json` の `en`）。`title` は、イベント名の説明部分を英訳し、会社名やイベント名の英語表記が不確かなものは日本語のままにする。`description` は `Month D, YYYY: <title> (<role>).`。

- `tags` は**役割**だけで、1エントリに1つ。Blog のトピックのタグは使わない（フィルターの軸が別）。
  - `登壇`（通常の登壇、ゲスト、パネルなど）/ `基調講演`（キーセッションを含む）/ `LT` / `ファシリテーター` / `外部講師` / `メディア` / `スライド`
  - 英語版は `Talk` / `Keynote` / `Lightning talk` / `Facilitator` / `Guest lecturer` / `Media` / `Slides`
- `スライド` は、Speaker Deck の資料を、1件1エントリで載せるときのタグ。日付は Speaker Deck の公開日、タイトルは資料のタイトル、リンクの文言（`cta`）は `Speaker Deck`。登壇のエントリに、資料のリンクを足す形にはしない。
- 登壇の「予定」は、専用のタグを作らず、そのまま `登壇` として足す。あわせて、ホームの「登壇予定」（`UpcomingTalks`）にも足す。

## ホームの「登壇予定」「最近書いたブログ」

`ja/index.mdx` と `en/index.mdx` の先頭に、登壇予定と、最近書いたブログ4件を、この順に、セクションを縦に並べて載せている（自動では更新されない）。
どちらも、部品（`snippets/*.jsx`）ではなく、MDX に HTML を直接書いている。`.jsx` の部品は、ブラウザでスクリプトが動いてから描画されるため、画像が最初の HTML に入らず、LCP が悪化した（Lighthouse）。HTML の画像には、`width`・`height` を付けて、読み込み時のレイアウトのずれ（CLS）を防いでいる。

- 最近書いたブログ: 4件を、2列の画像付きカード（`<a>` と `<img>`）で載せる。Blog のエントリを足したら、新しい順の上位4件になるよう、`<a>` を差し替える。`href`・`img`・タイトルは、一覧（`blog/index.mdx`）の Card と同じ。日付と掲載元は `YYYY/MM/DD`・`note` のように、下に書く。画像は `loading="lazy"`。
- 登壇予定: `<div data-upcoming-talks>` の中に、`<a data-talk-date="YYYY/MM/DD">` のカードを並べる。ルートの `upcoming-talks.js`（全ページに読み込まれる）が、サイトを開いた日より前の `data-talk-date` のカードを隠し、1件も残らなければ、`data-upcoming-empty` の「現在、公開している登壇予定はありません。」を出す。サイトは静的なので、再ビルドしなくても、開催日が過ぎたカードは、自動で消える（日付単位。当日は表示）。新しい登壇の予定が決まったら、Speaking の一覧に足すのと一緒に、ここにも `<a>` を足す。過ぎたものは、消さなくてもよいが、溜まったら消す。先頭のカードの画像だけ `fetchPriority="high"`（LCP の画像）。
- 見出しは、右側の目次に出すため `##` にしている。日本語版は日本語（登壇予定 / 最近書いたブログ / 数字で見る / スキル / 経歴 / お仕事のご依頼）、英語版は英語（Upcoming talks / Recent posts / By the numbers / Skills / Career / Work with me）。
- SNS のリンクは、`docs.json` の `navbar.links`（ヘッダー右上）に置いている。アバター（`images/avatar.png`）は、ファビコンと、ヘッダーのロゴ（`images/logo-light.svg` と `images/logo-dark.svg`。アバターと「howdy39.dev」の文字を、パスにして1枚にした SVG）に使っている。ロゴを作り直すときは、アバターを80px ほどにして埋め込み、Inter Bold の文字をパスにする。

## ホームの「数字で見る」「スキル」

最近書いたブログの下、経歴の上に、2つのセクションを置いている。ほかのカードと同じ、枠線と角丸の落ち着いた見た目にする（ターミナル風の飾り、等幅フォント、発光などは、「ダサい」と言われたので使わない）。MDX に HTML を直接書いていて（JS なし。サーバー側で描画される）、`style.css` は使わない。日本語版と英語版の両方にある。

- 数字で見る: 大きな数字の4枚（記事 160+、登壇 15+、社内登壇 50+、経歴 19年）と、トピック別の記事数（横棒）。年別の記事数のグラフは、要らないと言われたので載せない。数字は、サイトの一覧と経歴から数えた値で、切り上げて「+」を付けている。
  - 記事: `blog/index.mdx` の `Update` の数。トピック別は、同じ一覧のタグから数える（トピックは複数付くので、合計は記事数を超える）。
  - 登壇: Speaking の、`登壇`・`基調講演`・`LT`・`ファシリテーター`・`外部講師` のうち、開催済みのもの（`メディア`・`スライド` は数えない）。
  - 社内登壇 50+ は、経歴の記事（GAS 研修の記事）に書いた事実。経歴の19年は、2007年4月から。
  - 記事や登壇が増えたら、ときどき数え直す。
- スキル: 経歴の表の「技術」と、導入した SaaS、記事に出てくる技術だけを、分野ごとのチップで並べる。根拠のない技術は足さない。
- メディア掲載・インタビューは、ホームには載せない（要らないと言われた）。Speaking の `メディア` と、Blog の `STORES note` に載せている。

## Books（同人誌）のページ

`ja/books.mdx` と `en/books.mdx`（サイドバーの「Books」）に、サークル「Tech The Toaster」の電子書籍4冊（すべて無料。ショップ: https://techthetoaster.stores.jp/ ）を、表紙付きのカードで載せている。ホームには載せない（重要度が高くないため、Blog や Speaking と同じ、独立したメニューにした）。
画像はショップの URL（`imagedelivery.net`、`fit=scale-down,w=460` で、元の比率の 460×650）で、`width`・`height` を付けている。`fit=cover` で切り抜くと、表紙の上下が切れる。書籍が増えたら、カードを足す（日本語版と英語版の両方）。

## Videos（YouTube に出演した動画）のページ

`ja/videos.mdx` と `en/videos.mdx`（サイドバーの「Videos」）に、YouTube に出演した動画を、サムネイル付きのカードで、新しい順に載せている。サムネイルは `https://i.ytimg.com/vi/<動画ID>/maxresdefault.jpg`（1280×720）で、`width`・`height` と `loading="lazy"` を付けている。リンクは `https://www.youtube.com/watch?v=<動画ID>` だけにして、`&t=` や `&pp=` などの追跡用のパラメータは付けない。
カードの2行目はチャンネル名、3行目は公開日（日本時間）と再生時間。動画のタイトル・チャンネル・公開日・長さは、`https://www.youtube.com/oembed?url=…&format=json` や、動画のページの `og:title`・`uploadDate` で調べられる。動画が増えたら、カードを足す（日本語版と英語版の両方。英語版はタイトルを英訳する）。

## SEO（OGP 画像・構造化データ）

- **OGP 画像**: `images/ogp.jpg`（1200×630。アバター、名前、肩書き、ドメイン）を、`docs.json` の `seo.metatags`（`og:image`・`twitter:image`）で、全ページに設定している。これを設定しないと、Mintlify が自動で作る画像の URL（`mintlify.app`）が、OGP に出る。肩書きなどを変えたら、画像を作り直す（HTML をヘッドレス Chrome でスクリーンショットし、`sips` で JPEG にした）。
- **Person の構造化データ**: ホーム（`ja/index.mdx`・`en/index.mdx`）の先頭に、`<script type="application/ld+json">` で、Person（名前、別名、肩書き、所属、`knowsAbout`、`sameAs`）を書いている。`dangerouslySetInnerHTML` は、中身が空になるので使わず、JSON を、テンプレートリテラルの子要素として書く。肩書き・所属・SNS が変わったら、ここも直す。Mintlify が自動で入れる Organization / WebSite の構造化データは、消せない。

## 経歴の「主な取り組み」

ホームの経歴の表（`ja/index.mdx`・`en/index.mdx`）の下に、会社ごとの `<Accordion>`（折りたたみ）で、担当と成果を書いている。サイトの目的は「名刺代わりに、実績と発信を1か所にまとめる」ことで、売り込み（料金プランなど）は重視しない（副業は主ではない）。

- 書くのは、すでに記事や登壇に書いた事実だけ。根拠の記事があるものは、その記事へのリンクを付ける。
- 新しい記事や登壇が、経歴の実績になるときは、該当の会社の `<Accordion>` に、1行足す。日本語版と英語版の両方。
- 役割が変わったときは、表の行と `<Accordion>` の `title` の両方を直す。

## 注意
- Blog と Speaking の一覧ページ（`ja/blog/index.mdx`・`en/blog/index.mdx`・`ja/speaking.mdx`・`en/speaking.mdx`）は、フロントマターに `searchable: false` を付けている。`Update` の日付（`label`）が、見出しと同じ扱いで、サイト内検索に「2026/04/29」のような結果として出てしまうため。このページは、サイトマップ・Google の索引・`llms.txt` には、そのまま入る。個別の記事のページは、これまでどおり検索に出る。

- `style.css` は次の5つのためのもの。Mintlify の DOM（`.update`、`#content`、`#navigation-items`）に頼っているので、Mintlify の更新で崩れる可能性がある。
  - サイドバーの「Blog › …」「Speaking › …」グループ（`#navigation-items > div`）を隠す。
  - `Update` を並べたページ（Blog、Speaking）を2カラムにする。
  - 外部リンクの Card は右上に矢印が付くので、タイトルが矢印に重ならないよう、タイトルの右に余白を足す（`a:has(> div.absolute) h2`）。
  - 2カラムにした `Update`（Blog、Speaking）で、日付の枠とタグの縦の位置をそろえる（タグの入れ物の上の余白を消す）。
  - ホームの経歴の表で、「役割」の列を1行に収め（`white-space: nowrap`、768px 以上）、残りの幅を「技術」の列に回す。
- 公開後の `/llms.txt` は CDN にキャッシュされる。最新の中身を見たいときは `/llms.txt?nocache=1` のようにクエリを付ける。
