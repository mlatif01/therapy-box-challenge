const router = require('express').Router();
const parseString = require('xml2js').parseString;
const newsUrl = 'http://feeds.bbci.co.uk/news/rss.xml';
const axios = require('axios').default;
// Auth
const auth = require('../config/auth');

/**
 * GET
 * XML BBC News Converted in JSON
 */
router.get('/', async (req, res) => {
  // get xml news data
  try {
    const xmlRes = await axios.get(newsUrl);
    // parse xml response data
    const parsedXml = parseString(xmlRes.data, (err, result) => {
      const json = JSON.stringify(result);
      res.send(json);
    });
  } catch (err) {
    console.log(err.message);
  }
})


// Export
module.exports = router;