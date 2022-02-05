import { RGB } from 'konva/lib/types';
import ColorThief from 'colorthief';

const colorThief = new ColorThief();

export const emojis = {
  red: {
    emoji: '🟥',
    rgb: { r: 232, g: 0, b: 0 }
  },
  orange: {
    emoji: '🟧',
    rgb: { r: 255, g: 137, b: 0 }
  },
  yellow: {
    emoji: '🟨',
    rgb: { r: 255, g: 190, b: 0 }
  },
  green: {
    emoji: '🟩',
    rgb: { r: 0, g: 180, b: 0 }
  },
  blue: {
    emoji: '🟦',
    rgb: { r: 0, g: 98, b: 251 }
  },
  purple: {
    emoji: '🟪',
    rgb: { r: 206, g: 48, b: 255 }
  },
  // brown: {
  //   emoji: '🟫',
  //   rgb: { r: 134, g: 73, b: 33 }
  // },
  black: {
    emoji: '⬛️',
    rgb: { r: 6, g: 6, b: 5 }
  },
  white: {
    emoji: '⬜️',
    rgb: { r: 217, g: 217, b: 217 }
  }
};

/**
 * Return proximity between two colours based on RGB values
 * A naive approach but it'll do for now
 */
export const isClose = (color1: RGB, color2: RGB) =>
  Math.abs(color1.r - color2.r) + Math.abs(color1.g - color2.g) + Math.abs(color1.b - color2.b);

export const closestEmoji = (color: RGB): string => {
  let closestColorKey: string | undefined = undefined;
  let score: number | undefined = undefined;

  Object.entries(emojis).forEach(([k, v]) => {
    const possibleScore = isClose(color, v.rgb);
    if (!closestColorKey || !score || possibleScore < score) {
      closestColorKey = k;
      score = possibleScore;
    }
  });

  if (closestColorKey) {
    return emojis[closestColorKey as keyof typeof emojis].emoji;
  }

  return '';
};

export const getColor = (path: string) =>
  new Promise((resolve, reject) => {
    const smImage = new Image();
    smImage.onload = () => {
      const result = colorThief.getColor(smImage, 1);

      resolve({ path, status: 'ok', result });
    };
    smImage.onerror = () => reject({ path, status: 'error' });
    smImage.src = path;
  });
