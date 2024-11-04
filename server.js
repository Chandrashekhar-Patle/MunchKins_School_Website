require('dotenv').config()

const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static(path.join(__dirname, 'External')))
app.use(bodyParser.urlencoded({ extended: true }))// true

mongoose.connect(process.env.MONGOOSE)
.then(()=>{
    console.log("Database Connected Successfully");
})
.catch((e)=>{
    console.log("Error",e);
})


/*  Admission form Database and their Schemas */

const schemaAdmission = mongoose.Schema

const admissionSchema = new schemaAdmission ({
    fName: String,
    lName: String,
    phone_no: Number,
    email: String,
    address: String,
    state: String,

});

const AdmissionData = mongoose.model('AdmissionData', admissionSchema)

app.post('/admissionForm', (req, res) => {

    const {fName, lName, phone_no, email, address, state} = req.body

    const newdata = new AdmissionData({
        fName : req.body.fName,
        lName :req.body.lName,
        phone_no : req.body.phone_no,
        email : req.body.email,
        address :req.body.address,
        state : req.body.state,
    });
    newdata.save()
    res.redirect('/')
  })

  /****** For Fetching data from DataBase to send Admin Page**************/ 

app.get('/admissionForm', async (req, res) => {
    try {
        const data = await AdmissionData.find(); // Fetch all documents from FranchiseData
        console.log('Fetched data', data);
        res.json(data); // Send data as JSON response
    } catch (error) {
        console.error('Error fetching data from MongoDB', error);
        res.status(500).json({ message: "Server Error" });
    }
});


  /*  Admission form Database and their Schemas end here */

//<--------------------------------------------------------------------------------------->//

  /*  Franchise form Database and their Schemas */


const schemaFranchise = mongoose.Schema

const FranchiseSchema = new schemaFranchise({
    FullName : String,
    email : String,
    phoneNo : Number,
    location : String,
    message : String,
})

const FranchiseData = mongoose.model("FranchiseData", FranchiseSchema)

app.post('/franchiseForm', async(req,res)=>{
    const {FullName, email, phoneNo, location, message} = req.body

    const newdata = new FranchiseData({
        FullName : req.body.FullName,
        email : req.body.email,
        phoneNo : req.body.phoneNo,
        location : req.body.location,
        message : req.body.message,
    });
    newdata.save();
    res.redirect('/')

})

/****** For Fetching data from DataBase to send Admin Page**************/ 

app.get('/franchiseForm', async (req, res) => {
    try {
        const data = await FranchiseData.find(); // Fetch all documents from FranchiseData
        console.log('Fetched data', data);
        res.json(data); // Send data as JSON response
    } catch (error) {
        console.error('Error fetching data from MongoDB', error);
        res.status(500).json({ message: "Server Error" });
    }
});

  /*  Franchise form Database and their Schemas  End Here*/

//<--------------------------------------------------------------------------------------->//


/*  Get In Touch form Database and their Schemas */


const schemaGetInTouch = mongoose.Schema

const GetInTouchSchema = new schemaGetInTouch({
    yourName : String,
    childName : String,
    phoneNo : Number,
    yourSubject : String,
    message : String,
})

const getInTouchData = mongoose.model('getInTouchData', GetInTouchSchema)

app.post('/getInTouch', (req,res)=>{
    const {yourName, childName, phoneNo, yourSubject, message} = req.body

    const newdata = new getInTouchData({
        yourName : req.body.yourName,
        childName : req.body.childName,
        phoneNo : req.body.phoneNo,
        yourSubject : req.body.yourSubject,
        message : req.body.message,
    });
    newdata.save();
    res.redirect('/')
})


/****** For Fetching data from DataBase to send Admin Page**************/ 

app.get('/getInTouch', async (req, res) => {
    try {
        const data = await getInTouchData.find(); // Fetch all documents from FranchiseData
        console.log('Fetched data', data);
        res.json(data); // Send data as JSON response
    } catch (error) {
        console.error('Error fetching data from MongoDB', error);
        res.status(500).json({ message: "Server Error" });
    }
});

/*  Get In Touch form Database and their Schemas */

//<--------------------------------------------------------------------------------------->//


/*  Login  form Database and their Schemas validation */

const schemaLogin = mongoose.Schema

const LoginPageSchema = new schemaLogin({
    username : String,
    password : String,
})

const loginPageData = mongoose.model('loginPageData', LoginPageSchema)

app.post('/adminpage', (req,res)=>{
    const {username, password} = req.body

    if (username ==="chandu@123"  && password === "1234") {
        res.redirect('/adminpage');
    } 
    else {
        return res.status(404).json({ message: 'Admin not found' });
    }
})


//<------------------ All Route Here  ------------------------------------------->//


app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname , 'Public', 'index.html'));
})
app.get('/about', (req,res)=>{
    res.sendFile(path.join(__dirname , 'Public', 'about.html'));
})
app.get('/education', (req,res)=>{
    res.sendFile(path.join(__dirname , 'Public', 'Education.html'));
})
app.get('/gallery', (req,res)=>{
    res.sendFile(path.join(__dirname , 'Public', 'gallery.html'));
})
app.get('/profile', (req,res)=>{
    res.sendFile(path.join(__dirname , 'Public', 'profile.html'));
})

app.get('/admission', (req,res)=>{
    res.sendFile(path.join(__dirname , 'Public', 'admission.html'));
})

app.get('/franchise', (req,res)=>{
    res.sendFile(path.join(__dirname , 'Public', 'franchise.html'));
})

app.get('/adminLogin', (req,res)=>{
    res.sendFile(path.join(__dirname , 'Public', 'admin_login.html'));
})

app.get('/adminpage', (req,res)=>{
    res.sendFile(path.join(__dirname , 'Public', 'adminPage.html'));
})



app.get('/dataAdmission', (req,res)=>{
    res.sendFile(path.join(__dirname , 'Public', 'dataAdmission.html'));
})

app.get('/dataFranchise', (req,res)=>{
    res.sendFile(path.join(__dirname , 'Public', 'dataFranchise.html'));
})

app.get('/dataGetInTouch', (req,res)=>{
    res.sendFile(path.join(__dirname , 'Public', 'dataGetInTouch.html'));
})

app.listen(process.env.PORT , ()=>{
    console.log(`File Serving on http://127.0.0.1:${process.env.PORT}`);
})