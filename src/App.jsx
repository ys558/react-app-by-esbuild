// yarn start时用这个：
import logo from './logo.svg';
// yarn dev时用这个：配合 esbuild-plugin-svgr 库 图片改为这种格式
// import Logo from "./logo.svg";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* yarn start时用这个： */}
        <img src={logo} className="App-logo" alt="logo" />
        {/* yarn dev 时用这个： 配合 esbuild-plugin-svgr 库 图片改为这种格式*/}
        {/* <Logo className="App-logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
