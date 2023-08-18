import React from 'react';

const Summary = ({ total, handlePayPalCheckout }) => {
  return (
    <>
      <div className='box'>
        <header>Resumo da compra</header>
        <div className='info'>
          <div>
            <span>Sub-total</span>
            <span>$ {total}</span>
          </div>
          <div>
            <span>Shipment</span>
            <span>Free</span>
          </div>
          <div>
            <button className='popup-button'> {/* Adicione a classe popup-button aqui */}
              Adicionar cupom de desconto
              <i className='bx bx-right-arrow-alt'></i>
            </button>
          </div>
        </div>
        <footer>
          <span>Total</span>
          <span>$ {total}</span>
        </footer>
        <button id='button-checkout-box' onClick={() => handlePayPalCheckout(total)}>Finalizar Compra</button>
      </div>
    </>
  );
};

export default Summary;
