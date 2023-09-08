const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//  import router
const productsRoute = require('./routes/product');

const app = express();
// connect to database
const dbUrl = 'mongodb://127.0.0.1:27017/dbProducts';
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedtopology: true
  })
  .then(() => console.log('เชื่อมต่อฐานข้อมูลเรียบร้อย'))
  .catch((err) => console.log(err));

// middleware
app.use(express.json());
app.use(cors());

// route เรียกใช้ router
app.use('/api', productsRoute);

app.listen(8080, () => console.log('Server is running in port 8080'));
