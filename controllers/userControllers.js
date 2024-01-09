const movieTbl = require('../models/movieTbl');
const fs = require('fs');

const view = async(req,res) => {
    try{
        let record = await movieTbl.find({});
        return res.render('view',{record});

    }catch(err){
        console.log(err);
        return false;
    }
}

const add = (req,res) => {
    return res.render('add');
}

const addRecord = async(req,res) => {
    try{
        let name = req.body.name;
        let desc = req.body.desc;
        let price = req.body.price;
        let image = req.file.path;

        let insertData = await movieTbl.create({
            name , desc, price, image
        })

        console.log(insertData);
        console.log("Data successfully inseted!!");
        return res.redirect('/');

    }catch(err){
        console.log(err);
        return false;
    }
}

const deleteRecord = async(req,res) => {
    let id = req.query.deleteId;
    try{
        let removeFile = await movieTbl.findById(id);
            fs.unlinkSync(removeFile.image);
        
        let deleteData = await movieTbl.findByIdAndDelete(id);
        console.log("Data Deleted!");
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return false;
    }
}

const editRecord = async(req,res) => {
    try{
        let editData = await movieTbl.findById(req.query.editId);
        return res.render('edit',{
           single : editData
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

const updateRecord = async (req, res) => {
//   let id = req.body.editid;
    if(req.file){
        try{
            let oldImage = await movieTbl.findById(req.body.editid);
            fs.unlinkSync(oldImage.image);
        }catch(err){
            console.log(err);
            return false;
        }

        try{
            let editData = await movieTbl.findByIdAndUpdate(req.body.editid,{
                name : req.body.name,
                desc : req.body.desc,
                price : req.body.price,
                image : req.file.path
            })
            console.log("Record Edited!");
            return res.redirect('/');
        }catch(err){
            console.log(err);
            return false;
        }
    }else{
        try{
            let editdata = await movieTbl.findById(req.body.editid)
            let update =await movieTbl.findByIdAndUpdate(req.body.editid,{
                name : req.body.name,
                desc : req.body.desc,
                price : req.body.price,
                image : editdata.image
            })
            console.log("Record Edited!");
            return res.redirect('/');
        }catch(err){
            console.log(err);
            return false;
        }
    }
};

module.exports = ({
    view , add , addRecord , deleteRecord , editRecord , updateRecord
})