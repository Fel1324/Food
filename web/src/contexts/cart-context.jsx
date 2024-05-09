import { createContext, useState } from "react";

const CartContext = createContext();

function CartProvider(props){
  const [cartItems, setCartItems] = useState([]);
  const [totalCart, setTotalCart] = useState(0);

  function AddItemCart(item){
    let cartItemNovo = [];
    let findItem = false;

    // VERIFICAR SE O ITEM JÁ EXISTE NO CARRINHO
    for(var prod of cartItems){
      // ENCONTROU
      if(prod.id === item.id){
        item.qtd = prod.qtd + 1;
        findItem = true;
        cartItemNovo.push(item);
      } else {
        cartItemNovo.push(prod);
      }
    }

    // SE NÃO ENCONTROU O ITEM OU É O PRIMEIRO ITEM A SER INSERIDO
    if(findItem === false || cartItems.length === 0){
      cartItemNovo.push(item);
    }

    // INSERE DADOS NA LISTA DO CARRINHO
    setCartItems(cartItemNovo);
    CalcTotal(cartItemNovo);
  }

  function RemoveItemCart(id){
    let cartItemNovo = [];

    // LOCALIZA O ITEM E ATUALIZA
    for(var prod of cartItems){
      // ENCONTROU
      if(prod.id === id){
        prod.qtd -= 1;
      }

      cartItemNovo.push(prod);
    }

    // REMOVE ITENS ZERADOS
    cartItemNovo = cartItemNovo.filter(item => {
      return item.qtd > 0;
    });

    // ATUALIZA LISTA DO CARRINHO
    setCartItems(cartItemNovo);
    CalcTotal(cartItemNovo);
  }

  function CalcTotal(items){
    let tot = 0;

    for(var item of items){
      tot = tot + (item.preco * item.qtd);
    }

    setTotalCart(tot);
  }

  return <CartContext.Provider value={{cartItems, setCartItems, AddItemCart, RemoveItemCart, totalCart, setTotalCart}}>
    {props.children}
  </CartContext.Provider>
}

export {CartContext, CartProvider};