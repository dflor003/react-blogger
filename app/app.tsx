import './styles/app.scss';
import * as React from 'react';
import {render} from 'react-dom';
import { mainRoutes } from './routes';

render(mainRoutes(), document.getElementById('root'));
