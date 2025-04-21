// カラーコントラスト分析用のPlaywrightスクリプト
const { chromium } = require('playwright');

async function runContrastTest() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('カラーコントラスト分析を開始します...');

  // サイトにアクセス
  await page.goto('http://localhost:4322/');

  // axe-coreをページに注入して実行
  const axeResults = await page.evaluate(async () => {
    // axe-coreをCDNから読み込む
    await new Promise(resolve => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.0/axe.min.js';
      script.onload = resolve;
      document.head.appendChild(script);
    });

    // axe-coreを実行してアクセシビリティ評価
    return await window.axe.run();
  });

  // コントラスト関連の問題を抽出
  const contrastIssues = axeResults.violations.filter(v => v.id === 'color-contrast');

  console.log('カラーコントラスト問題の検出数:', contrastIssues.length);

  // 詳細情報を出力
  if (contrastIssues.length > 0) {
    console.log('検出されたカラーコントラスト問題:');
    contrastIssues.forEach((issue, index) => {
      console.log(`問題 ${index + 1}:`);
      console.log(`- 説明: ${issue.help}`);
      console.log(`- 影響度: ${issue.impact}`);
      console.log('- 該当要素:');

      issue.nodes.forEach((node, nodeIndex) => {
        console.log(`  要素 ${nodeIndex + 1}: ${node.html}`);
        console.log(`  問題箇所: ${node.failureSummary}`);
      });
    });
  } else {
    console.log('カラーコントラスト問題は検出されませんでした。');
  }

  // ブログページの確認も行う
  await page.goto('http://localhost:4322/blog');

  // axe-coreをページに注入して実行（ブログページ）
  const blogAxeResults = await page.evaluate(async () => {
    // axe-coreが既に読み込まれていることを確認
    if (typeof window.axe === 'undefined') {
      await new Promise(resolve => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.0/axe.min.js';
        script.onload = resolve;
        document.head.appendChild(script);
      });
    }

    // axe-coreを実行
    return await window.axe.run();
  });

  // ブログページのコントラスト関連の問題を抽出
  const blogContrastIssues = blogAxeResults.violations.filter(v => v.id === 'color-contrast');

  console.log('\nブログページのカラーコントラスト問題の検出数:', blogContrastIssues.length);

  // ブログページの詳細情報を出力
  if (blogContrastIssues.length > 0) {
    console.log('ブログページで検出されたカラーコントラスト問題:');
    blogContrastIssues.forEach((issue, index) => {
      console.log(`問題 ${index + 1}:`);
      console.log(`- 説明: ${issue.help}`);
      console.log(`- 影響度: ${issue.impact}`);
      console.log('- 該当要素:');

      issue.nodes.forEach((node, nodeIndex) => {
        console.log(`  要素 ${nodeIndex + 1}: ${node.html}`);
        console.log(`  問題箇所: ${node.failureSummary}`);
      });
    });
  } else {
    console.log('ブログページでカラーコントラスト問題は検出されませんでした。');
  }

  // 結果をオブジェクトとして返す（レポート追記用）
  const result = {
    homepage: {
      totalIssues: contrastIssues.length,
      details: contrastIssues,
    },
    blogpage: {
      totalIssues: blogContrastIssues.length,
      details: blogContrastIssues,
    },
  };

  await browser.close();
  return result;
}

// スクリプトを直接実行する場合
if (require.main === module) {
  runContrastTest()
    .then(result => {
      console.log('カラーコントラスト分析が完了しました。');
    })
    .catch(err => {
      console.error('分析中にエラーが発生しました:', err);
    });
}

module.exports = { runContrastTest };
