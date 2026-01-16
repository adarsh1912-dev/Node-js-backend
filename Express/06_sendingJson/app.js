import express from 'express'

const app = express();
const port = 4000;

app.get('/', (req,res) => {
    res.status(200).json({message : "Hello world!"}); // res.status returns res object so we can chain it like this
})

app.listen(port, () => {
    console.log(`app listening on port : ${port}`);
});