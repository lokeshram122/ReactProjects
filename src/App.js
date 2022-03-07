import logo from './logo.svg';
import './App.css';
import Master from './Components/MasterComponent';
import {Main} from './Components/MainComponent'
import NonJSX from './Components/NonJSX';

function App() {
  return (
    <div className="App">
      <Master name="Lokesh">This is children</Master>
      {/* <Main name="Yes"/> */}
      {/* <NonJSX name="Good Day"/> */}
    </div>
  );
}

export default App;
