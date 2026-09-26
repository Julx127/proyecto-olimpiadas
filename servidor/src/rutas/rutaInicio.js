import express from 'express';
const rInicio=express.Router();

rInicio.get('/', (pet, resp)=>{
    resp.render('index');
})

export{rInicio}; 