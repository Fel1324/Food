import { useEffect, useState, useContext } from "react";
import { Dock } from "react-dock";
import ProdutoCart from "../produto-cart/produto-cart";
import './cart.css'
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart-context";
import back from "../../assets/back.png";
import bag from "../../assets/bag-black.png";

function Cart(){
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const {cartItems, totalCart} = useContext(CartContext);

  useEffect(()=>{
    window.addEventListener('openSidebar', () => {
      setShow(true);
    });

    //setCartItems(carrinho);
  }, []);

  function checkout(){
    navigate('/checkout');
  }

  return <Dock position="right" isVisible={show} fluid={false} size={375} onVisibleChange={visible => {setShow(visible)}}>
    {
      cartItems == 0 ?
      <div className="cart-empty">
        <img onClick={e => setShow(false)} className="cart-btn-close" src={back} alt="Fechar menu"/>

        <div className="text-center">
          <img src={bag}/>
          <p>Sua sacola está vazia</p>
        </div>
      </div>

      :
      <div className="produto-cart">
        <div>
          <div className="produto-cart-header text-center">
            <h1 className="produto-cart-titulo">Meu Pedido</h1>
            <img onClick={e => setShow(false)} className="cart-btn-close" src={back} alt="Fechar menu"/>
          </div>

          <ul className="lista-produtos">
            {
              cartItems.map(item => {
                return <ProdutoCart 
                  key={item.id} id={item.id} foto={item.foto} nome={item.nome} qtd={item.qtd} preco={item.preco}
                />
              })
            }
          </ul>
        </div>

        <div className="footer-cart">
          <div className="footer-cart-valor">
            <span>Total</span>
            <span>
              <strong>{new Intl.NumberFormat(
                'pt-BR', {style: 'currency', currency: 'BRL'}).format(totalCart)}
              </strong>
            </span>
          </div>

          <div>
            <button onClick={checkout} className="btn-checkout">Finalizar Pedido</button>
          </div>
        </div>
      </div>
    }
  </Dock>
}

export default Cart;