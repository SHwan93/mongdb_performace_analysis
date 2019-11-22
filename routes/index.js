var express = require('express')
var router = express.Router()
const post = require('../model/post'),
  index_post = require('../model/index_post'),
  de_post = require('../model/de_post'),
  review = require('../model/review'),
  index_review = require('../model/index_review'),
  uuidv4 = require('uuid/v4');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.put('/sampleData', async(req, res) => {
  
  try {
    
    for (let i = 0; i < 10; i++) {
      
      let postUID = uuidv4()
      let reviewUIDs = []
  
      await post.create({
        uid: postUID,
        title: `dummy ${i}`,
        category: `${i}`
      })

      await index_post.create({
        uid: postUID,
        title: `dummy ${i}`,
        category: `${i}`
      })
  
      for (let j = 0; j < 10000; j++) {
        let reviewUID = uuidv4()
        reviewUIDs.push(reviewUID)
  
        await review.create({
          uid: reviewUID,
          post: postUID
        })  
        await index_review.create({
          uid: reviewUID,
          post: postUID
        })  
      }
  
      await de_post.create({
        uid: postUID,
        title: `dummy ${i}`,
        category: `${i}`,
        reviews: reviewUIDs
      })
      reviewUIDs = []
      
    }
    res.status(200).send()

  } catch (error) {
    console.log(error);
    
    res.status(500).send(error)
  }

})

/**
 * DB level 의 join
 */
router.get('/join', async(req, res) => {

  try {
    let times = 0
    
    for (let i = 0; i < 100; i++) {

      let startTime = new Date().getTime()

      await post.aggregate([
        {
          $match: {
            title: 'dummy 0'
          }
        }, {
          $lookup: {
            from: "review",
            localField: "uid",
            foreignField: "post",
            as: "review"
          }
        }])
      
      let endTime = new Date().getTime()
      times += (endTime - startTime)

    }

    
    res.status(200).send(`${times / 1000}`)

  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }

})

/**
 * DB level 의 join / indexing 처리된 collection
 */
router.get('/joinIndex', async(req, res) => {

  try {
    let times = 0
    
    for (let i = 0; i < 100; i++) {

      let startTime = new Date().getTime()

      await index_post.aggregate([
        {
          $match: {
            title: 'dummy 0'
          }
        }, {
          $lookup: {
            from: "index_review",
            localField: "uid",
            foreignField: "post",
            as: "review"
          }
        }])
      
      let endTime = new Date().getTime()
      times += (endTime - startTime)

    }

    
    res.status(200).send(`${times / 1000}`)

  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }

})

/**
 * application level 의 join
 */
router.get('/joinInapp', async(req, res) => {

  try {
    let times = 0
    
    for (let i = 0; i < 100; i++) {

      let startTime = new Date().getTime()

      let result = await post.findOne({
        title: 'dummy 0'
      })

      await review.find({
        post: result.uid
      })
      
      let endTime = new Date().getTime()
      times += (endTime - startTime)

    }
    
    res.status(200).send(`${times / 1000}`)

  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
})

/**
 * application level 의 join / indexing 처리된 collection
 */
router.get('/joinInappIndex', async(req, res) => {

  try {
    let times = 0
    
    for (let i = 0; i < 100; i++) {

      let startTime = new Date().getTime()

      let result = await index_post.findOne({
        title: 'dummy 0'
      })

      await index_review.find({
        post: result.uid
      })
      
      let endTime = new Date().getTime()
      times += (endTime - startTime)

    }
    
    res.status(200).send(`${times / 1000}`)

  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
})

/**
 * 비정규화
 */
router.get('/denormalization', async(req, res) => {

  try {
    let times = 0
    
    for (let i = 0; i < 100; i++) {

      let startTime = new Date().getTime()

      let result = await de_post.findOne({
        title: 'dummy 0'
      })
      
      let endTime = new Date().getTime()
      times += (endTime - startTime)

    }
    
    res.status(200).send(`${times / 1000}`)

  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
})

module.exports = router;
