import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import './historico.css';
import api from "../../services/api";

function Historico(){
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    api.get("/pedidos")
    .then((resp) => {
      setPedidos(resp.data);
    })
    .catch((err) => {
      alert('Erro ao carregar pedidos');
    });
  }, []);

  return <>
  <Navbar showMenu/>

  <div className='container'>
    <div className='titulo text-center'>
      <h1>Histórico de Pedidos</h1>
    </div>

    <div className="box-pedido">
      <table className="table">
        <tbody>
          {
            pedidos.map(ped => {
              return <tr key={ped.id_pedido}>
                <td><strong>Pedido: {ped.id_pedido}</strong></td>
                <td className="text-light">{ped.dt_pedido}</td>
                <td className="text-red">{new Intl.NumberFormat(
                  'pt-BR', {style: 'currency', currency: 'BRL'}).format(ped.total)}
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  </div>
</>
}

export default Historico;