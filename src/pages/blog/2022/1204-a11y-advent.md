---
layout: "../../../layouts/BlogPost.astro"
title: Trusted Testerに取り組んだ話
publishDate: "2022-12-04"
---

この記事は [アクセシビリティ Advent Calendar 2022](https://adventar.org/calendars/7377) の4日目の記事です。

> ※本当は、この記事を公開するまでに認定試験に合格したかったのですが、時間が間に合わずまだ最後の試験を残したままです！合格して認定証が発行されたら改めてご報告したいと思います。

最近ウェブアクセシビリティを本気で学び始めたアラサーマークアップエンジニアです。

アクセシビリティを学ぼうと思った時に、何か資格みたいなのはないのかなと思い色々調べてみました。日本だと[アクセシビリティ検査技術者検定](https://icc.infocreate.co.jp/icc/itiran/kentei.html)と[ICTアクセシビリティアドバイザー認定資格](https://aaict.jp/)という2つがあるのを知りました。

どちらも内容的に、ウェブアクセシビリティを学べそうでこれでもいいかなと思ったのですが、ミツエーリンクスさんの以下の記事を拝見して[Trusted Tester](https://training.section508testing.net/)を知りました。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://www.mitsue.co.jp/knowledge/blog/a11y/202012/13_0900.html" data-iframely-url="//iframely.net/8shBuNh?card=small"></a></div></div>

無料かつ体系的に学べそう！と感じたので、Trusted Testerにチャレンジすることを決めて取り組んでみました。（ミツエーリンクスさんの記事と重複する内容もあります）

## Trusted Testerとは

[米国リハビリテーション508条](https://www.access-board.gov/ict/)（Section 508）のウェブアクセシビリティ要件に適合しているかを評価するためのプロセスです。WCAGとは異なる評価方法になっています。

## Trusted Testerの進め方

内容としては、以下のような順番で進めていく構成になっています。

- Section 508がなぜ重要なのか
- Section 508のWeb基準を学ぶ
- Trusted Testerで使用するツールの説明
  - テストで使う支援ツールの使い方を学ぶ
- Trusted Testerのトレーニング
  - テスト項目の説明とテストの演習
- 模擬試験
  - 認証試験前の模擬試験
- 認証試験
  - 合格すると認定証が発行される

模擬試験と認証試験以外は、章ごとに簡単な理解度テストがあります。

## Trusted Testerのトレーニング

先程の5つの中で「Trusted Testerのトレーニング」がTrusted Testerのテスト項目を確認しながらチェックしていくという内容です。章ごとの理解度テストの後に、実際のページを見ながら適合しているかどうかを確認するテストもあります。ちなみにこのトレーニングを全部受講完了できる目安の時間は60〜80時間です。自分も正確には図っていないですが、80時間近く掛かっていると思います。

Trusted Testerでは、予め決められた20個の項目があります。1項目の中には複数のテストプロセスが存在するものもあれば、1つだけのものもあります。特に「5: Forms」の項目は、フォーム周りのテストということもあり考慮する点が多いことから、テストする項目も多めです。

テスト基準を確認するために使われるツールとして[ANDI](https://www.ssa.gov/accessibility/andi/help/install.html)があります。ANDIを使うことでHTML、CSSなどのソースコードを、直接確認することなくテストを行うことができます。

例えば、「13: Sensory Characteristics and Contrast」という項目ではコントラスト比のチェックを行うのですが、ANDIを使って自分のサイトで試すと以下のような表示になります。（このテストは、WCAGで言うと[WCAG SC 1.4.3 Contrast (minimum) ](https://waic.jp/docs/WCAG21/Understanding/contrast-minimum.html)に該当します。）

![ANDIの使い方](/images/20221204.png)

この項目のテスト基準は、以下のようになっています。

> If any of the following is TRUE, then the Test Condition is TRUE and the content PASSES:
>   1. The contrast between the text and its background is equal to or greater than the minimum required contrast ratio identified in the ANDI Contrast Ratio output, OR
>   2. If the text is an image of text, the contrast between the image of text and its background is equal to or greater than 4.5:1 as identified using the Colour Contrast Analyser.

上記の通り、テスト基準をチェックしていきます。今回の場合は、1でANDIに表示されている「Contrast Ratio」が「PASS」となっており、コンストラクト比の基準を満たしているため「***PASS***（合格）」です。

このようにテスト結果に問題なければ、「***PASS***（合格）」となります。問題がある場合は、「***FAIL***（不合格）」としてチェックします。テストが基準対象外だったものに関しては、「***DNA***」としてチェックします。例えば「5: Forms」というフォーム要素に関するテスト基準がありますが、テストするページ内にフォーム要素がない場合などは、このテスト基準は「DNA」としてチェックします。

## やってみてどうだったか

認定試験をまだ残していますが、取り組んだ前と後でアクセシビリティについて少し自信がついたなと感じました。先程も紹介した実際のページを開いてテストしていくプロセスが、自分の中でとてもいい経験になりました。プログラミングと一緒で手を動かしながら理解していくのが、一番理解が深まることを改めて感じました。（QAエンジニアのスキルも挙がった気がします。）

Trusted Testerは英語ですが、DeepL様の力を借りることで理解はできると思います。本来であれば、原文で取り組んだ方が良いとは思うのですが、自分は英語が圧倒的にできませんので翻訳に頼りました。

無料のコンテンツですが、他にも[MDNのアクセシビリティ](https://developer.mozilla.org/ja/docs/Learn/Accessibility)や、最近では、Googleからも[Learn Accessibility](https://web.dev/learn/accessibility/)が登場したりとコンテンツが充実してきている印象なので、このあたりも時間があれば取り組みたいと思います。

少し自信が付いたことで、普段の業務でも生かせる所は生かしていきたいと思いました。普段デザインを確認すると「自分だったらこうマークアップする」というのがありますが、ここにアクセシビリティの観点を加えていきたいです。WCAG2.1の仕様を、以前社内で開催された輪読会を通して「A、AA」までは読んだのですが、ほとんど忘れているのでこれを機にまた改めて復習しつつ、WAI-AREAの正しい設定ができるように普段のコーディングから意識していきたいと思います。
