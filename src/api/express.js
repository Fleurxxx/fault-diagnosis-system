const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();

app.get('/read-csv', (req, res) => {
  const csvFilePath = 'src/assets/csv/preprocess_train.csv'; // 请替换为实际的CSV文件路径

  const results = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      results.push(row);
    })
    .on('end', () => {
      res.json(results);
    })
    .on('error', (error) => {
      res.status(500).json({ error: 'Error reading CSV file' });
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
