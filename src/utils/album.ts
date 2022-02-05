import axios from 'axios';
import { Album } from '../types';

export const searchAlbum = async (q: string): Promise<Array<Album>> => {
  const params = new URLSearchParams([['q', q]]);

  const res = await axios.get('/api/searchAlbum', { params });
  return res.data.slice(0, 5);
};

export const formatResponseToText = (res: Array<Array<string>>, selectedAlbum?: Album) => {
  if (!selectedAlbum) {
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
