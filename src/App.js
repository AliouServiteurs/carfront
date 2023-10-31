import './App.css';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Login from './componements/Login.js';

// color Caeshop #1976d2
function App(){
  return(
    <div className="App">
     <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Carshop</Typography> 
      </Toolbar>
     </AppBar>
     <Login />
    </div>
  )
}
export default App;
