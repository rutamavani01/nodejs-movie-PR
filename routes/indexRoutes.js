const express = require('express');

const routes = express.Router();

const multer  = require('multer')

const userControllers = require('../controllers/userControllers');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage }).single('image');

routes.get('/',userControllers.view);
routes.get('/add',userControllers.add);
routes.post('/addRecord',upload,userControllers.addRecord);
routes.get('/deleteRecord',userControllers.deleteRecord);
routes.get('/editRecord',upload,userControllers.editRecord);
routes.post('/updateRecord',upload,userControllers.updateRecord);

module.exports= routes;