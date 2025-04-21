// レポート更新スクリプト
const fs = require('fs').promises;
const path = require('path');
const { runContrastTest } = require('./contrast-test');

async function updateReport() {
  try {
    console.log('カラーコントラストテストを実行中...');
    const testResults = await runContrastTest();

    console.log('アクセシビリティレポートを更新中...');

    // レポートファイルの読み込み
    const reportPath = path.join(__dirname, 'accessibility-report.md');
    let reportContent = await fs.readFile(reportPath, 'utf8');

    // カラーコントラスト項目を検索
    const contrastSection = '### 3. カラーコントラスト (WCAG 1.4.3 コントラスト)';
    const contrastSectionIndex = reportContent.indexOf(contrastSection);

    if (contrastSectionIndex === -1) {
      console.error('カラーコントラスト項目がレポートに見つかりませんでした。');
      return;
    }

    // 次の項目を検索して、その間の内容を更新する
    const nextSectionIndex = reportContent.indexOf('### 4.', contrastSectionIndex);

    if (nextSectionIndex === -1) {
      console.error('レポート構造が想定と異なります。');
      return;
    }

    // 更新する内容を作成
    let updatedContent = '';

    if (testResults.homepage.totalIssues === 0 && testResults.blogpage.totalIssues === 0) {
      updatedContent = `${contrastSection}
- カラーコントラストの自動チェックを実行した結果、コントラスト比の問題は検出されませんでした。ホームページとブログページの両方で、テキストと背景のコントラスト比はWCAG 2.2レベルAAの基準（4.5:1以上）を満たしています。

`;
    } else {
      updatedContent = `${contrastSection}
- カラーコントラストの自動チェックを実行した結果、以下の問題が検出されました：

`;

      // ホームページの問題
      if (testResults.homepage.totalIssues > 0) {
        updatedContent += `  **ホームページ（${testResults.homepage.totalIssues}件）**:\n`;

        testResults.homepage.details.forEach((issue, index) => {
          updatedContent += `  - 問題${index + 1}: ${issue.help}\n`;
          updatedContent += `    - 影響度: ${issue.impact}\n`;

          // 最初の2つの問題のみ詳細を表示
          const nodesToShow = issue.nodes.slice(0, 2);
          nodesToShow.forEach((node, nodeIndex) => {
            updatedContent += `    - 該当要素例: \`${node.html.replace(/\n/g, ' ').substring(0, 100)}${node.html.length > 100 ? '...' : ''}\`\n`;
          });

          if (issue.nodes.length > 2) {
            updatedContent += `    - 他 ${issue.nodes.length - 2} 箇所も同様の問題があります\n`;
          }
        });

        updatedContent += '\n';
      }

      // ブログページの問題
      if (testResults.blogpage.totalIssues > 0) {
        updatedContent += `  **ブログページ（${testResults.blogpage.totalIssues}件）**:\n`;

        testResults.blogpage.details.forEach((issue, index) => {
          updatedContent += `  - 問題${index + 1}: ${issue.help}\n`;
          updatedContent += `    - 影響度: ${issue.impact}\n`;

          // 最初の2つの問題のみ詳細を表示
          const nodesToShow = issue.nodes.slice(0, 2);
          nodesToShow.forEach((node, nodeIndex) => {
            updatedContent += `    - 該当要素例: \`${node.html.replace(/\n/g, ' ').substring(0, 100)}${node.html.length > 100 ? '...' : ''}\`\n`;
          });

          if (issue.nodes.length > 2) {
            updatedContent += `    - 他 ${issue.nodes.length - 2} 箇所も同様の問題があります\n`;
          }
        });

        updatedContent += '\n';
      }
    }

    // レポートを更新
    const beforeSection = reportContent.substring(0, contrastSectionIndex);
    const afterSection = reportContent.substring(nextSectionIndex);

    const newReportContent = beforeSection + updatedContent + afterSection;

    // 更新したレポートを保存
    await fs.writeFile(reportPath, newReportContent, 'utf8');

    console.log('アクセシビリティレポートを更新しました。');
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

// スクリプトを実行
updateReport();
