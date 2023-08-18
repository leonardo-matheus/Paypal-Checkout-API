import React from 'react';
import './popup.scss';

const Popup = ({
  personalInfo,
  shippingInfo,
  handlePersonalInfoChange,
  handleShippingInfoChange,
  handlePayPalCheckout,
  handleClose,
}) => {
  return (
    <div className='popup'>
      <div className='popup-content'>
        <h2>Dados Pessoais</h2>
        <div className='form-section'>
          <div className='form-row'>
            <input
              type='text'
              name='firstName'
              placeholder='Nome'
              value={personalInfo.firstName}
              onChange={handlePersonalInfoChange}
            />
            <input
              type='text'
              name='lastName'
              placeholder='Sobrenome'
              value={personalInfo.lastName}
              onChange={handlePersonalInfoChange}
            />
          </div>
          <div className='form-row'>
            <input
              type='email'
              name='email'
              placeholder='E-mail'
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
            />
            <input
              type='tel'
              name='phone'
              placeholder='Telefone'
              value={personalInfo.phone}
              onChange={handlePersonalInfoChange}
            />
          </div>
        </div>
        <h2>Dados de Envio</h2>
        <div className='form-section'>
          <input
            type='text'
            name='address'
            placeholder='Endereço'
            value={shippingInfo.address}
            onChange={handleShippingInfoChange}
          />
          <div className='form-row'>
            <input
              type='text'
              name='city'
              placeholder='Cidade'
              value={shippingInfo.city}
              onChange={handleShippingInfoChange}
            />
            <input
              type='text'
              name='state'
              placeholder='Estado'
              value={shippingInfo.state}
              onChange={handleShippingInfoChange}
            />
            <input
              type='text'
              name='zipCode'
              placeholder='CEP'
              value={shippingInfo.zipCode}
              onChange={handleShippingInfoChange}
            />
          </div>
        </div>
        <button className='paypal-checkout-button' onClick={handlePayPalCheckout}>Finalizar Compra com PayPal</button>
      </div>
    </div>
  );
};

export default Popup;
