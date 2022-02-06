import styled from 'styled-components';
import { TwitterShareButton } from 'react-share';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: white;
`;

export const Sidebar = styled.div`
  height: 100%;
  position: absolute;
  z-index: 2;
  background-color: #f4f2ed;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #333032;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const SidebarHeader = styled.div`
  font-family: 'IBM Plex Mono', monospace;
  font-size: 15px;
  text-align: center;
  line-height: 1;
  font-weight: 500;
  text-transform: uppercase;
  position: fixed;
  top: 0;
  left: 0;
  margin: 20px;
`;

export const ButtonCSS = `  
  font-family: 'IBM Plex Mono', monospace;
  font-size: 20px;
  font-weight: 400;
  text-transform: uppercase;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  height: 40px;
  width: 150px;
  justify-content: space-around;
  border: 1px solid #333032;
  color: #333032;
  cursor: crosshair;

  :hover {
    background-color: #333032;
    color: white;
  }
`;

export const Button = styled.button`
  ${ButtonCSS}
`;

export const StyledTwitterShareButton = styled(TwitterShareButton)`
  ${ButtonCSS}
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 20px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 225px;
  text-align: center;
  resize: none;
  vertical-align: middle;
  overflow: hidden;
  border: none;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 20px;
  outline: none;

  @media (max-width: 768px) {
    width: 85%;
  }
`;

export const Search = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  margin: 20px;
`;

export const P = styled.p`
  font-family: 'IBM Plex Mono', monospace;
  font-size: 15px;
  text-align: center;
  text-transform: uppercase;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const Intro = styled.div`
  display: flex;
  flex-direction: column;
  height: 30%;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export const Credits = styled.a`
  position: absolute;
  bottom: 0;
  left: 0;
  font-family: 'IBM Plex Mono', monospace;
  margin: 20px;
  color: black;
  font-size: 15px;
`;

export { Results } from './Results';
export { Loader } from './Loader';
export { AlbumSelect } from './AlbumSelect';
