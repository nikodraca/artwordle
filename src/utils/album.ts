import axios from 'axios'

export const searchAlbum = async (q: string) => {
    const params = new URLSearchParams([['q', q]]);

    const res = await axios.get('/api/searchAlbum', { params })
    console.log(res)
}