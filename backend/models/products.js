const mongoose = require('mongoose');

// ออกแบบ schema
const productSchema = mongoose.Schema({
  title: String,
  sku: String,
  propNameMain: String,
  propValueMain: String,
  propNameSub: String,
  propValueSub: String
});

// สร้าง model ซึ่งเป็นตัวแทนของ collection นั้นๆ
// products เป็นชื่อ model หรือเป็น collection ที่อยู่ในฐานข้อมูล
const Products = mongoose.model('products', productSchema);

// ส่งออก model
module.exports = Products;
