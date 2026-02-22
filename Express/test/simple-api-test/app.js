import express from 'express';
import multer from 'multer';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.text());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })


app.post('/',upload.single('fileData'), (req, res, next) => {
  console.log(req.url);
  console.log(req.file);
  console.log(req.body);
  console.log(req.query);
  res.status(201).json({message : "request recieved"});
})

app.listen(3000, () => {
  console.log(`server is listening on port : 3000`)
})



