import express from 'express';

const app = express();
const port = 3000;

app.use(require('./routes/users'))

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});

// Me cago en to tus muertos, tu quien eres?, eh, tu quien eres?
// Toma te borro la linea xd
