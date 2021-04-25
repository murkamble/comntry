const express = require("express");
const env = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


//environment variable or you can say constants
const app = express();
app.use(bodyParser());
env.config();

// mongoose Databases connection string
mongoose.connect(
  // 'mongodb://localhost:27017/baazar', 
  'mongodb+srv://root:root@cluster0.a0xhf.mongodb.net/inBaazaar?retryWrites=true&w=majority',
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
  }
).then(() => {
  console.log('Databases Connected...');
});

// 
// app.get("/", ( req, res) => {
//     res.status(200).json({ message: 'Welcome, server side.' })
// });

// routes
const userRoutes = require('./routes/user');

// API
app.use('/api', userRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});