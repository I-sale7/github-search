import './App.scss';
import { useEffect, createContext, useState } from 'react';
import { callSearchService } from './services/search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Repository from './views/Repository';
import Home from './views/Home';

export const UserContext = createContext();


function App() {

  const [query, setQuery] = useState('');
  const [searchFor, setSearchFor] = useState('users');
  const [data, setData] = useState({});

  const githubsearchOptions = [
    {id: 0, value: 'users'},
    {id: 1, value: 'repositories'},
    {id: 2, value: 'code'},
    {id: 3, value: 'commits'},
    {id: 4, value: 'issues'},
    {id: 5, value: 'labels'},
    {id: 6, value: 'topics'},
  ]

  const handleQueryChange = (query) => {
    setQuery(query);
  }

  const handleSearchType = (type) => {
    setSearchFor(type);
  }

  useEffect(
    ()=> {
      const controller = new AbortController();
      const signal = controller.signal;
      // Call API when the user value is changed.
      if(searchFor && query){
        const fetchData = async () => {
          const response = callSearchService(`https://api.github.com/search/${searchFor}?q=${query}`, query, signal);
          const data = response && await response;
          setData(data);
        };

        fetchData();
        return ()=> {
          console.log('aborted');
          return controller.abort();
        }
      }

    }, [searchFor, query] )

    const contextData = {
      users: data.items,
      handleQueryChange: handleQueryChange,
      searchFor: searchFor,
      options: githubsearchOptions,
      handleOptions: handleSearchType,
      userData: {}
    }

  return (

    <div className="App">
      <main className="main">
        <UserContext.Provider value={contextData}>
          <Router>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/repository' element={<Repository />}/>
            </Routes>
          </Router>
        </UserContext.Provider >
      </main>

    </div>
  );
}

export default App;
