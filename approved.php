<?php
// Substitua esses valores pelos dados reais
$productName = "Smartphone XYZ";
$productPrice = "$499.99";

$firstName = "João da Silva";
$email = "joao@example.com";
$phone = "(123) 456-7890";

$address = "Rua das Flores, 123";
$city = "São Paulo";
$state = "SP";
$postalCode = "12345-678";

$totalAmount = "$499.99";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Compra Bem-sucedida</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        /* Coloque o CSS fornecido aqui */
        body {
            background-color: #f7f7f7;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .success-container {
            text-align: center;
            padding: 20px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
            max-width: 500px;
        }

        .success-icon {
            font-size: 64px;
            color: #4caf50;
        }

        .success-heading {
            font-size: 24px;
            margin: 10px 0;
            color: #333;
        }

        .success-details {
            font-size: 18px;
            margin: 10px 0;
            color: #666;
        }

        .details-label {
            font-weight: 500;
            color: #444;
        }
    </style>
</head>
<body>
    <div class="success-container">
        <div class="success-icon">&#10004;</div>
        <div class="success-heading">Compra Bem-sucedida!</div>
        <div class="success-details">
            <p class="details-label">Detalhes do Produto:</p>
            <p><strong>Nome do Produto:</strong> <?php echo $productName; ?></p>
            <p><strong>Preço:</strong> <?php echo $productPrice; ?></p>

            <p class="details-label">Informações Pessoais:</p>
            <p><strong>Nome:</strong> <?php echo $firstName; ?></p>
            <p><strong>Email:</strong> <?php echo $email; ?></p>
            <p><strong>Telefone:</strong> <?php echo $phone; ?></p>

            <p class="details-label">Informações de Envio:</p>
            <p><strong>Endereço:</strong> <?php echo $address; ?></p>
            <p><strong>Cidade:</strong> <?php echo $city; ?></p>
            <p><strong>Estado:</strong> <?php echo $state; ?></p>
            <p><strong>CEP:</strong> <?php echo $postalCode; ?></p>

            <p class="details-label">Valor Total:</p>
            <p><strong>Total:</strong> <?php echo $totalAmount; ?></p>
        </div>
    </div>
</body>
</html>