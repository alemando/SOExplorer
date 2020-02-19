//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

//jquery
import $ from 'jquery';

//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons'

import React, { Component } from 'react';

import Swal from 'sweetalert2'

const Carpeta = props =>(
  <div className="card mx-1" style={{width : '13rem'}}>
    <div className="card-body mx-auto">
      <FontAwesomeIcon icon={faFolder} size="5x" />
      <h5 className="card-title">{props.element.fileDirName}</h5>
      <div className="btn-group" role="group" aria-label="Carpeta-buttons">
        <button onClick={()=> props.component.changeDirpath(props.element.fileDirName)} className="btn btn-success">Abrir</button>
        <button className="btn btn-info" data-toggle="modal" data-target={"#Carpeta-"+props.element.fileDirName.replace('.',"_")}>+ acciones</button>
      </div>
    </div>
    <div className="modal fade" id={"Carpeta-"+props.element.fileDirName.replace('.',"_")} tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"><b>{props.element.fileDirName}</b></h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="container">
              <ul className="list-group">
                <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-6">
                        Propietario
                      </div>
                      <div className="col-md-6">
                        {props.element.owner}
                      </div>
                    </div>
                  </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-md-6">
                      Permisos Usuario
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col" ><p className={"icon_letter " + (props.element.permissions[1] != '-' ? 'pActive' : 'pDeactivate')} >r</p></div>
                        <div className="col"><p className={"icon_letter " + (props.element.permissions[2] != '-' ? 'pActive' : 'pDeactivate')}>w</p></div>
                        <div className="col"><p className={"icon_letter " + (props.element.permissions[3] != '-' ? 'pActive' : 'pDeactivate')}>x</p></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-md-6">
                      Permisos Grupo
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col"><p className={"icon_letter " + (props.element.permissions[4] != '-' ? 'pActive' : 'pDeactivate')}>r</p></div>
                        <div className="col"><p className={"icon_letter " + (props.element.permissions[5] != '-' ? 'pActive' : 'pDeactivate')}>w</p></div>
                        <div className="col"><p className={"icon_letter " + (props.element.permissions[6] != '-' ? 'pActive' : 'pDeactivate')}>x</p></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-md-6">
                      Permisos Otros
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col"><p className={"icon_letter " + (props.element.permissions[7] != '-' ? 'pActive' : 'pDeactivate')}>r</p></div>
                        <div className="col"><p className={"icon_letter " + (props.element.permissions[8] != '-' ? 'pActive' : 'pDeactivate')}>w</p></div>
                        <div className="col"><p className={"icon_letter " + (props.element.permissions[9] != '-' ? 'pActive' : 'pDeactivate')}>x</p></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-md">
                      <div className="btn-group " role="group" aria-label="action-buttons">
                        <button className="btn btn-success" type="button" data-dismiss="modal" onClick={()=>props.component.copy(props.element.fileDirName)}>Copiar</button>
                        <button className="btn btn-warning" type="button" data-dismiss="modal" onClick={()=>props.component.moveCut(props.element.fileDirName)}>Mover/Cortar</button>
                        <button className="btn btn-danger" type="button" data-dismiss="modal" onClick={()=>props.component.delete(props.element.fileDirName)}>Eliminar</button>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-md">
                    <div className="btn-group" role="group" aria-label="special-buttons"></div>
                      <div className="btn-group" role="group" aria-label="special-buttons">
                        <button className="btn btn-success" type="button" data-toggle="modal" onClick={()=>props.component.setState({oldName: props.element.fileDirName})} data-target="#changeName">Cambiar Nombre</button>
                        <button className="btn btn-primary" type="button" data-toggle="modal" onClick={()=>props.component.setState({oldName: props.element.fileDirName})} data-target="#changePermissions">Cambiar Permisos</button>
                        <button className="btn btn-warning" type="button" data-toggle="modal" onClick={()=>props.component.setState({oldName: props.element.fileDirName})} data-target="#changePropietary">Cambiar propietario</button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const Archivo = props => (
  <div className="card mx-1" style={{width : '13rem'}}>
    <div className="card-body mx-auto">
      <FontAwesomeIcon icon={faFile} size="5x" />
      <h5 className="card-title">{props.element.fileDirName}</h5>
      <button className="btn btn-info" data-toggle="modal" data-target={"#Archivo-"+props.element.fileDirName.replace('.',"_")}>+ acciones</button>
    </div>
    <div className="modal fade" id={"Archivo-"+props.element.fileDirName.replace('.',"_")} tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"><b>{props.element.fileDirName}</b></h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="container">
              <ul className="list-group">
                <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-6">
                        Propietario
                      </div>
                      <div className="col-md-6">
                        {props.element.owner}
                      </div>
                    </div>
                  </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-md-6">
                      Permisos Usuario
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col" ><p className={"icon_letter " + (props.element.permissions[1] != '-' ? 'pActive' : 'pDeactivate')}>r</p></div>
                        <div className="col"><p className={"icon_letter " + (props.element.permissions[2] != '-' ? 'pActive' : 'pDeactivate')}>w</p></div>
                        <div className="col"><p className={"icon_letter " + (props.element.permissions[3] != '-' ? 'pActive' : 'pDeactivate')}>x</p></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-md-6">
                      Permisos Grupo
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col"><p className={"icon_letter " + (props.element.permissions[4] != '-' ? 'pActive' : 'pDeactivate')}>r</p></div>
                        <div className="col"><p className={"icon_letter " + (props.element.permissions[5] != '-' ? 'pActive' : 'pDeactivate')}>w</p></div>
                        <div className="col"><p className={"icon_letter " + (props.element.permissions[6] != '-' ? 'pActive' : 'pDeactivate')}>x</p></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-md-6">
                      Permisos Otros
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col"><p className={"icon_letter " + (props.element.permissions[7] != '-' ? 'pActive' : 'pDeactivate')}>r</p></div>
                        <div className="col"><p className={"icon_letter " + (props.element.permissions[8] != '-' ? 'pActive' : 'pDeactivate')}>w</p></div>
                        <div className="col"><p className={"icon_letter " + (props.element.permissions[9] != '-' ? 'pActive' : 'pDeactivate')}>x</p></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-md">
                      <div className="btn-group " role="group" aria-label="action-buttons">
                        <button className="btn btn-success" type="button" data-dismiss="modal" onClick={()=>props.component.copy(props.element.fileDirName)}>Copiar</button>
                        <button className="btn btn-warning" type="button" data-dismiss="modal" onClick={()=>props.component.moveCut(props.element.fileDirName)}>Mover/Cortar</button>
                        <button className="btn btn-danger" type="button" data-dismiss="modal" onClick={()=>props.component.delete(props.element.fileDirName)}>Eliminar</button>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-md">
                    <div className="btn-group" role="group" aria-label="special-buttons"></div>
                      <div className="btn-group" role="group" aria-label="special-buttons">
                        <button className="btn btn-success" type="button" data-toggle="modal" onClick={()=>props.component.setState({oldName: props.element.fileDirName})} data-target="#changeName">Cambiar Nombre</button>
                        <button className="btn btn-primary" type="button" data-toggle="modal" onClick={()=>props.component.setState({oldName: props.element.fileDirName})} data-target="#changePermissions">Cambiar Permisos</button>
                        <button className="btn btn-warning" type="button" data-toggle="modal" onClick={()=>props.component.setState({oldName: props.element.fileDirName})} data-target="#changePropietary">Cambiar propietario</button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      filesDirectories : [],
      currentDir: '',
      action: '',
      dirPath: '/',
      type: 'Archivo',
      selectedOption: 'Archivo',
      name: '',
      oldName: '',
      newName: '',
      user: '',
      p: 0,
      g: 0,
      o: 0,
      users: []
    }
    this.addFileOrDirectory = this.addFileOrDirectory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changePropietary = this.changePropietary.bind(this);
    this.changePermissions = this.changePermissions.bind(this);
    this.paste = this.paste.bind(this);
    this.users = this.users.bind(this);
  }

  modalClose(modal){
    $('#'+modal).modal('hide');
    $(document).on('hidden.bs.modal', '.modal', function () {
      if ($('body').find('.modal.show').length > 0) {
        $('body').addClass('modal-open');
      }
    });
  }

  goBackDirpath(dirPath){
    
    let dirList = dirPath.split("/")
    let replaceValue = dirList.pop()
    if(replaceValue == ""){
      replaceValue = dirList.pop()
    }
    let dir = dirPath.replace(replaceValue,"")
    this.setState({
      dirPath: dir
    })
    this.fetchVerCarpeta(dir)
  }

  changeDirpath(carpeta){
    if(this.state.dirPath != "/"){
      this.setState({
        dirPath: (this.state.dirPath +"/"+ carpeta) 
      })
      this.fetchVerCarpeta(this.state.dirPath+"/"+ carpeta)
    }
    else{
      this.setState({
        dirPath: (this.state.dirPath + carpeta) 
      })
      this.fetchVerCarpeta(this.state.dirPath+ carpeta)
    }
    
  }

  componentDidMount(){
    this.fetchVerCarpeta("/");

    //Cargar lista usuarios
    fetch('/api/users', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ users: data })
    })
    .catch(err => console.error(err));

  }

  fetchVerCarpeta(dirPath) {
    fetch(`/carpeta?dir=${dirPath}`)
        .then(res => res.json())
        .then(data => {
            this.setState({filesDirectories: data});
        })
        .catch(err => console.error(err));
}

  breadCrumb(){
    return this.state.dirPath.split('/').map(dir => {
      //Revisar los / luego
      if(dir!=''){
        return <li key={'breadCrumb-'+dir} className="breadcrumb-item active" aria-current="page">{dir}</li>
      }
    })
  }
  
  addFileOrDirectory(e){
    e.preventDefault();
    let data = {
        dir: this.state.dirPath,
        type: this.state.type,
        name: this.state.name,
    }

    fetch('/api/addFileOrDirectory', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
          if(data.id == 0){
                    
            Swal.fire({
              text: data.message,
              icon: 'error'
            })
          }else if(data.id == 1){
            
            Swal.fire({
              text: data.message,
              icon: 'success'
            })
            this.modalClose("addFileOrDirectory")

            this.fetchVerCarpeta(this.state.dirPath)
            this.setState({
              type: 'Archivo',
              selectedOption: 'Archivo',
              name: '',
              
            })
          }
      })
      .catch(err => console.error(err));
  }

  changeName(e){
    e.preventDefault();
    let data = {
      dir: this.state.dirPath,
      oldName: this.state.oldName,
      newName: this.state.newName,
    }
    fetch('/api/changeName', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
          if(data.id == 0){
                    
            Swal.fire({
              text: data.message,
              icon: 'error'
            })
          }else if(data.id == 1){
            
            Swal.fire({
              text: data.message,
              icon: 'success'
            })
            this.modalClose("Carpeta-"+this.state.oldName.replace('.',"_"))
            this.modalClose("Archivo-"+this.state.oldName.replace('.',"_"))
            this.modalClose("changeName")

            this.fetchVerCarpeta(this.state.dirPath)
            this.setState({
              oldName: '',
              newName: ''
            })
          }

          
      })
      .catch(err => console.error(err));

  }

  changePropietary(e){
    e.preventDefault();
    let data = {
      dir: this.state.dirPath,
      fileDirectoryName: this.state.oldName,
      user: this.state.user
    }
    fetch('/api/changeUser', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {

          if(data.id == 0){
                      
            Swal.fire({
              text: data.message,
              icon: 'error'
            })
          }else if(data.id == 1){
            
            Swal.fire({
              text: data.message,
              icon: 'success'
            })
            this.modalClose("Carpeta-"+this.state.oldName.replace('.',"_"))
            this.modalClose("Archivo-"+this.state.oldName.replace('.',"_"))
            this.modalClose("changePropietary")

            this.fetchVerCarpeta(this.state.dirPath)
            this.setState({
              oldName: '',
              user: ''
            })
          }

      })
      .catch(err => console.error(err));

  }

  changePermissions(e){
    e.preventDefault();
    let perm = this.state.p.toString()+this.state.g.toString()+this.state.o.toString()
    let data = {
      dir: this.state.dirPath,
      fileDirectoryName: this.state.oldName,
      permissions: perm
    }
    fetch('/api/modifyPermissions', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {

          if(data.id == 0){
                      
            Swal.fire({
              text: data.message,
              icon: 'error'
            })
          }else if(data.id == 1){
            
            Swal.fire({
              text: data.message,
              icon: 'success'
            })
            this.modalClose("Carpeta-"+this.state.oldName.replace('.',"_"))
            this.modalClose("Archivo-"+this.state.oldName.replace('.',"_"))
            this.modalClose("changePermissions")

            this.fetchVerCarpeta(this.state.dirPath)
            this.setState({
              oldName: '',
              user: ''
            })
          }

      })
      .catch(err => console.error(err));

  }

  paste(){
    let data = {
      currentDir: this.state.currentDir,
      action: this.state.action,
      destinationDir: this.state.dirPath,
      fileDirectoryName : this.state.fileDirectoryName
    }

  fetch('/api/action', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
    })
    .then(res => res.json())
    .then(data => {
        if(data.id == 0){
                      
          Swal.fire({
            text: data.message,
            icon: 'error'
          })
        }else if(data.id == 1){
          
          Swal.fire({
            text: data.message,
            icon: 'success'
          })
          this.fetchVerCarpeta(this.state.dirPath)
          this.setState({
            currentDir: '',
            action: '',
            fileDirectoryName: ''
          })
        }
      
        
    })
    .catch(err => console.error(err));
  }

  copy(fileDirectory){
    Swal.fire({
      text: 'Archivo/Carpeta copiada',
      icon: 'success'
    })
    this.setState({
      currentDir: this.state.dirPath,
      fileDirectoryName : fileDirectory,
      action: 'copy'
    })
  }

  moveCut(fileDirectory){
    Swal.fire({
      text: 'Archivo/Carpeta cortada',
      icon: 'success'
    })
    this.setState({
      currentDir: this.state.dirPath,
      fileDirectoryName : fileDirectory,
      action: 'moveCut'
    })
  }

  delete(fileDirectory){
    let data = {
      dir: this.state.dirPath,
      fileDirectoryName : fileDirectory
    }

    fetch('/api/delete', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
      })
      .then(res => res.json())
      .then(data => {
          if(data.id == 0){
                        
            Swal.fire({
              text: data.message,
              icon: 'error'
            })
          }else if(data.id == 1){
            
            Swal.fire({
              text: data.message,
              icon: 'success'
            })

            this.fetchVerCarpeta(this.state.dirPath)
          }
      })
      .catch(err => console.error(err));
  }

  

