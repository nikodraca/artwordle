import axios from 'axios'

export default async function handler(req: any, res: any) {
  const { q } = req.query


  const params = new URLSearchParams([['type', 'album'], ['q', q]]);
  const albumSearchReq = await axios.get('https://api.spotify.com/v1/search', {
    params, headers: {
      'Authorization': 'BQDOgM01DbuDhdXGO6k4gkrID5l5neGtzvsCSs3-EAjMmJ2L3huqaa-zIdZ81423PH9nzkbyXQD9qwsHQog',
      'Content-Type': 'application/json'
    }
  })

  console.log(albumSearchReq)

  res.status(200).json({ isAlive: true });
}
