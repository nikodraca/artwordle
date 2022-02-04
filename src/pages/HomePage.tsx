import { useRef, useState } from 'react';
import { Stage, Layer, Image as KImage } from 'react-konva';
import { chunk, fill } from 'lodash'
import styled from 'styled-components';
import { ArrowUpRight } from 'react-feather';

import { closestEmoji, getColor } from '../utils/color';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  background-color: #f8f6f5;
`

const Sidebar = styled.div`
  height: 90%;
  position: absolute;
  z-index: 2;
  background-color: #f4f2ed;
  margin: 5%;
  width: 40%;
  display: flex;
  flex-direction: column;
  padding: 1%;
  border-top-left-radius: 75px;
  color: #333032;
  justify-content: space-around;
  align-items: center;
`

const SidebarHeader = styled.h2`
  font-family: 'Open Sans', sans-serif;
  font-size: 50px;
  text-align: center;
  line-height: 1;
  font-weight: 800;
  text-transform: uppercase;
`

const Button = styled.button`
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  font-weight: 400;
  text-transform: uppercase;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  height: 40px;
  width: 120px;
  justify-content: space-around;
  border: 1px solid #333032;
  color: #333032;

  :hover {
    background-color: #333032;
    color: white;
  }
`

export const HomePage = () => {
  const [image, setImage] = useState<HTMLImageElement>();
  const [imageDimmensions, setImageDimmensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 });

  const refsArray = useRef({})
  const [res, setRes] = useState(fill(Array(5), fill(Array(5), "")))

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


  const getResults = async () => {
    let allUrls: string[] = []

    for (const refArray of chunk(Object.values(refsArray.current), 5)) {

      const urls: string[] = refArray.map((ref: any, j: number) => {
        return ref.toDataURL()

      })

      allUrls = [...allUrls, ...urls]

    }

    const x = await Promise.all(allUrls.map(getColor))
    const colors = x.map(({ result }: any) => {
      const [r, g, b] = result
      return closestEmoji({ r, g, b })
    })
    setRes(chunk(colors, 5))
  }


  return <Container>
    <Sidebar>
      <SidebarHeader>Artwordle</SidebarHeader>
      <input type="file" name="file" id="file" onChange={handleChangeImage} required accept="image/png, image/jpeg" />

      <Button onClick={getResults}>
        Go{' '}<ArrowUpRight size={30} />
      </Button>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {res.map((r, i) =>
          <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
            {r.map((j, jx) => {
              return <div style={{ width: 10, height: 10, margin: '5px' }}>{j}</div>
            })}
          </div>
        )}
      </div>

    </Sidebar>

    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <Layer>
        {res.map((refArray, x) => refArray.map((r, y) =>
          <KImage
            key={`${x}_${y}`}
            ref={(el) => {
              (refsArray.current as any)[`${x}:${y}`] = el
            }}
            image={image}
            width={500}
            height={500}
            x={x * 500}
            y={y * 500}
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
  </Container>
}