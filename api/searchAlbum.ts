import axios from 'axios';

require('dotenv').config();

export default async function handler(req: any, res: any) {
  const { q } = req.query;

  const params = new URLSearchParams([
    ['type', 'album'],
    ['q', q]
  ]);
  try {
    const albumSearchReq = await axios.get('https://api.spotify.com/v1/search', {
      params,
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json(albumSearchReq.data.albums.items);
  } catch (e) {
    console.log(e);
  }
}
