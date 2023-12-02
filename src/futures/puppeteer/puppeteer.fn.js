const Joi = require("joi");
const puppeteer = require("puppeteer");
const path = require('path')


const validInput = Joi.object({
    url: Joi.string().regex(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/)
  });
  

module.exports.takeScreenShutWithUrl = async (req, res)  => {
    try {
        const {error, value, warning} = validInput.validate(req.body);
        console.log(error, value, warning);
        if(error) return res.status(400).send("invalid request");

        // create a browser
        const browser  = await puppeteer.launch();

        // create new page 
       const page = await browser.newPage();

      // define view point of this page
      await page.setViewport({height:1000, width:1000});

      // goto url 
      await page.goto(req.body.url);


    // take screen shut 
    const imagePath = `src/uploads/${Date.now()}.png`
    await page.screenshot({path:imagePath})

    // send response to user 
    res.status(200).sendFile(path.join(path.resolve(), imagePath))
    } catch (error) {
     console.log(error); 
     res.status(400).send("something wrong");  
    }
}
