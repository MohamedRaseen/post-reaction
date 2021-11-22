import './App.scss';
import Users from './users/Users';
import Contents from './content/Content';
import { contents } from '../static/appConstants'

const App = () =>{
  return(
    <div className='app-container'>
      <Users/>
      <Contents contents={contents}/>
    </div>
  )
}

export default App;
