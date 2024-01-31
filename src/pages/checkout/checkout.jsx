import Navbar from '../../components/navbar/navbar.jsx';
import './checkout.css';
import { CartContext } from '../../contexts/cart-context.jsx';
import { useContext, useEffect, useState } from 'react';
import api from "../../services/api.js";
import { useNavigate } from 'react-router-dom';

function Checkout(){
  const {totalCart, setTotalCart, cartItems, setCartItems} = useContext(CartContext);

  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [fone, setFone] = useState("");

  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");

  const [liberar, setLiberar] = useState(false);

  function FinalizarPedido(){
    // MONTA ITENS PARA ENVIAR PARA API
    let produtos = [];

    for(var prod of cartItems){
      produtos.push({
        id_produto: prod.id,
        qtd: prod.qtd,
        vl_unitario: prod.preco,
        vl_total: prod.preco * prod.qtd
      });
    }

    const params = {
      id_usuario: 1,
      nome,
      email,
      fone,
      cep,
      endereco,
      bairro,
      cidade,
      uf,
      total: totalCart,
      itens: produtos
    };

    localStorage.setItem("sessionUser", JSON.stringify(params));

    api.post("/pedidos", params)
    .then((resp) => {
      setCartItems([]);
      setTotalCart(0);
      navigate("/historico");
    })
    .catch((err) => {
      alert("Erro ao enviar pedido!");
    });
  }

  useEffect(() => {
    if(localStorage.getItem("sessionUser")){
      let session = JSON.parse(localStorage.getItem("sessionUser"));

      setNome(session.nome);
      setEmail(session.email);
      setFone(session.fone);

      setCep(session.cep);
      setEndereco(session.endereco);
      setBairro(session.bairro);
      setCidade(session.cidade);
      setUf(session.uf);
    }
  }, []);

  useEffect(()=> {
    if(nome && email && fone && cep && endereco && bairro && cidade && uf && cartItems.length > 0 && nome.length > 2)
      setLiberar(true);
    else 
      setLiberar(false);
  }, [nome, email, fone, cep, endereco, bairro, cidade, uf]);

  return <>
  <Navbar/>

  <div className='container'>
    <div className='titulo text-center'>
      <h1>Finalizar Pedido</h1>
    </div>

    <div className='col-3'>
      <div className='box-checkout'>
        <h3>Dados Pessoais</h3>

        <div className='input-group'>
          <p>Nome Completo</p>
          <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
        </div>

        <div className='input-group'>
          <p>E-mail</p>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className='input-group'>
          <p>Telefone Contato</p>
          <input type="text" id="fone" value={fone} onChange={(e) => setFone(e.target.value)}/>
        </div>
      </div>
    </div>

    <div className='col-3'>
      <div className='box-checkout'>
        <h3>Endereço de Entrega</h3>

        <div className='input-group'>
          <p>CEP</p>
          <input type="text" id="cep" value={cep} onChange={(e) => setCep(e.target.value)}/>
        </div>

        <div className='input-group'>
          <p>Endereço</p>
          <input type="text" id="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)}/>
        </div>

        <div className='input-group'>
          <p>Bairro</p>
          <input type="text" id="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)}/>
        </div>

        <div className='input-group'>
          <p>Cidade</p>
          <input type="text" id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)}/>
        </div>

        <div className='input-group'>
          <p>UF</p>
          <select id='uf' value={uf} onChange={(e) => setUf(e.target.value)}>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
            <option value="EX">Estrangeiro</option>
        </select>
        </div>
      </div>
    </div>

    <div className='col-3'>
      <div className='box-checkout'>
        <h3>Valores</h3>

        <div className='checkout-valores'>
          <span>Total</span>
          <span>
            <strong>{new Intl.NumberFormat(
              'pt-BR', {style: 'currency', currency: 'BRL'}).format(totalCart)}
            </strong>
          </span>
        </div>

        <div className='checkout-button'>
          {
            liberar ?
            <button onClick={FinalizarPedido} className='btn btn-checkout'>Finalizar Pedido</button>
            :
            <button onClick={FinalizarPedido} className='btn btn-checkout' disabled>Finalizar Pedido</button>
          }
        </div>
      </div>
    </div>
  </div>
</>
}

export default Checkout;