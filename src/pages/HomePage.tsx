import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image as KImage } from 'react-konva';
import { chunk, fill, debounce, last } from 'lodash';
import { ArrowUpRight } from 'react-feather';
import { Textfit } from 'react-textfit';

import { Container, Sidebar, SidebarHeader, Button, StyledSelect, Results } from '../components';
import { closestEmoji, getColor } from '../utils/color';
import { searchAlbum, formatResponseToText } from '../utils/album';
import { Album } from '../types';
import { DEBOUNCE_MS, GRID_SIZE } from '../constants';

export const HomePage = () => {
  const [image, setImage] = useState<HTMLImageElement>();
  const [imageDimmensions, setImageDimmensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0
  });
  const [res, setRes] = useState(fill(Array(GRID_SIZE), fill(Array(GRID_SIZE), '')));
  const [isLoading, setIsLoading] = useState(false);
  const [albums, setAlbums] = useState<Array<Album>>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album>();

  const refsArray = useRef({});

  useEffect(() => {
    if (selectedAlbum) {
      const image = new Image();
      image.onload = () => {
        setImage(image);
        const { width, height } = image;
        setImageDimmensions({
          width,
          height
        });
      };

      image.setAttribute('crossOrigin', 'anonymous');
      image.src = last(selectedAlbum.images)?.url || '#';
    }
  }, [selectedAlbum]);

  const getResults = async () => {
    if (image) {
      setIsLoading(true);
      let allUrls: string[] = [];

      for (const refArray of chunk(Object.values(refsArray.current), GRID_SIZE)) {
        const urls: string[] = refArray.map((ref: any) => {
          return ref.toDataURL();
        });

        allUrls = [...allUrls, ...urls];
      }

      const x = await Promise.all(allUrls.map(getColor));
      const colors = x.map(({ result }: any) => {
        const [r, g, b] = result;
        return closestEmoji({ r, g, b });
      });
      setRes(chunk(colors, GRID_SIZE));
      setIsLoading(false);
    }
  };

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

  const textResponse = formatResponseToText(res, selectedAlbum);

  return (
    <Container>
      <Sidebar>
        <Textfit>
          <SidebarHeader>Artwordle</SidebarHeader>
        </Textfit>
        <StyledSelect
          isClearable
          loadOptions={loadSuggestions}
          onChange={(option: any) => {
            if (option) {
              const match = albums.find((a) => a.id === option.value);
              if (match) {
                setSelectedAlbum(match);
              }
            }
          }}
        />

        <Button onClick={getResults} disabled={isLoading}>
          {isLoading ? 'Loading' : 'Go'} <ArrowUpRight size={30} />
        </Button>

        {textResponse && <Results textResponse={textResponse} />}
      </Sidebar>

      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {res.map((refArray, x) =>
            refArray.map((r, y) => (
              <KImage
                key={`${x}_${y}`}
                ref={(el) => {
                  (refsArray.current as any)[`${x}:${y}`] = el;
                }}
                image={image}
                width={200}
                height={200}
                x={x * 200}
                y={y * 200}
                crop={{
                  x: x * (imageDimmensions.width / GRID_SIZE),
                  y: y * (imageDimmensions.height / GRID_SIZE),
                  width: imageDimmensions.width / GRID_SIZE,
                  height: imageDimmensions.height / GRID_SIZE
                }}
              />
            ))
          )}
        </Layer>
      </Stage>
    </Container>
  );
};
