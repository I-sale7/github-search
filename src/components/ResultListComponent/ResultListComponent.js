import React , {useContext} from "react";
import { UserContext } from "../../App";
import { callRepository } from "../../services/search";
import { Link } from "react-router-dom";
import "./ResultListComponent.scss";

export const ResultListComponent = ()=> {
  const usersData = useContext(UserContext);

  const handleUserData = () => {
    const userData = usersData.users;
    return userData && userData.map(user =>{
      return (<div key={user.id}  className="result-list__item">
        <article className="result-list__item-avatar">
          <img src={user.avatar_url} />
        </article>
        <h3 className="result-list__item-name">
          {user.login}
        </h3>
        <p className="result-list__item-desc">
          {user.description}
        </p>
        <a href={user.html_url} className="result-list__item-link" target="_blank"> Go to repo</a>
      </div>)
    });
}

  const openRepository = (e, repoContentUrl, user)=> {
    callRepository(repoContentUrl, (data)=> console.log(data));
    usersData.userData = user;
  }

  const handleRepoData = () => {
    const repoData = usersData.users;
    return repoData && repoData.map(user =>{
      const url = (user.contents_url).substring(0, user.contents_url.lastIndexOf('{'));
      return (<div key={user.id}  className="result-list__item">
        <article className="result-list__item-avatar">
          <img src={user.owner.avatar_url} />
        </article>
        <h3 className="result-list__item-name">
          {user.owner.login}
        </h3>

        <p className="result-list__item-desc">
          {user.description}
        </p>
        <Link to="/repository" className="result-list__item-link" onClick={event => openRepository(event, url, user)}> Go to repo</Link>
      </div>)
    });
  }

  return (

    <div className="main-body">
      {usersData.users ? (
        <div className="result-list-view">
          {usersData.users && usersData.searchFor === 'users' && handleUserData()}
          {usersData.users && usersData.searchFor === 'repositories' && handleRepoData()}
        </div>
      ) : ('')}
    </div>
  )
}