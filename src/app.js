const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { exec } = require("child_process");
const app = express();

//Settings
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.get('/carpeta', (req, res) => {
    const dir = req.query.dir
    let directoryPath = path.join(__dirname+'/root/'+dir)
    exec('ls -l', {cwd: directoryPath}, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    
    res.json('Hello world')
})

app.post('/api/addFileOrDirectory', (req, res) => {
    const dir = req.body.dir
    const type = req.body.type
    const name = req.body.name
    let directoryPath = path.join(__dirname+'/root/'+dir)
    let command = 'mkdir '+ name
    if(type =="Archivo"){
        command = 'touch '+ name
    }
    exec(command, {cwd: directoryPath}, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    
    res.json('Hello world')
})

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//HTML en todas las rutas para react
app.get('*', (req, res) => res.sendFile(path.join(__dirname+'/public/index.html')));

//Starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
}); 