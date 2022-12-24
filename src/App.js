import './App.css';
import Comment from './components/comment';
import CurrentUser from './components/currentUser';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const { data } = useSelector(store => store.generalData)

  // setting every change in the database
  useEffect (() => {
    localStorage.setItem('dataBase', JSON.stringify(data))
  },
  [ data ]
  )
  
  console.log()
  return (
    <div className="App">
      <div className='all-comments'>
        { data.comments.map( comment => (
          <Comment 
            key={comment.id}
            currentUser = {data.currentUser}
            comments = {comment}
          />
        ))}
      </div>
      
      <div>
        <CurrentUser currentUser={data.currentUser}/>
      </div>
    </div>
  );
}

export default App;
