import React, { Component } from 'react'
import { ModalType } from '../models/models'

export default class Modal extends Component<ModalType, {}> {
  render() {
    return (
      <div className="overlay" onClick={(e) => this.props.closeDeleteModal(e)}>
        <div className="modal">
          <h2>Delete comment</h2>
          <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
          <div className="modal-btns">
            <button className="modal-cancel-btn" onClick={(e) => this.props.closeDeleteModal(e)}>NO, CANCEL</button>
            <button className="modeal-delete-btn" onClick={(e) =>{ 
                this.props.handleDelete();
                this.props.closeDeleteModal(e);}}
                >YES, DELETE</button>
          </div>
        </div>
      </div>
    )
  }
}
