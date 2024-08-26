const mongoose = require("mongoose");
const express = require("express");
const cors=require("cors")


const app = express();
app.use(cors());

// Database Connection
mongoose.connect("mongodb://localhost:27017/Crud")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Something went wrong..!");
  });

const crudSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const crudModel = mongoose.model("crudData", crudSchema);

app.use(express.json());

// Post Method to create users
app.post("/create", (req, res) => {
  try {
    const user = req.body;
    crudModel.create(user)
      .then((data) => {
        res.send({ data: "data" });
      })
      .catch((err) => {
        res.send({ message: "Something went wrong..!" });
      });
  } catch (error) {
    res.send(error);
  }
});

// Get method to fetch all users
app.get("/fetchallusers", (req, res) => {
  try {
    crudModel.find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (error) {
    res.send(error);
  }
});

// Get method to fetch single user
app.get("/fetchsingleuser/:id",  (req, res) => {
  try {
    const singleUser = req.params.id;
     crudModel.findById(singleUser)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (error) {
    res.send(error);
  }
});

// Put method
app.put("/update/:id", (req, res) => {
try{
  const user=req.body;
  crudModel.updateOne({_id:req.params.id},user)
  .then((data)=>{res.send(data)})
  .catch((err)=>{res.send(err)})
}
catch(error){
    console.log(error);
}
});

// Delete method
app.delete("/del/:id", (req, res) => {
    try{
        crudModel.deleteOne({_id:req.params.id})
        .then(()=>{res.send({message:"Product Deleted Successfully..!!"})})
        .catch((err)=>{res.send(err)})
      }
      catch(error){
          console.log(error);
      }
});

app.listen(7000, () => {
  console.log("Server Running..!");
});
