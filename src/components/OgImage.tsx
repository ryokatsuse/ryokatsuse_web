import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { SITE_TITLE } from '../config';

const fontFamily = 'IBM Plex Sans JP';

export async function getOgImage(text: string) {
  const fontNormal = await fetchFont(SITE_TITLE, fontFamily, 400);
  const fontBold = await fetchFont(text, fontFamily, 700);

  const svg = await satori(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        padding: '26px',
        fontFamily: `"${fontFamily}", sans-serif`,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          borderRadius: '8px',
          padding: '12px 22px',
          color: '#fff',
          backgroundColor: '#363333',
        }}
      >
        <div style={{ flexGrow: '1', textOverflow: 'ellipsis', fontSize: '46px', fontWeight: 700 }}>{text}</div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '64px',
            width: '100%',
            fontSize: '24px',
          }}
        >
          <span>{SITE_TITLE}</span>
        </div>
      </div>
    </div>,
    {
      width: 800,
      height: 400,
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
  const resvg = new Resvg(svg);

  return resvg.render().asPng();
}

async function fetchFont(text: string, font: string, weight: number): Promise<ArrayBuffer> {
  const API = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`;

  const response = await fetch(API, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
    },
  });

  const css = await response.text();
  const match = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (!match || !match[1]) {
    throw new Error('Failed to fetch font');
  }

  const fontResponse = await fetch(match[1]);
  return fontResponse.arrayBuffer();
}
