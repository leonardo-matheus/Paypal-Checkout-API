import React, { useState } from 'react';
import './styles.scss';
import PageHeader from './layout/PageHeader';
import PageTitle from './layout/PageTitle';
import Summary from './Summary';
import TableRow from './TableRow';
import Popup from './Popup';
import { createPaymentService } from './services/PaymentService'; // Import the payment service

const paymentService = createPaymentService(); // Create an instance of the payment service

function App() {
  const [cart, setCart] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleRemoveItem = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.name !== item.name);
    setCart(updatedCart);
  };

  const handleUpdateItem = (item, action) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((cartItem) => cartItem.name === item.name);

    if (index !== -1) {
      if (action === 'increase') {
        updatedCart[index].quantity += 1;
      } else if (action === 'decrease' && updatedCart[index].quantity > 1) {
        updatedCart[index].quantity -= 1;
      }
      setCart(updatedCart);
    }
  };

  const getTotal = () => {
    let sum = 0;
    for (let item of cart) {
      sum += item.price * item.quantity;
    }
    return sum;
  };

  const cartTotal = getTotal();

  const handlePersonalInfoChange = (event) => {
    const { name, value } = event.target;
    setPersonalInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleShippingInfoChange = (event) => {
    const { name, value } = event.target;
    setShippingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handlePayPalCheckout = async () => {
    const total = getTotal();
    
    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: total.toFixed(2),
          },
        },
      ],
    };

    try {
      // Create a PayPal order
      const orderResponse = await paymentService.createOrder(orderData);
      const orderId = orderResponse.id;

      // Capture the order
      const captureData = await paymentService.capturePayment(orderId);
      console.log('Payment captured:', captureData);
    } catch (error) {
      console.error('Error creating/payment:', error);
    }

    setShowPopup(false);
    setShowForm(false);
  };

  return (
    <>
      <PageHeader />
      <main>
        <PageTitle data={'Seu carrinho'} />
        <div className='content'>
          <section>
            <button
              onClick={() => {
                setCart([...cart, { name: 'T-shirt', price: 20, quantity: 1 }]);
              }}
              style={{ padding: '5px 10px', marginBottom: 15 }}
            >
              Adicionar T-shirt ao carrinho
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
                {cart.map((item, index) => (
                  <TableRow
                    key={index}
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
            <Summary total={cartTotal} handlePayPalCheckout={handlePayPalCheckout} />
          </aside>
        </div>
      </main>

      {/* Conditionally render the popup */}
      {showPopup && (
        <Popup
          personalInfo={personalInfo}
          shippingInfo={shippingInfo}
          handlePersonalInfoChange={handlePersonalInfoChange}
          handleShippingInfoChange={handleShippingInfoChange}
          handlePayPalCheckout={handlePayPalCheckout}
          handleClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
}

export default App;