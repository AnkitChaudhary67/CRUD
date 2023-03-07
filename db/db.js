const mongoose=require('mongoose');
mongoose.set('strictQuery', false);

const DB=process.env.DATABASE;
mongoose.connect(DB,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(()=>{
    console.log(`DB Connected`);
}).catch(()=>{
    console.log(`No Connection`);
})