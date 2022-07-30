import React, { Component } from 'react'
import avatar from './images/avatars/image-juliusomo.png';
import { ComentType } from '../models/models'

export default class Coment extends Component<ComentType, {}> {
  render() {
    return (
      <form className="coment" onSubmit={(e) => this.props.handleAddComment(e)}>
        <div className="coment-img">
          <img src={avatar} alt="avatar" className="coment-img" />
        </div>
        <textarea 
          name="textarea" 
          className='textarea textarea-style' 
          placeholder="Add comment..." 
          onChange={(e) => this.props.handleChangeText(e.target.value)} 
          value={this.props.textValue} />
        <button type="submit" className="btn-pink">SEND</button>
      </form>
    )
  }
}
