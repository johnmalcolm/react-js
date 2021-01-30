import logo from './journal.svg';
import Search from './components/Search'
import './App.css';

function App() {
  return (
    <div className="App">
      <div id="full-logo">
        <header>
          <img id="logo" src={logo} />
          <h1 id="brandmark">fieldmap</h1>
        </header>
      </div>
      <Search />
    </div>
  );
}

export default App;
