import axios from 'axios';

require('dotenv').config();

const getToken = async () => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

  const authReq = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        Authorization:
          'Basic ' + new Buffer(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );

  return authReq.data.access_token;
};

export default async function handler(req: any, res: any) {
  const token = await getToken();

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

    res.status(200).json(albumSearchReq.data.albums.items);
  } catch (e) {
    console.log(e);
  }
}
