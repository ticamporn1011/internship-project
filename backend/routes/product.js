const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  addManyProduct,
  deleteManyProduct,
  updateProduct,
  cancelAllProperty,
  cancelSingleProperty
} = require('../controllers/productsController');

router.get('/products', getAllProducts);
router.put('/updateProduct/:sku', updateProduct);
router.put('/cancelAllProperty', cancelAllProperty);
router.put('/cancelSingleProperty/:sku', cancelSingleProperty);

// เพิ่มและลบ ducument ทั้งหมด
router.post('/inserts', addManyProduct);
router.delete('/deletes', deleteManyProduct);

module.exports = router;
