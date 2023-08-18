import axios from 'axios';

const paypalClientId = 'AVMI7am8CUTe3qaN4lI7c_-GiHxqAYoWClH142plQJ9VjU-NXT8vfsW9DT88A88gdEGltqLXm4PQ5_-z';
const paypalSecret = 'EOKKtKVonqUX-CGBiKF9MNfJkpPhI070o9AXfqKDE8htB-8bKtvdwznOnPdb01z_WTq-uyfSmYY4_tlq';

const paypalAuth = Buffer.from(`${paypalClientId}:${paypalSecret}`).toString('base64');

const paypalApiBaseUrl = 'https://api.sandbox.paypal.com/v2';

export async function createPayPalOrder() {
  try {
    const response = await axios.post(
      `${paypalApiBaseUrl}/checkout/orders`,
      {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: '10.00', // Valor do pagamento
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Basic ${paypalAuth}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Erro ao criar ordem de pagamento do PayPal:', error.response.data);
    throw error;
  }
}
