# PayPal Checkout Integration 

This is a project for integrating PayPal Checkout for the test provided by the Robert Half company. The project allows customers to make online purchases and payments using the PayPal API.

## Description

The project consists of a web application that allows customers to select products from the Mobile World Store, fill in personal and shipping information, and complete the purchase using PayPal Checkout.

## Features

- Display of products from the store.
- Form for filling in personal and shipping information.
- Integration with the PayPal API for payment processing.

## Technologies Used

- HTML
- CSS
- JavaScript
- PHP

## PHP Methods Used

### `generateAccessToken($clientId, $clientSecret)`

This method is responsible for generating the access token for the PayPal API, required for making requests to the API.

### `createOrder($accessToken, $postData)`

This method creates a purchase order using the PayPal API. It sends the purchase and customer data to PayPal and returns the approval URL for the purchase.

## Usage Instructions

1. Clone the repository to your development environment.
2. Configure the client keys (`$clientId` and `$clientSecret`) in the `index.php` file.
3. Make sure the environment settings (sandbox or production) are correct.
4. Run the PHP server (e.g., `php -S localhost:8000`).
5. Access the application in your browser (e.g., `http://localhost:8000`).

## Preview

You can check out a preview of the project <a href="https://paypal.d3f4lt.com.br/" target="_blank">here.</a>

## Notes

Be sure to configure the redirection URLs in the PayPal settings panel to ensure that post-purchase redirections work correctly.

## Author

Leonardo Matheus da Silva

## License

This project is licensed under the MIT License.
