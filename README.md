# PayPal Checkout Integration 

Este é um projeto de integração com o PayPal Checkout para o teste fornecido pela empresa Robert Half. O projeto permite que os clientes façam compras online e realizem pagamentos usando a API do PayPal.

## Descrição

O projeto consiste em uma aplicação web que permite aos clientes selecionar produtos da Mobile World Store, preencher informações pessoais e de envio, e finalizar a compra utilizando o PayPal Checkout.

## Funcionalidades

- Exibição de produtos da loja.
- Formulário para preenchimento de informações pessoais e de envio.
- Integração com a API do PayPal para processamento de pagamentos.

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript
- PHP

## Métodos PHP Utilizados

### `generateAccessToken($clientId, $clientSecret)`

Este método é responsável por gerar o token de acesso para a API do PayPal, necessário para fazer solicitações à API.

### `createOrder($accessToken, $postData)`

Este método cria uma ordem de compra utilizando a API do PayPal. Ele envia os dados da compra e do cliente para o PayPal e retorna a URL de aprovação da compra.

## Instruções de Uso

1. Clone o repositório para o seu ambiente de desenvolvimento.
2. Configure as chaves do cliente (`$clientId` e `$clientSecret`) no arquivo `index.php`.
3. Certifique-se de que as configurações de ambiente (sandbox ou produção) estão corretas.
4. Execute o servidor PHP (ex: `php -S localhost:8000`).
5. Acesse a aplicação no seu navegador (ex: `http://localhost:8000`).

## Prévia

Você pode conferir uma prévia do projeto [aqui](paypal.d3f4lt.com.br).

## Observações

Certifique-se de configurar as URLs de redirecionamento no painel de configurações do PayPal para que os redirecionamentos após a compra funcionem corretamente.

## Autor

Leonardo Matheus da Silva

## Licença

Este projeto está licenciado sob a Licença MIT
