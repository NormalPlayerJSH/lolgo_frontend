import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import icon from '../assets/icon.svg';
import './App.global.css';

const Hello = () => (
  <div>
    <div className="Hello">
      <img width="200px" alt="icon" src={icon} />
    </div>
    <h1>electron-react-boilerplate</h1>
    <div className="Hello">
      <button
        type="button"
        onClick={() => ipcRenderer.send('asdf', { msg: 'asdf' })}
      >
        <span role="img" aria-label="books">
          📚
        </span>
        Send asdf
      </button>
      <a
        href="https://github.com/sponsors/electron-react-boilerplate"
        target="_blank"
        rel="noreferrer"
      >
        <button type="button">
          <span role="img" aria-label="books">
            🙏
          </span>
          Donate
        </button>
      </a>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
