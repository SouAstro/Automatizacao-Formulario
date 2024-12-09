const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Configuração do servidor
const app = express();
const port = 3000;
app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sgp',
});

db.connect();

// Endpoint para processar as indicações
app.post('/processar_indicacao', (req, res) => {
  const { nome_cliente, email_cliente, celular_amigo } = req.body;

  if (!nome_cliente || !email_cliente || !celular_amigo) {
    return res.status(400).json({ message: 'Dados inválidos.' });
  }

  // Verificar se o celular do amigo existe no banco
  db.query(
    'SELECT id FROM clientes WHERE celular = ?',
    [celular_amigo],
    (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Erro no servidor.' });
      }

      if (results.length > 0) {
        // Se encontrar o amigo, registrar a indicação
        db.query(
          'SELECT COUNT(*) AS total FROM indicacoes WHERE celular_indicado = ?',
          [celular_amigo],
          (error, totalResults) => {
            if (error) {
              return res.status(500).json({ message: 'Erro no servidor.' });
            }

            const totalInd = totalResults[0].total;

            if (totalInd >= 2) {
              // Se o cliente indicou 2 amigos, atualizar mensalidade
              db.query(
                'UPDATE clientes SET mensalidade_pago = TRUE WHERE email_cliente = ?',
                [email_cliente],
                (error) => {
                  if (error) {
                    return res.status(500).json({ message: 'Erro ao atualizar mensalidade.' });
                  }
                  return res.status(200).json({ message: 'Mensalidade gratuita concedida!' });
                }
              );
            } else {
              return res.status(200).json({ message: 'Indicação registrada com sucesso!' });
            }
          }
        );
      } else {
        return res.status(404).json({ message: 'Celular do amigo não encontrado no sistema.' });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
