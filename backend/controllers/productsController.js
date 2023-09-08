// database,collection จะปรากฏเมื่อ import model
const Products = require('../models/products');

exports.getAllProducts = async (req, res) => {
  try {
    const data = await Products.find();
    if (data.length === 0 || data === undefined) {
      return res.json({ error: false, message: 'Products collection is empty' });
    }
    res.json({ results: data });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
};

exports.updateProduct = async (req, res) => {
  const skuToUpdate = req.params.sku;
  const updateData = {
    propNameMain: req.body.propNameMain,
    propValueMain: req.body.propValueMain,
    propNameSub: req.body.propNameSub,
    propValueSub: req.body.propValueSub
  };

  try {
    const updatedProduct = await Products.findOneAndUpdate(
      { sku: skuToUpdate }, // ค้นหาสินค้าที่ต้องการอัพเดตด้วย SKU
      updateData, // ข้อมูลที่ต้องการอัพเดต
      { new: true } // ตั้งค่าเพื่อให้คืนค่าเป็นข้อมูลหลังจากอัพเดตเสร็จ
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.cancelAllProperty = async (req, res) => {
  try {
    // สร้างออบเจ็กต์ที่ใช้ในการเปลี่ยนค่า properties ให้เป็นค่าว่าง
    const updateData = {
      propNameMain: '',
      propValueMain: '',
      propNameSub: '',
      propValueSub: ''
    };

    // อัปเดตเอกสารทุกเอกสารใน collection ให้มีค่า properties เป็นค่าว่าง
    const updateResult = await Products.updateMany({}, { $set: updateData });

    // ตรวจสอบผลลัพธ์จากการอัปเดต และส่งผลลัพธ์กลับเป็น JSON
    return res.json(updateResult);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

exports.cancelSingleProperty = async (req, res) => {
  const sku = req.params.sku;

  try {
    const updateData = {
      propNameMain: '',
      propValueMain: '',
      propNameSub: '',
      propValueSub: ''
    };

    const updateResult = await Products.findOneAndUpdate({ sku: sku }, { $set: updateData });

    return res.json(updateResult);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

// add ทีละหลายๆ data หรือบันทึกข้อมูล
exports.addManyProduct = async (req, res) => {
  try {
    await Products.insertMany();
    res.json({ message: 'Inserted products successfully' });
  } catch (error) {
    console.error('Error inserting products:', error);
  }
};

// ลบ data ทั้งหมดใน collection
exports.deleteManyProduct = async (req, res) => {
  try {
    await Products.deleteMany({});
    res.json({ message: 'Deleted all documents successfully' });
  } catch (error) {
    console.error('Error deleting documents:', error);
  }
};
