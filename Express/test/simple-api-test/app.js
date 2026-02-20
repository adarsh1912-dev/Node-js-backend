import express from 'express';

const app = express();

app.get('/', (req, res, next) => {
  
  res.status(200).header('Content-Type', 'html').send('<h1>Welcome to Express API</h1>');

});

app.listen('4000', () => {
  console.log('server is running on port 4000');
})