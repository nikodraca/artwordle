import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image as KImage } from 'react-konva';
import { chunk, fill, debounce, last } from 'lodash';
import { Textfit } from 'react-textfit';

import { Container, Sidebar, SidebarHeader, StyledSelect, Results } from '../components';
import { closestEmoji, getColor, colorThief } from '../utils/color';
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
  const [palette, setPalette] = useState<Array<Array<number>>>([]);
  const [isFirstRequest, setIsFirstRequest] = useState(true);

  const refsLookup = useRef({});

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

        const bgColor = colorThief.getPalette(image, 3);
        setPalette(bgColor);
      };

      image.setAttribute('crossOrigin', 'anonymous');
      image.src = last(selectedAlbum.images)?.url || '#';
    }
  }, [selectedAlbum]);

  const getResults = async () => {
    if (image) {
      console.log('DRAW');

      setIsLoading(true);
      let allUrls: string[] = [];

      for (const refArray of chunk(Object.values(refsLookup.current), GRID_SIZE)) {
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

      if (isFirstRequest) {
        setIsFirstRequest(false);
      }
    }
  };

  useEffect(() => {
    getResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, isFirstRequest]);

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

        {isLoading ? (
          'Loading'
        ) : (
          <StyledSelect
            isClearable
            loadOptions={loadSuggestions}
            cacheOptions
            placeholder="Search for album..."
            onChange={(option: any) => {
              if (option) {
                const match = albums.find((a) => a.id === option.value);
                if (match) {
                  setSelectedAlbum(match);
                }
              }
            }}
          />
        )}

        {textResponse && !isLoading && <Results textResponse={textResponse} />}
      </Sidebar>

      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 1,
          background: `rgb(${palette[0]}) linear-gradient(90deg, rgba(${palette[0]},1) 0%, rgba(${palette[1]},1) 50%, rgba(${palette[2]},1) 100%)`
        }}
      ></div>

      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {res.map((refArray, x) =>
            refArray.map((r, y) => (
              <KImage
                key={`${x}_${y}`}
                ref={(el) => {
                  (refsLookup.current as any)[`${x}:${y}`] = el;
                }}
                image={image}
                width={window.innerWidth / GRID_SIZE}
                height={window.innerHeight / GRID_SIZE}
                x={x * (window.innerWidth / GRID_SIZE)}
                y={y * (window.innerHeight / GRID_SIZE)}
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
