import "dotenv/config";
import express from 'express';
import * as PayPal from "./paypal-api.js";

const port = process.env.PORT || 8888;

const { CLIENT_ID, APP_SECRET } = process.env;
const baseURL = {
    sandbox: 'https://api-m.sandbox.paypal.com',
    production: 'https://api-m.paypal.com'
};

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));


async function generateAccessToken() {
    const auth = Buffer.from(`${CLIENT_ID}:${APP_SECRET}`).toString('base64');
    const response = await axios.post(`${baseURL.sandbox}/v1/oauth2/token`, 'grant_type=client_credentials', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${auth}`
        }
    });
    return response.data.access_token;
}

app.post("/api/orders/:orderID/capture", async (req, res) => {
    const { orderID } = req.params;
    try {
      accessToken = await generateAccessToken();
      const captureData = await axios.post(`${baseURL.sandbox}/v2/checkout/orders/${orderID}/capture`, null, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
      });
      res.json(captureData.data);
    } catch (err) {
      res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}/`);
});
