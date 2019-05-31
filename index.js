const express = require('express');
const port=8000;
const path=require('path');

const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
// // middleware 1
// app.use((req,res,next)=>{
//     console.log('middleware 1 called');
//     req.my_name= 'ayush';
//     next();
// });
// //middleware 2
// app.use((req,res,next)=>{
//     console.log('middleware 2 called');
//     console.log(req.my_name);
//     next();
// });

var conatactList=[
    {
        name:'Tony',
        phone:'1111111'
    },
    {
        name:'ayush',
        phone:'1516568'
    },
    {
        name:'arpan',
        phone:'68498658'
    }
];

app.get('/',(req,res)=>{
    // console.log(req.my_name);
    // return res.render('home',{
    //     title:"Contact List",
    //     contact_list : conatactList
    // });
    // res.send('<h1>cool evrything is working</h1>');

    Contact.find({},(err,contacts)=>{
        if(err){
            console.log('err in fetching contacts form db');
            return ;
        }
        return res.render('home',{
            title:'Contact List',
            contact_list:contacts
        });
    })

});
app.get('/practice',(req,res)=>{
    return res.render('practice',{
        title:'Playground'
    })
});
app.post('/create-contact',function(req,res){
    // conatactList.push({
    //     name : req.body.name,
    //     phone : req.body.phone
    // });
    // conatactList.push(req.body);
    // return res.redirect('back');

    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },(err,newContact)=>{
        if(err){
            console.log('error in creating a contact');
            return;
        }
        console.log('***********',newContact);
        return res.redirect('back');
    });

    //return res.redirect('/');
});

app.get('/delete-contact',(req,res)=>{
    console.log(req.query);
    // console.log(req.param.phone);
    let id=req.query.id;
    // var contactid = conatactList.findIndex(contact=>contact.phone==phone);
    // if(contactid != -1){
    //     conatactList.splice(contactid,1);
    // }
    Contact.findByIdAndDelete(id,(err)=>{
        if(err){
            console.log('error in delteing the contact form db');
            return;
        }
        return res.redirect('back');
    });
    // return res.redirect('back');
});

app.listen(port,function(err){
    if(err){
        console.log('err is there',err);
        return;
    }
    console.log('server is running on port:',port);
})