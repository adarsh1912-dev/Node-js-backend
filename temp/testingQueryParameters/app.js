import express from 'express';


const app = express();

app.use(express.json());


app.get('/', (req,res,next) => {
    const {firstName, lastName} = req.query;
    console.log(req.query);

    res.end(`Hello from express ${firstName} ${lastName}`);
})


app.listen(4000, () => {
    console.log('server is listening on port: 4000');
})