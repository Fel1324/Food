import './navbar.css';
import logo from '../../assets/logo.png';
import bag from '../../assets/bag.png';
import Cart from '../cart/cart.jsx';
import { Link } from 'react-router-dom';

function Navbar(props){
  function openSidebar(){
    const event = new CustomEvent('openSidebar');
    window.dispatchEvent(event);
  }

  return <nav className='navbar'>
    <Link to='/'>
      <img className="logotipo" src={logo} alt="Logotipo"/>
    </Link>

    {
      props.showMenu &&
      <div className='menu'>
        <Link to='/historico'>Histórico</Link>
        <button onClick={openSidebar} className='btn btn-red'>
          <img className='icon' src={bag}/>
          Sacola
        </button>
      </div>
    }

    <Cart/>
  </nav>
}

export default Navbar;