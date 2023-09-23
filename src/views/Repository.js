import React, { useContext, useEffect, useState } from 'react'
import { callRepository, callSearchService } from '../services/search';
import { UserContext } from '../App';
import "../styles/repository.scss"
import { Link } from 'react-router-dom';

const Repository = (repoUrl) => {
  const [data, setData] = useState({});
  const [languages, setlanguages] = useState({});

  const userData = useContext(UserContext);
  const selectedUser = userData.userData;
  useEffect(()=> {
    callRepository(repoUrl, (res)=> setData(res));
    const controller = new AbortController();

    const languages = async ()=> {
      const data = await callSearchService(selectedUser.languages_url);
      setlanguages(data);
    }
    languages();

    return ()=> {
      console.log('aborted');
      return controller.abort();
    }
  }, [repoUrl]);

  return (
    <article className='repo-container'>
      {console.log(new Object(selectedUser))}
      <aside className='repo-side__content'>
        <article className='repo-side__user-avatar'>
        <img src={selectedUser.owner.avatar_url} alt={selectedUser.owner.login}/>
        </article>
        <article className='repo-side__user-name'>
          {selectedUser.owner.login}
        </article>
        <article className='repo-side__user-desc'>
          {selectedUser.description}
        </article>

        <article className='repo-side__user-languages'>
          { Object.keys(languages).length && Object.keys(languages).map((key)=> <span key={key} id={key}>{key}</span>)
          }
        </article>

        <article className='repo-side__user-actions'>
          <button className='repo-side__user-actions-clone' onClick={()=> navigator.clipboard.writeText(selectedUser.clone_url)}>
            Clone
          </button>
          <button className='repo-side__user-actions-clone' onClick={()=> navigator.clipboard.writeText(this.state.textToCopy)}>
            Github
          </button>
          <button className='repo-side__user-actions-clone' onClick={()=> navigator.clipboard.writeText(this.state.textToCopy)}>
            Clone
          </button>
        </article>
      </aside>
    </article>
  )
}

export default Repository;