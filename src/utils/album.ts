import axios from 'axios';
import { flatten } from 'lodash';
import { Album } from '../types';

export const searchAlbum = async (q: string): Promise<Array<Album>> => {
  const params = new URLSearchParams([['q', q]]);

  const res = await axios.get('/api/searchAlbum', { params, timeout: 5 * 1000 });
  return res.data;
};

export const formatResponseToText = (res: Array<Array<string>>, selectedAlbum?: Album) => {
  const isResult = flatten(res).join('').trim().length > 0;

  if (!selectedAlbum || !isResult) {
    return '';
  }

  let text = `${selectedAlbum?.name} - ${selectedAlbum?.artists[0].name}\n\n`;

  res.forEach((row) => {
    text += row.join(' ');
    text += '\n';
  });

  text += '\n';

  return text;
};
