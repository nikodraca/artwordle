import styled from 'styled-components';
import { TwitterShareButton } from 'react-share';
import AsyncSelect from 'react-select/async';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  background-color: #f8f6f5;
`;

export const Sidebar = styled.div`
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
`;

export const SidebarHeader = styled.h2`
  font-family: 'Open Sans', sans-serif;
  font-size: 50px;
  text-align: center;
  line-height: 1;
  font-weight: 800;
  text-transform: uppercase;
`;

export const ButtonCSS = `  
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
`;

export const Textarea = styled.textarea`
  width: 200px;
  height: 200px;
  text-align: center;
  resize: none;
  vertical-align: middle;
`;

export const StyledSelect = styled(AsyncSelect)`
  width: 80%;
`;

export { Results } from './Results';
