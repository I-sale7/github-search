import { React, useContext, useRef, useState } from 'react'
import './DropdownComponent.scss'
import { UserContext } from '../../App';


const DropdownComponent = () => {
  const [selected, setSelected] = useState('select');
  const [openDropdown, setOpenDropdown] = useState(false);

  const repoData = useContext(UserContext);

  const handleSelectionChange = (event, value)=> {
    event.preventDefault();
    setSelected(value);
    setOpenDropdown('')
    repoData.handleOptions(value)
  }

  const handleOpenDropdown = ()=>setOpenDropdown(!openDropdown)

  return (
    <div className="dropdown-component">
      <select className='dropdown-component__select' value={selected} onChange={()=> setSelected(selected)}>
        {repoData.options.length &&
          repoData.options.map(item => <option key={item.id + '_key'} idx={item.id} value={item.value}> {item.value} </option>)
        }
      </select>

      <div className="dropdown-component__selected" onClick={handleOpenDropdown}>{selected}</div>
      <ul className={`dropdown-component__lists ${openDropdown ? "open" :""}`}>
        {repoData.options.length &&
          repoData.options.map(item => <li key={item.id} className='dropdown-component__list' onClick={(e)=> handleSelectionChange(e, item.value)}>
              <a href='/' className='dropdown-component__list-link'>{item.value}</a>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default DropdownComponent