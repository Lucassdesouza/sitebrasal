const express = require('express');
const xlsx = require('xlsx');
const { Client } = require('@microsoft/microsoft-graph-client');

const app = express();

const clientId = 'SEU_APPLICATION_ID'; 
const clientSecret = 'SEU_CLIENT_SECRET';

const client = Client.init({
  authProvider: (done) => {
    // Lógica de autenticação (fluxo de credenciais do cliente)
    done(null, 'SEU_ACCESS_TOKEN'); 
  }
});

app.get('/data', async (req, res) => {
  try {
    const response = await client
      .api('/me/drive/root:/caminho/para/sua_planilha.xlsx:/workbook/worksheets/{nome-da-planilha}/usedRange')
      .get();

    const data = xlsx.utils.sheet_to_json(response.values);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao acessar a planilha');
  }
});

app.listen(3000, () => console.log('API rodando na porta 3000'));