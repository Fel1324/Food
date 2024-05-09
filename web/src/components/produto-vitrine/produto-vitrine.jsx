import { CartContext } from '../../contexts/cart-context';
import { useContext } from 'react';
import { Toaster, toast } from 'sonner'
import './produto-vitrine.css';
import bag from '../../assets/bag-black.png';

function ProdutoVitrine(props){
  const {AddItemCart} = useContext(CartContext);

  function AddItem(){
    const item = {
      id: props.id,
      nome: props.nome,
      preco: props.preco,
      foto: props.foto,
      qtd: 1
    };

    AddItemCart(item);
  }

  return <li className='produto-box text-center'>
    <img src={props.foto} alt="Foto"/>

    <div>
      <h2>{props.nome}</h2>
      <p className='prod-vitrine-descricao'>{props.descricao}</p>
      <p className='prod-vitrine-preco'>{new Intl.NumberFormat(
        'pt-BR', {style: 'currency', currency: 'BRL'}).format(props.preco)}
      </p>
    </div>

    <div>
      <Toaster position='bottom-center' richColors />
      <button className='btn btn-cart' onClick={() => {
          AddItem();
          toast.success('Item adicionado na sacola');
        }}
      >
        <img className='icon' src={bag} alt=""/>
        Adicionar
      </button>
    </div>
  </li>
}

export default ProdutoVitrine;