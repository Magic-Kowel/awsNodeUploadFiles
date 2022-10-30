import express from 'express';
import fileUpload from 'express-fileupload';
import { getFiles, uploadFile,getFile,downloadFile } from './s3.js';
const app = express();
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'./uploads'
}));

app.get('/',(req,res)=>{
    res.json({message:'Welcome to server'});
});
app.get('/files/:fileName', async (req,res)=>{
    const result = await getFile(req.params.fileName);
    res.json(result.$metadata);
});
app.get('/downloadfile/:fileName', async (req,res)=>{
    await downloadFile(req.params.fileName);
    res.json({message: "Archivo descargado"});
});
app.post('/files', async (req,res)=>{
    const result = await uploadFile(req.files.file)
    res.json({result});
});
app.get('/files', async (req, res) => {
    const result = await getFiles()
    res.json(result.Contents)
})
app.use(express.static('images'))
const port = 3000;
app.listen(port);
console.log(`Server on port ${port}`);