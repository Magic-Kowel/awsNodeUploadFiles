import express from 'express';
import fileUpload from 'express-fileupload';
import { getFiles, uploadFile } from './s3.js';
const app = express();
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'./uploads'
}));

app.get('/',(req,res)=>{
    res.json({message:'Welcome to server'});
});
app.post('/files', async (req,res)=>{
    const result = await uploadFile(req.files.file)
    res.json({result});
});
app.get('/files', async (req, res) => {
    const result = await getFiles()
    res.json(result.Contents)
})
const port = 3000;
app.listen(port);
console.log(`Server on port ${port}`);