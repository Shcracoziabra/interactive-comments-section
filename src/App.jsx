import { useReducer, useEffect, useRef } from 'react';
import { AppContext, AppDispatchContext } from './AppContext';
import reducer from './reducer';
import './App.css';
import Comment from './components/Comment';
import MessageForm from './components/MessageForm';

function App() {
  const [data, dispatch] = useReducer(reducer, null);
  const effectNoRan = useRef(true);

  useEffect(() => {
    if (effectNoRan.current) {
      
      const localData = localStorage.getItem('commentSectionData');
      if (localData) {
        dispatch({type: 'data_initiated', payload: JSON.parse(localData)})
      } else {
        fetch('/data').then(res => res.json()).then(res=> {
          dispatch({type: 'data_initiated', payload: res});
          localStorage.setItem('commentSectionData', JSON.stringify(res));
        });
      }
    }
    return () => effectNoRan.current = false
  }, []);

  useEffect(()=> {
    if (data) {
      localStorage.setItem('commentSectionData', JSON.stringify(data));
    }
  }, [data])

  const comments = data ? data.comments.content.map(comment => {
    return <Comment key={comment.id} comment={comment}/>
  }) : null;

  return (
    <AppContext.Provider value={data}>
      <AppDispatchContext.Provider value={dispatch}>
        <h1 className="visually-hidden">Mock comment section</h1>
        {data && comments}
        { data && <MessageForm
          key="f-1"
          type='send'   
        />}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
    
  )
}

export default App;
