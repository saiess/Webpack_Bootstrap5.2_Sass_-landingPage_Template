import sum from './dynamic';
import './styles/main.scss';
import { Tooltip, Toast, Popover } from 'bootstrap';
import netflix from './assets/logo-netflix.svg';

console.log(sum(1, 2));

const NetflixImg = document.getElementById('nfx');
NetflixImg.src = netflix;
