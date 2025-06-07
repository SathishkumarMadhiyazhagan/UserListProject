import './App.css';
import ElevetorProject from './Component/ElevetorProject';
import UserList from './Component/UserList';

function App() {
  return (
    <div className="App" style={{margin: '20px', textAlign: 'center'}}>
      <UserList />
      <ElevetorProject />
    </div>
  );
}

export default App;
