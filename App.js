const express = require('express');
const connectDB = require('./config/db.js');
const router = express.router();
const User = require('../models/User.js');
const app = express();

app.use(express.json());

router.post('app/create', async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const user = new User({
      name,
      email,
      age,
    });

    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get("app/getUsers",aysnc(req,res) => {
  try{ 
     const users = await User.find();
     res.status(200).json({
       message:"users fetched successfully",
       data:users;
     }) 

  }catch(err){
    console.log(err);
    res.status(500).json({
      message:err.message
    })
  }
})


router.get("app/getUsers/:id",async(req,res) => {
  try{
       const {id} = req.params;

       const fetchDetails = await User.findById(id);
       res.status(200).json({
         message:"user details found successfully",
         data:fetchDetails
       })
  }catch(err){
    res.status(500).json({
      message:err.message
    })
  }
})

router.get("app/getUsers/:id",async(req,res) => {
  try{
       const {id} = req.params;

       const fetchDetails = await User.findOne({_id:id});
       res.status(200).json({
         message:"user details found successfully",
         data:fetchDetails
       })
  }catch(err){
    res.status(500).json({
      message:err.message
    })
  }
})

router.patch("app/getUsers/:id", async(req,res) => {
  try{
    const {id} = req.params;
    const updateData = await User.findByIdAndUpdate(
      id,
      req.body);
      if(!updateData){
        return res.status(404).json({
           message:"User not found"
         })
      }

        res.status(200).json({
          message:"updated succesfully",
          data:updateData
        })
      

     

  }catch(err){
      res.status(500).json({
        message:err.message
      })
  }
})

router.delete("app/getUsers/:id" ,async (req,res) => {
  try{
     const {id} = req.params;

     const deleteUser = await User.findByIdAndDelete(id);
     
     res.status(200).json({
       message:"user delete successfully",

     })
  }catch(err){
    res.staus(500).json({
      message:err.message
    })
  }
})

router.delete("/deleteUsers", async (req, res) => {
  try {
      const { ids } = req.body;

      const result = await User.deleteMany({
          _id: { $in: ids }
      });

      res.status(200).json({
          message: "Users deleted successfully",
          data: result
      });

  } catch (err) {
      res.status(500).json({
          message: err.message
      });
  }
});

router.patch("/updateUsers", async (req, res) => {
  try {
      const { ids, city } = req.body;

      const updateUsers = await User.updateMany(
          { _id: { $in: ids } },
          { $set: { city: city } }
      );

      res.status(200).json({
          message: "Users updated successfully",
          data: updateUsers
      });

  } catch (err) {
      res.status(500).json({
          message: err.message
      });
  }
});
connectDb()
  .then(() => {
    console.log('Database connection established');
    app.listen(3000, () => {
      console.log('Server is successfully listening on port 3000');
    });
  })
  .catch(() => {
    console.error('Database cannot be connected');
  });
