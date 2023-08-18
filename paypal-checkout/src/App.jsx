import './styles.scss';
import React, { useEffect, useState } from 'react';
import paypal from 'paypal-rest-sdk'; // Importando a biblioteca do PayPal
import PageHeader from './layout/PageHeader';
import PageTitle from './layout/PageTitle';
import Summary from './Summary';
import TableRow from './TableRow';

import { api } from './provider';
import axios from 'axios';

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function App() {
  const [cart, setCart] = useState([]);
  const productObject = {
    name: 'produto',
    category: 'categoria',
    price: randomNumber(90, 1200),
    quantity: 1,
  };

  const fetchData = () => {
    api.get('/cart').then((response) => setCart(response.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddItem = () => {
    api.post('/cart', productObject).then(() => {
      fetchData();
    });
  };

  const handleRemoveItem = (item) => {
    api.delete(`/cart/${item._id}`).then(() => {
      fetchData();
    });
  };

  const handleUpdateItem = (item, action) => {
    let newQuantity = item.quantity;

    if (action === 'decrease') {
      if (newQuantity === 1) {
        return;
      }
      newQuantity -= 1;
    }
    if (action === 'increase') {
      newQuantity += 1;
    }

    const newData = { ...item, quantity: newQuantity };
    delete newData._id;

    api.put(`/cart/${item._id}`, newData).then(() => {
      fetchData();
    });
  };

  const getTotal = () => {
    let sum = 0;

    for (let item of cart) {
      sum += item.price * item.quantity;
    }

    return sum;
  };

  const cartTotal = getTotal();

  // Função de integração com o PayPal
  const handleCheckout = async () => {
    try {
      const paypalOrder = await paypal.payment.create({
        intent: 'sale',
        payer: {
          payment_method: 'paypal',
        },
        transactions: [
          {
            amount: {
              total: cartTotal.toFixed(2), // Arredondado para 2 casas decimais
              currency: 'USD',
            },
          },
        ],
        redirect_urls: {
          return_url: 'URL_DE_RETORNO', // Sua URL de retorno após o pagamento
          cancel_url: 'URL_DE_CANCELAMENTO', // Sua URL de cancelamento
        },
      });

      const response = await api.post('/paypal/orders', {
        paypalOrderId: paypalOrder.id,
      });

      window.location.href = response.data.approval_url;
    } catch (error) {
      console.error('Erro ao criar ordem de pagamento do PayPal:', error);
    }
  };

  return (
    <>
      <PageHeader />
      <main>
        <PageTitle data={'Seu carrinho'} />
        <div className='content'>
          <section>
            <button
              onClick={handleAddItem}
              style={{ padding: '5px 10px', marginBottom: 15 }}
            >
              add to cart
            </button>
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                  <th>-</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <TableRow
                    key={item._id}
                    data={item}
                    handleRemoveItem={handleRemoveItem}
                    handleUpdateItem={handleUpdateItem}
                  />
                ))}
                {cart.length === 0 && (
                  <tr>
                    <td colSpan='5' style={{ textAlign: 'center' }}>
                      <b>Carrinho de compras vazio.</b>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
          <aside>
            <Summary total={cartTotal} />
            {/* Botão de Finalizar Compra */}
            <button onClick={handleCheckout}>Finalizar Compra</button>
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;
