//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons'

import { BrowserRouter as Router, Route} from "react-router-dom";

import Index from "./components/index.component";
import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      dirPath: '',
      type: 'Archivo',
      selectedOption: 'Archivo',
      name: ''
    }
    this.addFileOrDirectory = this.addFileOrDirectory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.state.dirPath = window.location.pathname
    this.fetchVerCarpeta();
  }

  breadCrumb(){
    return this.state.dirPath.split('/').map(dir => {
      //Revisar los / luego
      if(dir!=''){
        console.log(dir)
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

  fetchVerCarpeta() {
    fetch(`/carpeta?dir=${this.state.dirPath}`)
        .then(res => res.json())
        .then(data => {
            this.setState({aseguradoras: data});
        })
        .catch(err => console.error(err));
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
            <button className="btn btn-outline-success mx-1" type="button" data-toggle="modal" data-target="#addFileOrDirectory">Crear Archivo/Carpeta</button>
            <button className="btn btn-outline-primary mx-1" type="button">Copiar</button>
            <button className="btn btn-outline-danger mx-1" type="button">Mover/Cortar</button>
            <button className="btn btn-outline-warning mx-1" type="button">Pegar</button>
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
            <div className="card mx-1" style={{width : '13rem'}}>
              <div className="card-body mx-auto">
                <FontAwesomeIcon icon={faFolder} size="5x" />
                <h5 className="card-title">Card title</h5>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <a href="#" className="btn btn-success">Abrir</a>
                  <a href="#" className="btn btn-info">+ acciones</a>
                </div>
              </div>
            </div>
            <div className="card mx-1" style={{width : '13rem'}}>
              <div className="card-body mx-auto">
                <FontAwesomeIcon icon={faFile} size="5x" />
                <h5 className="card-title">Card title</h5>
                <a href="#" className="btn btn-info">+ acciones</a>
              </div>
            </div>
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

