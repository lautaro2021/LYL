import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../config';
import { setType } from '../redux/actions/index';
import s from './Styles/Nav.module.css'
import logo from '../media/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

function Nav() {
  const dispatch = useAppDispatch();
  const [nav, setNav] = useState(false);
  const [open, setOpen] = useState(false);

  const changeNav = () =>{
    if(window.scrollY >= 80){
      setNav(true);
    }else{
      setNav(false);
    }
  }

  window.addEventListener('scroll', changeNav)

  const handleType = () => {
    dispatch(setType(undefined));
  }
 
  return (
    <div id={!nav ? s.navContainer : s.navContainer2}>
      <button className={s.navBtn} onClick={()=>{setOpen(open? false: true)}}>
        {/* <i className="fa-solid fa-bars"></i> */}
        {
          open?
            <FontAwesomeIcon icon={solid('xmark')} />
            :
            <FontAwesomeIcon icon={solid('bars')} />
        }
      </button>
      <div className={s.navSec} id={open? s.navOpen : ''}>
        <Link to = "/vehicles">
          <h4 onClick = {handleType}>Vehiculos</h4>
        </Link>
        <Link to='/about'>
          <h4>Sobre nosotros</h4>
        </Link>
        <Link to='/contact'>
          <h4>Contactanos</h4>
        </Link>
        <Link to = "/">
          <h4>Inicio</h4>        
        </Link>
        <Link to = '/admin/panel'>
          <h4>Panel</h4>
        </Link>
      </div>
      <div className={s.navSec2}>
        <Link to='/'>
          <img src={logo} alt='Logo'/>
        </Link>
      </div>
  </div>
  )
}

export default Nav