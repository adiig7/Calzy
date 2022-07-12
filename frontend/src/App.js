import './App.css';

function App() {
  const connect = () => {
    alert('connect');
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Calzy</h1>
        <div id="slogan">Web3 Appointment Scheduling</div>
        <button onClick={connect}>Connect Wallet</button>
      </header>
    </div>
  );
}

export default App;
