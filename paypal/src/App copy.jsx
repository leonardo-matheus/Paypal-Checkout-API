import React, { useState } from 'react';
import './styles.scss';
import PageHeader from './layout/PageHeader';
import PageTitle from './layout/PageTitle';
import Summary from './Summary';
import TableRow from './TableRow';
import Popup from './Popup';

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
  const [showForm, setShowForm] = useState(false); // Add this state

  const handleRemoveItem = (item) => {
    // Remove item from cart
  };

  const handleUpdateItem = (item, action) => {
    // Update item quantity in cart
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

  const handlePayPalCheckout = (total) => {
    // Use personalInfo, shippingInfo, cart data, and total to initiate PayPal integration
    setShowPopup(true);
    setShowForm(true); // Show the form when opening the popup
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setShowForm(false); // Hide the form when closing the popup
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
                // Simulate adding T-shirt to cart directly in HTML
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
            <div className='checkout-form'>
              {showForm && ( // Render the form only when showForm is true
              <>
              <h2>Dados Pessoais</h2>
              <input
                type='text'
                name='name'
                placeholder='Nome'
                value={personalInfo.name}
                onChange={handlePersonalInfoChange}
              />
              {/* ... (other input fields for personal info) ... */}
              <h2>Dados de Envio</h2>
              </>
              )}
            </div>
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
          handleClose={handlePopupClose}
        />
      )}
    </>
  );
}

export default App;

export default App;





