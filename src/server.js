const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors');

const app = express();

// Configurar o CORS
app.use(cors({
    origin: 'http://localhost:3001',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));

// Middleware
app.use(bodyParser.json());
app.use('/api', postRoutes);

// Conectando com MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-app';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado ao MongoDB!'))
    .catch(err => console.log('Erro ao conectar ao MongoDB:', err));

app.get('/', (req, res) => {
    res.send('API Blogging funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
