require('dotenv').config();
const express = require('express');
const mercadopago = require('mercadopago');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Configurar credencial do Mercado Pago
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

// Middlewares
app.use(cors()); // permite chamadas de outros domínios (como o frontend)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// Rota principal (pode ignorar se não estiver usando páginas no backend)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para criar preferência
app.post('/create_preference', async (req, res) => {
  const { title, price } = req.body;

  const preference = {
    items: [
      {
        title,
        unit_price: Number(price),
        quantity: 1,
      },
    ],
    back_urls: {
      success: 'http://localhost:3000/success',
    },
    auto_return: 'approved',
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ init_point: response.body.init_point });
  } catch (error) {
    console.error('Erro ao criar preferência:', JSON.stringify(error, null, 2));
res.status(500).json({ error: 'Erro ao criar preferência', detail: error });

  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
