import React, {useContext} from "react";
import './SearchBodyComponent.scss'
import logo from "./../../github-logo.svg"
import { UserContext } from "../../App";
import DropdownComponent from "../DropdownComponent/DropdownComponent";

export const SearchBodyComponent = ()=> {
  const UserDataContext = useContext(UserContext);

  const handleOnChange = (e)=> {
    const input = e.target.value;

    setTimeout(()=> {
      const timedOutInput = e.target.value;

      if(input === timedOutInput){
        UserDataContext.handleQueryChange(input);
      }
    }, 1000);
  }

  return (
    <div className="main-top">
      <div className="main-top__logo-container">
        <img src={logo} className="main-top__logo" alt=""/>
        <h1 className="main-top__logo-title">
          GitHub Search
        </h1>
      </div>
      <DropdownComponent/>
      <div className="main-top__search">
        <input type="search" placeholder="What are you looking for?" className="main-top__search-input" onChange={handleOnChange} />
      </div>
    </div>
  )
}