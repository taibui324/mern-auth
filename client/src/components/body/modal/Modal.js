
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Form from './Form'

const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(

 
  <React.Fragment>
  
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <p>
        <Form/>
   
        
        </p>
      </div>
    
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;