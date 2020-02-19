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
            return{id:"0", message:"Error al abrir carpeta " + error.message};
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return{id:"0", message:"Error al abrir carpeta"+ stderr};
        }
        let filesDirectorys = stdout.split("\n")
        filesDirectorys = filesDirectorys.slice(1, filesDirectorys.length-1)
        let result = []
        filesDirectorys.map( element =>{
            let fileDirectory = element.split(" ")
            result.push({
                permissions: fileDirectory[0].split(''),
                owner:  fileDirectory[2],
                fileDirName: fileDirectory[fileDirectory.length-1]
            })
        })
        res.json(result)
    });
})

app.post('/api/addFileOrDirectory', (req, res) => {

    const dir = req.body.dir
    const type = req.body.type
    const name = req.body.name.replace(" ","_")
    let directoryPath = path.join(__dirname+'/root/'+dir)
    let command = 'mkdir '+ name
    if(type =="Archivo"){
        command = 'touch '+ name
    }
    exec(command, {cwd: directoryPath}, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.json({id:"0", message:"Error al crear archivo o directorio " + error.message})
        }else if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.json({id:"0", message:"Error al crear archivo o directorio "+ stderr})
        }else{
            res.json({id:"1", message:"Creación exitosa"})
        }
    });
    
    
})

app.post('/api/action', (req, res) => {
    const currentDir = req.body.currentDir
    const action = req.body.action
    const destinationDir = req.body.destinationDir
    const fileDirectoryName = req.body.fileDirectoryName
    let directoryPath = path.join(__dirname+'/root/'+currentDir)
    let destinationPath = path.join(__dirname+'/root/'+destinationDir) 
    let command = ''
    if(action == "copy"){
        command = 'cp -R '+ fileDirectoryName + ' ' + destinationPath
    }
    else if(action == "moveCut"){
        command = 'mv '+ fileDirectoryName + ' ' + destinationPath
    }
    exec(command, {cwd: directoryPath}, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.json({id:"0", message:"Error al mover archivo o directorio " + error.message})
        }else
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.json({id:"0", message:"Error al mover archivo o directorio "+ stderr})
        }else{
            res.json({id:"1", message:"Pegado exitoso"})
        }
    });
})

app.post('/api/delete', (req, res) => {
    const dir = req.body.dir
    const fileDirectoryName = req.body.fileDirectoryName
    let directoryPath = path.join(__dirname+'/root/'+dir)
    exec("rm -R " + fileDirectoryName, {cwd: directoryPath}, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.json({id:"0", message:"Error al borrar archivo o directorio " + error.message})
        } else
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.json({id:"0", message:"Error al borrar archivo o directorio "+ stderr})
        } else{
            res.json({id:"1", message:"Borrado exitoso"})
        }
    });
})

app.post('/api/changeName', (req, res) => {

    const dir = req.body.dir
    const oldName = req.body.oldName
    const newName = req.body.newName.replace(" ","_")
    let directoryPath = path.join(__dirname+'/root/'+dir)
    exec("mv " + oldName + " " + newName, {cwd: directoryPath}, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.json({id:"0", message:"Error al cambiar el nombre " + error.message})
        } else
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.json({id:"0", message:"Error al cambiar el nombre "+ stderr})
        } else {
            res.json( {id:"1", message:"Cambio de nombre exitoso"})
        }
    });
    
})

app.post('/api/changeUser', (req, res) => {

    const dir = req.body.dir
    const fileDirectoryName = req.body.fileDirectoryName
    const user = req.body.user
    const pass= "99101912201"
    let directoryPath = path.join(__dirname+'/root/'+dir)
    exec("echo " +pass+" | sudo -kS chown " + user + " " + fileDirectoryName , {cwd: directoryPath}, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.json({id:"0", message:"Error al cambiar propietario " + error.message})
        } else
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.json({id:"0", message:"Error al cambiar el propietario "+ stderr})
        } else{
            res.json( {id:"1", message:"Cambio de propietario exitoso"})
        }
    });
})
app.get('/api/users', (req, res) => {
    let directoryPath = path.join(__dirname+'/root/')
    exec("getent passwd", {cwd : directoryPath},(error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.json([])
        } else
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.json([])
        } else {
            let usersList = stdout.split("\n").map(user => user.split(":")).filter(user => user[user.length - 1]!="/usr/sbin/nologin" && user[user.length -1]!="/bin/false").map(user => user[0]).filter(user => user!="")
            res.json(usersList)
        }
    });
})

app.post('/api/modifyPermissions', (req, res) => {

    const dir = req.body.dir
    const permissions = req.body.permissions
    const fileDirectoryName = req.body.fileDirectoryName
    const pass = "99101912201"
    let directoryPath = path.join(__dirname+'/root/'+dir)
    exec("echo "+pass+ " | sudo -kS chmod -R " + permissions + " " + fileDirectoryName, {cwd: directoryPath}, (error, stdout, stderr) => {
        /*exec("99101912201",{cwd: directoryPath}),(error1, stdout1,stderr1) =>{
            console.log("Salida: "+stdout1)
        }*/
        if (error) {
            console.log(`error: ${error.message}`);
            res.json({id:"0", message:"Error al modificar los permisos " + error.message})
        } else
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.json({id:"0", message:"Error al modificar los permisos "+ stderr})
        } else {
            res.json( {id:"1", message:"Cambio de permisos exitoso"})
        }
    });
})


//Static files
app.use(express.static(path.join(__dirname, 'public')));

//HTML en todas las rutas para react
app.get('*', (req, res) => res.sendFile(path.join(__dirname+'/public/index.html')));

//Starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
}); 