import axios from 'axios';

require('dotenv').config();

export default async function handler(req: any, res: any) {
  const tokenRes = await axios.get(`${process.env.API_URL}/api/getToken`);
  const token = tokenRes.data;

  const { q } = req.query;

  const params = new URLSearchParams([
    ['type', 'album'],
    ['q', q],
    ['limit', '5']
  ]);
  try {
    const albumSearchReq = await axios.get('https://api.spotify.com/v1/search', {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    res.setHeader('Cache-Control', 's-maxage=1800');
    res.status(200).json(albumSearchReq.data.albums.items);
  } catch (e) {
    console.log(e);
  }
}
