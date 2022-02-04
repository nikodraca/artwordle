import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image as KImage } from 'react-konva';
import { chunk, fill } from 'lodash'
import ColorThief from 'colorthief'

import { closestEmoji } from '../utils/color';

export const HomePage = () => {
  const [image, setImage] = useState<HTMLImageElement>();
  const [imageDimmensions, setImageDimmensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 });

  const refsArray = useRef({})

  const [res, setRes] = useState(fill(Array(5), fill(Array(5), "")))

  const colorThief = new ColorThief();

  const handleChangeImage = (evt: any) => {
    const reader = new FileReader();
    const file = evt.target.files[0];

    reader.onload = function (upload) {
      const image = new Image();
      image.onload = () => {
        setImage(image);
        const { width, height } = image;
        setImageDimmensions({
          width,
          height
        })
      };

      image.src = upload.target?.result as string;
    };

    reader.readAsDataURL(file);
  };

  const promiseImage = (path: string) =>
    new Promise((resolve, reject) => {
      const smImage = new Image();
      smImage.onload = () => {
        const result = colorThief.getColor(smImage, 10);

        resolve({ path, status: 'ok', result })
      }
      smImage.onerror = () => reject({ path, status: 'error' })
      smImage.src = path;
    });


  const getResults = async () => {
    let allUrls: string[] = []

    for (const refArray of chunk(Object.values(refsArray.current), 5)) {

      const urls: string[] = refArray.map((ref: any, j: number) => {
        return ref.toDataURL()

      })

      allUrls = [...allUrls, ...urls]

    }

    const x = await Promise.all(allUrls.map(promiseImage))
    const colors = x.map(({ result }: any) => {
      const [r, g, b] = result
      return closestEmoji({ r, g, b })
    })
    setRes(chunk(colors, 5))
  }


  return <>
    <input type="file" name="file" id="file" onChange={handleChangeImage} required accept="image/png, image/jpeg" />

    <Stage
      width={window.innerWidth / 1.5}
      height={window.innerHeight / 1.5}
    >
      <Layer>
        {res.map((refArray, x) => refArray.map((r, y) =>
          <KImage
            key={`${x}_${y}`}
            ref={(el) => {
              (refsArray.current as any)[`${x}:${y}`] = el
            }}
            image={image}
            width={50}
            height={50}
            x={x * 100}
            y={y * 100}
            crop={{
              x: x * (imageDimmensions.width / 5),
              y: y * (imageDimmensions.height / 5),
              width: imageDimmensions.width / 5,
              height: imageDimmensions.height / 5,
            }}
          />)
        )}
      </Layer>
    </Stage>

    <button onClick={getResults} >Go</button>

    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {res.map((r, i) =>
        <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
          {r.map((j, jx) => {
            return <div style={{ width: 10, height: 10, margin: '5px' }}>{j}</div>
          })}
        </div>
      )}
    </div>
  </>
}