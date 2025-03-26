import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { SITE_TITLE } from '../config';
import fs from 'node:fs/promises';
import path from 'node:path';

const fontFamily = 'IBM Plex Sans JP';

// アバター画像のパス
const AVATAR_PATH = path.join(process.cwd(), 'public', 'images', 'ryokatsu.jpg');

// 画像ファイルをBase64エンコードして読み込む関数
async function loadImageAsBase64(filePath: string): Promise<string> {
  try {
    const imageBuffer = await fs.readFile(filePath);
    const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
    return base64Image;
  } catch (error) {
    console.error(`画像ファイル読み込みエラー (${filePath}):`, error);
    // エラー時は代替URLを返す
    return 'https://ui-avatars.com/api/?name=R+K&size=200&background=363333&color=fff&bold=true';
  }
}

export async function getOgImage(text: string) {
  try {
    console.log(`OGP画像生成開始: "${text}"`);

    const fontNormal = await fetchFont(SITE_TITLE, fontFamily, 400);
    const fontBold = await fetchFont(text, fontFamily, 700);

    // アバター画像をBase64形式で読み込み
    const avatarImageBase64 = await loadImageAsBase64(AVATAR_PATH);
    console.log('アバター画像読み込み完了');

    console.log('フォント取得完了');

    // SVG生成
    const svg = await satori(
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#363333', // 白いボーダーを削除するために背景色をボーダーと同じ色に設定
          color: '#fff',
          fontFamily: `"${fontFamily}", sans-serif`,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '60px',
            width: '100%',
            height: '100%',
          }}
        >
          {/* メインのタイトル */}
          <div
            style={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              width: '100%',
              fontSize: '56px',
              fontWeight: 700,
              lineHeight: 1.4,
            }}
          >
            {text}
          </div>

          {/* フッター部分 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: '30px',
            }}
          >
            {/* アバター画像（左側） - Base64エンコードされた画像を使用 */}
            <img
              src={avatarImageBase64}
              width={80}
              height={80}
              style={{
                borderRadius: '50%', // 丸い形に
                marginRight: '20px',
              }}
            />

            {/* サイトタイトル（右側） */}
            <div
              style={{
                fontSize: '32px',
                fontWeight: 400,
              }}
            >
              {SITE_TITLE}
            </div>
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: fontFamily,
            data: fontNormal,
            weight: 400,
            style: 'normal',
          },
          {
            name: fontFamily,
            data: fontBold,
            weight: 700,
            style: 'normal',
          },
        ],
      },
    );

    console.log('SVG生成完了');

    const resvg = new Resvg(svg, {
      fitTo: {
        mode: 'width',
        value: 1200,
      },
    });

    const pngBuffer = resvg.render().asPng();
    console.log(`PNG生成完了: ${pngBuffer.byteLength} バイト`);

    return pngBuffer;
  } catch (error) {
    console.error('OGP画像生成エラー:', error);
    throw error;
  }
}

async function fetchFont(text: string, font: string, weight: number): Promise<ArrayBuffer> {
  try {
    console.log(`フォント取得開始: "${font}", weight: ${weight}`);

    const API = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@${weight}&text=${encodeURIComponent(text)}`;

    const response = await fetch(API, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    });

    if (!response.ok) {
      throw new Error(`フォントCSS取得エラー: ${response.status} ${response.statusText}`);
    }

    const css = await response.text();
    console.log(`CSS取得: ${css.length} 文字`);

    const match = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

    if (!match || !match[1]) {
      throw new Error('フォントURLの抽出に失敗しました');
    }

    const fontUrl = match[1];
    console.log(`フォントURL: ${fontUrl.substring(0, 50)}...`);

    const fontResponse = await fetch(fontUrl);

    if (!fontResponse.ok) {
      throw new Error(`フォントファイル取得エラー: ${fontResponse.status} ${fontResponse.statusText}`);
    }

    const fontBuffer = await fontResponse.arrayBuffer();
    console.log(`フォント取得完了: ${fontBuffer.byteLength} バイト`);

    return fontBuffer;
  } catch (error) {
    console.error('フォント取得エラー:', error);
    throw error;
  }
}
