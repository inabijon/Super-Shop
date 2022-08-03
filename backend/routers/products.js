const express = require('express')
const router = express.Router()
const { Product } = require('../models/products')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

// ************************GET ALL ********************************

router.get('/', async (req, res) => {
  let length = (await Product.find()).length

  let products = await Product.aggregate([
    {
      $match: {
        new: false
      },
    },
    { $sample: { size: length } },
  ])
  if (!products) {
    return res.status(404).json({
      message: 'products are Empty',
    })
  }
  res.send(products)
})

// ************************GET ALL 2********************************

router.get('/view-all', async (req, res) => {
  let length = (await Product.find()).length

  let products = await Product.aggregate([
    { $sample: { size: length } },
  ])
  if (!products) {
    return res.status(404).json({
      message: 'products are Empty',
    })
  }
  res.send(products)
})

router.get('/view-all/sort/:min/:max', async (req, res) => {

  let products = await Product.find({ price: { $gte: req.params.min, $lte: req.params.max } })
  if (!products) {
    return res.status(404).json({
      message: 'products are Empty',
    })
  }
  res.send(products)
})

router.get('/view-all/search/:key', async (req, res) => {

  let products = await Product.find({ $or: [{ name: { $regex: req.params.key } }, { categoryName: { $regex: req.params.key } }] })
  if (!products) {
    return res.status(404).json({
      message: 'products are Empty',
    })
  }
  res.send(products)
})



// ********************** TOTAL SUM ********************************
router.get('/budget', async (req, res) => {
  const Sum = await Product.find()
  let sum = 0
  let TotalSum = await Product.aggregate([
    {
      $group: {
        _id: null,
        TotalAmount: {
          $sum: '$price',
        },
      },
    },
  ])
  if (!Sum) {
    return res.status(404).json({
      message: 'products is Empty',
    })
  }
  res.send(TotalSum)
})

// ******************Suggest for you***************************
router.get('/suggest', async (req, res) => {
  let l = (await Product.find()).length

  let suggest = await Product.aggregate([
    {
      $match: {
        new: false
      },
    },
    { $sample: { size: 6 } },
  ])
  if (!suggest) {
    return res.status(404).json({
      message: 'products are Empty',
    })
  }
  res.send(suggest)
})

// ******************REcommend for you***************************
router.get('/recommend/:name', async (req, res) => {
  let l = (await Product.find()).length

  let suggest = await Product.aggregate([
    { $match: { $nor: [{ name: req.params.name }] } },
    { $sample: { size: 4 } },
  ])
  if (!suggest) {
    return res.status(404).json({
      message: 'products are Empty',
    })
  }
  res.send(suggest)
})

// ******************* phones********************
router.get('/phones', async (req, res) => {
  let phones = await Product.find({ categoryName: 'phone' })
  if (!phones) {
    res.json({
      message: 'products is empty',
    })
  }
  res.send(phones)
})

// ******************* GET watches********************
router.get('/watches', async (req, res) => {
  let watches = await Product.find({
    categoryName: 'watch',
  })
  if (!watches) {
    res.json({ message: 'watches are empty' })
  }
  res.send(watches)
})

// ******************* GET headphones********************
router.get('/headphones', async (req, res) => {
  let headphones = await Product.find({
    categoryName: 'headphone',
  })
  if (!headphones) {
    res.json({ message: 'headphones are empty ' })
  }
  res.send(headphones)
})

// ******************* GET cosmetology********************
router.get('/cosmetology', async (req, res) => {
  let cosmetology = await Product.find({
    categoryName: 'cosmetology',
  })
  if (!cosmetology) {
    res.json({
      message: 'Cosmetology are empty',
    })
  }
  res.send(cosmetology)
})

// ****************** GET plants********************
router.get('/plants', async (req, res) => {
  let plants = await Product.find({
    categoryName: 'plant',
  })
  if (!plants) {
    res.json({
      message: 'plants are empty',
    })
  }
  res.send(plants)
})

// ******************* GET shoes********************
router.get('/shoes', async (req, res) => {
  let shoes = await Product.find({
    categoryName: 'shoes',
  })
  if (!shoes) {
    res.json({
      message: 'shoes are empty',
    })
  }
  res.send(shoes)
})

// ******************* GET sunglasses********************
router.get('/sunglasses', async (req, res) => {
  let sunglasses = await Product.find({
    categoryName: 'sunglass',
  })
  if (!sunglasses) {
    res.json({
      message: 'sunglasses are empty',
    })
  }
  res.send(sunglasses)
})

// ******************* GET technologies********************
router.get('/technologies', async (req, res) => {
  let technologies = await Product.find({
    categoryName: 'technology',
  })
  if (!technologies) {
    res.json({
      message: 'technologies are empty',
    })
  }
  res.send(technologies)
})

// *****************GET SORT BY DATE****************************
router.get('/date', async (req, res) => {
  const products = await Product.find().sort({ createdDate: 1 })
  res.send(products)
})

// *****************GET SORT BY New****************************
router.get('/new', async (req, res) => {
  const arrive = await Product.find({ new: true })
  res.send(arrive)
})

// Suggest for you

router.get('/new/limit', async (req, res) => {
  let suggest = await Product.aggregate([
    { $match: { new: true } },
    { $sort: { createdDate: -1 } },
    { $limit: 6 },
  ])
  if (!suggest) {
    return res.status(404).json({
      message: 'products are Empty',
    })
  }
  res.send(suggest)
})

// *****************GET SORT BY SALE****************************
router.get('/discounts', async (req, res) => {
  const discounts = await Product.find({ sale: true })
  res.send(discounts)
})

router.get('/discounts/limit', async (req, res) => {
  let discount = await Product.aggregate([
    { $match: { sale: true } },
    { $sort: { createdDate: -1 } },
    { $limit: 8 },
  ])
  if (!discount) {
    return res.status(404).json({
      message: 'products are Empty',
    })
  }
  res.send(discount)
})

// *****************GET SORT BY SEARCH****************************
router.get('/search/:key', async (req, res) => {
  const products = await Product.find({
    $or: [{ name: { $regex: req.params.key } }],
  })
  if (!products) {
    res.status(404).json({
      message: 'No result',
    })
  }
  res.send(products)
})

// *******************GET BY ID ******************************
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return res.status(404).send('That type of id not found')
  }
  res.send(product)
})

// TODO **********************NEW PRODUCT**********************************
router.post('/', async (req, res) => {
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    imgUrl: req.body.imgUrl,
    price: req.body.price,
    categoryName: req.body.categoryName,
    new: req.body.new,
    sale: req.body.sale,
    salePrice: req.body.salePrice,
    qtyTotal: req.body.qtyTotal,
    total: req.body.total,
  })
  product = await product.save()

  res.status(201).send(product)
})


// ? ****************** UPDATE FOOD *****************************
router.put('/:id', [auth, admin], async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      imgUrl: req.body.imgUrl,
      price: req.body.price,
      categoryName: req.body.categoryName,
      new: req.body.new,
      sale: req.body.sale,
      salePrice: req.body.salePrice,
      qtyTotal: req.body.qtyTotal,
      total: req.body.total,
    },
    {
      new: true,
    },
  )
  if (!product) {
    return res.status(404).send('That type of id not found')
  }

  res.status(201).send(product)
})

// ! ******************DELETE PRODUCTS***************************
router.delete('/:id', async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id)
  if (!product) {
    return res.status(404).send('That type of id not found...')
  }
  res.send(product)
})

module.exports = router
