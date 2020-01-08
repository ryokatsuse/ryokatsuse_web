---
title: Gatsby.jsでブログ開設してみた。
date: "2019-12-11"
---

Gatsby.jsでブログを公開してみた。環境構築から、デプロイまで説明している記事が結構あるのでお世話になりつつ構築してみた。

### 構築
構築は簡単だった。とりあえず以下コマンドラインでローカル環境が起動する。
今回はgatsby-starter-blogというブログテンプレートを使って構築した。

```
$ npm install -g gatsby
$ gatsby new blog https://github.com/gatsbyjs/gatsby-starter-blog
$ cd blog
$ gatsby develop
```

※```new blog```のblogの部分は任意の名前で。


### CSS
gatsby.jsでは直接cssが記述されているため、今回は慣れているscss形式に変更してレイアウト調整を行った。

npmで以下をインストール
```
$ npm install --save node-sass gatsby-plugin-sass

```

gatsby-config.jsに以下インストールしたプラグインを追加する。

```
module.exports = {
  plugins: [`gatsby-plugin-sass`]
}
```

srcの任意のフォルダにscssファイルを作成する、当ブログは```src/styles/global.scss```に作成している。

その後、gatsby-browser.jsに以下をinportさせる。

```
import "./src/styles/global.scss"

```

今後は、CSS-Modulesなども勉強したいので移行を考えている。

 ### ダークモード対応
 流行りなので対応してみた。

 prefers-color-schemeを使ってMedia Queryをdarkに設定してあげるとダークモードのcssを指定することができる。

 ```
@media (prefers-color-scheme: dark) {
  :root {
   ・・・
  }
}

 ```

### 全体のレイアウト
とりあえずざっくりcssを当てているので品質は良くない。これから細かい部分の改修をしていく予定。

### デプロイ

<a href="https://qiita.com/NaokiIshimura/items/64e060ccc244e38d0c15" target="_blank">Netlify</a>で行っている。基本的には新規でアカウントを作ってポチポチ画面に沿っていけば環境は出来上がる。

以下記事を参照いただきたい。

<a href="https://qiita.com/NaokiIshimura/items/64e060ccc244e38d0c15" target="_blank">https://qiita.com/NaokiIshimura/items/64e060ccc244e38d0c15</a>

デプロイは、masterブランチにpushされたらNetlifyに、自動デプロイが行われる。今後は、Github Actionsなどを使ってテストとか導入したい。

### このブログはなに？

このブログでは自分の技術的な取り組みとか、映画のこととか、音楽とか色々書いていく予定。

また本ブログも日々拡張していく予定.

- TypeScriptへの移行
- CSSをリファクタリング
- TwitterとかSNS連携系の拡張
- 検索機能とか？