filesDirectories(){
  return this.state.filesDirectories.map(current => {
    if(current.permissions[0] =='d'){
      return <Carpeta component={this} element={current} key={current.fileDirName} />;
    }
    return <Archivo component={this} element={current} key={current.fileDirName} />;
  })
}

handleChange(e) {
  const { name, value } = e.target;
  this.setState({
    selectedOption: e.target.value,
    [name]: value
  })
}

handleChangeCheck(e) {
  const { name, value } = e.target;
  let valor = parseInt(value) 
  if(e.target.checked){
    if(name == "p"){
      this.setState({
        p: this.state.p+valor
      })
    }else if(name == "g"){
      this.setState({
        g: this.state.g+valor
      })
      
    }else if(name == "o"){
      this.setState({
        o: this.state.o+valor
      })
    }
  }else{
    if(name == "p"){
      this.setState({
        p: this.state.p-valor
      })
    }else if(name == "g"){
      this.setState({
        g: this.state.g-valor
      })
      
    }else if(name == "o"){
      this.setState({
        o: this.state.o-valor
      })
    }
  }
}

users() {
  return this.state.users.map(currentUser => {
    return <option key={currentUser} value={currentUser}>{currentUser}</option>;
  })
}

  render(){
    return (
      <div>
        <nav className="navbar sticky-top navbar-dark bg-dark">
          <div className="form-inline">
            <button className="btn btn-outline-info mx-1" disabled={this.state.dirPath == "/"} onClick={()=>this.goBackDirpath(this.state.dirPath)}>Volver</button>
            <button className="btn btn-outline-success mx-1" type="button" data-toggle="modal" data-target="#addFileOrDirectory">Crear Archivo/Carpeta</button>
            <button className="btn btn-outline-warning mx-1" type="button" disabled={this.state.action == ''} onClick={this.paste}>Pegar</button>
          </div>
        </nav>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page"></li>
            {this.breadCrumb()}
          </ol>
        </nav>
        <div className="container-fluid">
          <div className="row">
            {this.filesDirectories()}
          </div>
        </div>
        <div className="modal fade" id="addFileOrDirectory" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title"><b>Crear Archivo/Carpeta</b></h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div className="modal-body">
                    <form id="formAddFileOrDirectory" onSubmit={this.addFileOrDirectory}>
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                            <label>* Archivo/Carpeta:</label>
                              <div className="radio">
                                <label>
                                  <input type="radio" name="type" value="Archivo" checked={this.state.selectedOption ==='Archivo'} onChange={this.handleChange} />
                                    Archivo
                                </label>
                              </div>
                              <div className="radio">
                                <label>
                                  <input type="radio" name="type" value="Carpeta" checked={this.state.selectedOption === 'Carpeta'} onChange={this.handleChange} />
                                  Carpeta
                                </label>
                              </div>
                          </div>
                        </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>* Nombre:</label>
                              <input name="name" onChange={this.handleChange}
                                  required
                                  value={this.state.name}
                                  className="form-control"
                                  />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label>Todos los campos con * son obligatorios</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      </form>
                      </div>
                      <div className="modal-footer">
                          <button type="submit" form="formAddFileOrDirectory"  className="btn btn-primary">Enviar</button>
                          <button type="button" className="btn btn-secondary" onClick={this.modalClose} data-dismiss="modal">Close</button>
                      </div>
                  </div>
              </div>
          </div>
          <div className="modal fade" id="changeName" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title"><b>Cambiar nombre del archivo/carpeta</b></h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>this.modalClose("changeName")}>
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div className="modal-body">
                    <form id="formChangeName" onSubmit={this.changeName}>
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Nombre archivo/carpeta:</label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>{this.state.oldName}</label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>* Nuevo nombre:</label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input name="newName" onChange={this.handleChange}
                                  required
                                  value={this.state.newName}
                                  className="form-control"
                                  />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label>Todos los campos con * son obligatorios</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      </form>
                      </div>
                      <div className="modal-footer">
                          <button type="submit" form="formChangeName" className="btn btn-primary">Enviar</button>
                          <button type="button" className="btn btn-secondary" onClick={()=>this.modalClose("changeName")} data-dismiss="modal" >Close</button>
                      </div>
                  </div>
              </div>
          </div>
          <div className="modal fade" id="changePropietary" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title"><b>Cambiar propietario del archivo/carpeta</b></h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>this.modalClose("changePropietary")}>
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div className="modal-body">
                    <form id="formChangePropietary" onSubmit={this.changePropietary}>
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Nombre archivo/carpeta:</label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>{this.state.oldName}</label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>* Nuevo propietario:</label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <select name="user" onChange={this.handleChange}
                                  required
                                  value={this.state.user}
                                  className="form-control">
                                  <option  value=''>Seleccione...</option>
                                  {this.users()}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label>Todos los campos con * son obligatorios</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      </form>
                      </div>
                      <div className="modal-footer">
                          <button type="submit" form="formChangePropietary" className="btn btn-primary">Enviar</button>
                          <button type="button" className="btn btn-secondary" onClick={()=>this.modalClose("changePropietary")} data-dismiss="modal" >Close</button>
                      </div>
                  </div>
              </div>
          </div>
          <div className="modal fade" id="changePermissions" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title"><b>Cambiar permisos del archivo/carpeta</b></h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>this.modalClose("changePermissions")}>
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div className="modal-body">
                    <form id="formChangePermissions" onSubmit={this.changePermissions}>
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Nombre archivo/carpeta:</label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>{this.state.oldName}</label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md">
                            <div className="form-group">
                              <label>* Permisos:</label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md">
                            <div className="form-group">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col"></th>
                                  <th scope="col">Leer</th>
                                  <th scope="col">Escribir</th>
                                  <th scope="col">Ejecutar</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">Propietario</th>
                                  <td><center><input className="form-check-input" type="checkbox" value="4" name="p" id="readP" onChange={this.handleChangeCheck}/></center></td>
                                  <td><center><input className="form-check-input" type="checkbox" value="2" name="p" id="writeP" onChange={this.handleChangeCheck}/></center></td>
                                  <td><center><input className="form-check-input" type="checkbox" value="1" name="p" id="execP" onChange={this.handleChangeCheck}/></center></td>
                                </tr>
                                <tr>
                                  <th scope="row">Grupo</th>
                                  <td><center><input className="form-check-input" type="checkbox" value="4" name="g" id="readG" onChange={this.handleChangeCheck}/></center></td>
                                  <td><center><input className="form-check-input" type="checkbox" value="2" name="g" id="writeG" onChange={this.handleChangeCheck}/></center></td>
                                  <td><center><input className="form-check-input" type="checkbox" value="1" name="g" id="execG" onChange={this.handleChangeCheck}/></center></td>
                                </tr>
                                <tr>
                                  <th scope="row">Otros</th>
                                  <td><center><input className="form-check-input" type="checkbox" value="4" name="o" id="readO" onChange={this.handleChangeCheck}/></center></td>
                                  <td><center><input className="form-check-input" type="checkbox" value="2" name="o" id="writeO" onChange={this.handleChangeCheck}/></center></td>
                                  <td><center><input className="form-check-input" type="checkbox" value="1" name="o" id="execO" onChange={this.handleChangeCheck}/></center></td>
                                </tr>
                              </tbody>
                            </table>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label>Todos los campos con * son obligatorios</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      </form>
                      </div>
                      <div className="modal-footer">
                          <button type="submit" form="formChangePermissions" className="btn btn-primary">Enviar</button>
                          <button type="button" className="btn btn-secondary" onClick={()=>this.modalClose("changePermissions")} data-dismiss="modal" >Close</button>
                      </div>
                  </div>
              </div>
          </div> 
      </div>
    );
  }
}

