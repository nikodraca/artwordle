import { useState } from 'react';
import { Stage, Layer, Image as KImage } from 'react-konva';
import { range } from 'lodash'

export const HomePage = () => {
  const [image, setImage] = useState<HTMLImageElement>();
  const [imageDimmensions, setImageDimmensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 });

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

  return <>
    <input type="file" name="file" id="file" onChange={handleChangeImage} required accept="image/png, image/jpeg" />

    <Stage width={window.innerWidth}
      height={window.innerHeight}
    >
      <Layer>
        {range(0, 5).map((x) => range(0, 5).map((y) =>
          <KImage image={image}
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

  </>
}