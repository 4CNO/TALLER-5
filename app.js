const express = require('express');
const path    = require('path');
const connectDB = require('./src/config/database');
const paisRoutes = require('./src/routes/pais.routes');

const app  = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

connectDB();

app.use('/paises', paisRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api', (req, res) => {
  res.json({
    message: '🚀 API División Política funcionando',
    version: '1.0.0',
    endpoints: [
      'GET    /paises',
      'GET    /paises/:id',
      'POST   /paises',
      'PUT    /paises/:id',
      'DELETE /paises/:id'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`✅ API corriendo en http://localhost:${PORT}`);
});
