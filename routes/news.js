const router = require('express').Router();
const parseString = require('xml2js').parseString;
const bbcUrl = 'http://feeds.bbci.co.uk/news/rss.xml';
const axios = require('axios').default;
// Auth
const auth = require('../config/auth');

/**
 * GET
 * XML BBC News Converted in JSON
 */
router.get('/bbc', async (req, res) => {
  // get xml news data
  try {
    const xmlRes = await axios.get(bbcUrl);
    // parse xml response data
    const parsedXml = parseString(xmlRes.data, (err, result) => {
      const json = JSON.stringify(result);
      res.send(json);
    });
  } catch (err) {
    console.log(err.message);
  }
})

// should add in seperate route for clothes (in here for testing)
router.get('/clothes', auth, async (req, res) => {
  // get clothes data
  try {
    const response = await axios.get('https://therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil');
    const json = response.data.payload;
    res.send(json);
  } catch (err) {
    console.log(err.message);
  }
})

/**
 * GET
 * CSV Sport News
 */
// router.get('/sport', async (req, res) => {
//   // get xml news data
//   try {
//     const xmlRes = await axios.get(newsUrl);
//     // parse xml response data
//     const parsedXml = parseString(xmlRes.data, (err, result) => {
//       const json = JSON.stringify(result);
//       res.send(json);
//     });
//   } catch (err) {
//     console.log(err.message);
//   }
// })


// Export
module.exports = router;