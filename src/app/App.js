//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons'

import React, { Component } from 'react';

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
                        <button className="btn btn-danger" type="button" onClick={()=>props.component.delete(props.element.fileDirName)}>Eliminar</button>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-md">
                    <div className="btn-group" role="group" aria-label="special-buttons"></div>
                      <div className="btn-group" role="group" aria-label="special-buttons">
                        <button className="btn btn-success" type="button">Cambiar Nombre</button>
                        <button className="btn btn-primary" type="button">Cambiar Permisos</button>
                        <button className="btn btn-warning" type="button">Cambiar propietario</button>
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
                        <button className="btn btn-danger" type="button" onClick={()=>props.component.delete(props.element.fileDirName)}>Eliminar</button>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-md">
                    <div className="btn-group" role="group" aria-label="special-buttons"></div>
                      <div className="btn-group" role="group" aria-label="special-buttons">
                        <button className="btn btn-success" type="button">Cambiar Nombre</button>
                        <button className="btn btn-primary" type="button">Cambiar Permisos</button>
                        <button className="btn btn-warning" type="button">Cambiar propietario</button>
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
      name: ''
    }
    this.addFileOrDirectory = this.addFileOrDirectory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  goBackDirpath(dirPath){
    console.log(dirPath.replace(new RegExp("([A-Za-z]*[/]?(?![A-Za-z]))+$"),""))
    this.setState({
      dirPath: dirPath.replace(new RegExp("([A-Za-z]*[/]?(?![A-Za-z]))+$"),"")
    })
    this.fetchVerCarpeta(dirPath.replace(new RegExp("([A-Za-z]*[/]?(?![A-Za-z]))+$"),""))
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
          this.fetchVerCarpeta()
          this.setState({
            dir: this.state.dirPath,
            type: 'Archivo',
            selectedOption: 'Archivo',
            name: '',
            
          })
          console.log(data)
      })
      .catch(err => console.error(err));
  }

  paste(){
    let data = {
      currentDir: this.state.currentDir,
      action: this.state.action,
      detinationDir: this.state.dirPath,
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
        this.fetchVerCarpeta()
        this.setState({
          currentDir: '',
          action: '',
          fileDirectoryName: ''
        })
        console.log(data)
    })
    .catch(err => console.error(err));
  }

  copy(fileDirectory){
    this.setState({
      currentDir: this.state.dirPath,
      fileDirectoryName : fileDirectory,
      action: 'copy'
    })
  }

  moveCut(fileDirectory){
    this.setState({
      currentDir: this.state.dirPath,
      fileDirectoryName : fileDirectory,
      action: 'moveCut'
    })
  }

  delete(){
    console.log('borrar')
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

  render(){
    return (
      <div>
        <nav className="navbar sticky-top navbar-dark bg-dark">
          <form className="form-inline">
            <button className="btn btn-outline-info mx-1" disabled={this.state.dirPath == "/"} onClick={()=>this.goBackDirpath(this.state.dirPath)}>Volver</button>
            <button className="btn btn-outline-success mx-1" type="button" data-toggle="modal" data-target="#addFileOrDirectory">Crear Archivo/Carpeta</button>
            <button className="btn btn-outline-warning mx-1" type="button" disabled={this.state.action == ''} onClick={this.paste}>Pegar</button>
          </form>
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
                          <button type="submit" form="formAddFileOrDirectory" className="btn btn-primary">Enviar</button>
                          <button type="button" className="btn btn-secondary" onClick={this.modalClose} data-dismiss="modal">Close</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

