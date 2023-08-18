<?php
$clientId = 'AW0LmNiFD8OB03fbQpODRVlKFb4H_AwGQtiQF5MCrEejuR_S-Ub9S3KmKRam3UsvV4BtucCa11kZYbT8';
$clientSecret = 'ECh98ZcewVQHFdouc4V-mqemC3GVW4oDZOyXev5JSGOiPWOEcoMP4XXCg5QxSaZRvd4BQ1-fpiSlbGIy';

$accessToken = generateAccessToken($clientId, $clientSecret);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $firstName = $_POST['first-name-input'];
    $lastName = $_POST['last-name-input'];
    $email = $_POST['email-input'];
    $phone = $_POST['phone-input'];
    $address = $_POST['address-input'];
    $city = $_POST['city-input'];
    $state = $_POST['state-input'];
    $postalCode = $_POST['postal-code-input'];

    $products = isset($_POST['products']) ? $_POST['products'] : [];

    $items = [];
    $total = 0;

    foreach ($products as $productJson) {
        $productData = json_decode($productJson, true);

        if (!empty($productData['price']) && !empty($productData['name'])) {
            $items[] = [
                'name' => $productData['name'],
                'unit_amount' => [
                    'currency_code' => 'USD',
                    'value' => number_format($productData['price'], 2),
                ],
                'quantity' => 1,
            ];
            $total += floatval($productData['price']);
        } else {
            echo "Erro: dados do produto inválidos.";
            exit();
        }
    }

    $purchaseUnits = [
        [
            'reference_id' => 'store_mobile_world_order_1234',
            'description' => 'Mobile World Store order-1234',
            'amount' => [
                'currency_code' => 'USD',
                'value' => number_format($total, 2),
                'breakdown' => [
                    'item_total' => [
                        'currency_code' => 'USD',
                        'value' => number_format($total, 2),
                    ],
                ],
            ],
            'items' => $items,
            'shipping' => [
                'address' => [
                    'address_line_1' => $address,
                    'admin_area_1' => $state,
                    'admin_area_2' => $city,
                    'postal_code' => $postalCode,
                    'country_code' => 'US',
                ],
            ],
        ],
    ];

    $postData = [
        'intent' => 'CAPTURE',
        'payer' => [
            'name' => [
                'given_name' => $firstName,
                'surname' => $lastName,
            ],
            'email_address' => $email,
            'phone' => [
                'phone_number' => [
                    'national_number' => $phone,
                ],
            ],
        ],
        'purchase_units' => $purchaseUnits,
        'redirect_urls' => [
            'return_url' => './approved.php',  // Corrigido para 'approved.php'
            'cancel_url' => 'https://example.com/cancel',
        ],
    ];

    $orderId = createOrder($accessToken, $postData);

    if ($orderId) {
        header("Location: " . $orderId);
        exit();
    } else {
        echo "Failed to create order.";
        exit();
    }
}


function generateAccessToken($clientId, $clientSecret)
{
    $credentials = base64_encode("$clientId:$clientSecret");
    $url = 'https://api.sandbox.paypal.com/v1/oauth2/token';
    $headers = [
        'Authorization: Basic ' . $credentials,
        'Accept: application/json',
        'Accept-Language: en_US',
    ];

    $postFields = 'grant_type=client_credentials';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);

    $response = curl_exec($ch);
    curl_close($ch);

    $data = json_decode($response, true);
    return $data['access_token'] ?? '';
}

function createOrder($accessToken, $postData)
{
    $url = 'https://api-m.sandbox.paypal.com/v2/checkout/orders';
    $headers = [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $accessToken,
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));

    $response = curl_exec($ch);
    curl_close($ch);

    if (!$response) {
        echo "Erro ao fazer a solicitação para o PayPal: " . curl_error($ch);
        return false;
    }

    $data = json_decode($response, true);

    if (!$data || isset($data['error'])) {
        echo "Erro na resposta do PayPal: " . print_r($data, true);
        return false;
    }

    return $data['links'][1]['href'] ?? '';
}

?>
