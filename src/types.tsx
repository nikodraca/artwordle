export interface ExampleInterface {
  example: string;
}

export interface Artist {
  href: string;
  id: string;
  name: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Album {
  artists: Array<Artist>;
  href: string;
  id: string;
  images: Array<Image>;
  name: string;
}
