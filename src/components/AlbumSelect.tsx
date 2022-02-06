import AsyncSelect from 'react-select/async';
import { debounce } from 'lodash';

import { searchAlbum } from '../utils/album';
import { DEBOUNCE_MS } from '../constants';
import { Album } from '../types';
import { Loader } from '.';

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    width: '200px',
    fontFamily: "'IBM Plex Mono', monospace",
    border: '1px solid black',
    textTransform: 'uppercase'
  }),
  option: (provided: any) => ({
    ...provided,
    fontFamily: "'IBM Plex Mono', monospace",
    textTransform: 'uppercase',
    width: '200px'
  }),
  noOptionsMessage: (provided: any) => ({
    ...provided,
    fontFamily: "'IBM Plex Mono', monospace",
    textTransform: 'uppercase'
  }),
  loadingMessage: (provided: any) => ({
    ...provided,
    fontFamily: "'IBM Plex Mono', monospace",
    textTransform: 'uppercase'
  })
};

interface AlbumSelectProps {
  albums: Array<Album>;
  setSelectedAlbum: Function;
  setAlbums: Function;
}

export const AlbumSelect = ({ albums, setSelectedAlbum, setAlbums }: AlbumSelectProps) => {
  const _loadSuggestions = async (query: string, callback: Function) => {
    const albumRes = await searchAlbum(query);
    setAlbums(albumRes);

    const options = albumRes.map(({ id, name, artists }) => ({
      value: id,
      label: `${name} - ${artists[0].name}`
    }));

    callback(options);
  };

  const loadSuggestions = debounce(_loadSuggestions, DEBOUNCE_MS);

  return (
    <AsyncSelect
      isClearable
      loadOptions={loadSuggestions}
      cacheOptions
      placeholder="Search..."
      styles={customStyles}
      components={{ LoadingIndicator: Loader }}
      onChange={(option: any) => {
        if (option) {
          const match = albums.find((a) => a.id === option.value);
          if (match) {
            setSelectedAlbum(match);
          }
        }
      }}
    />
  );
};
