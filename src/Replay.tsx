import React, { Component } from 'react'
import avatar from './images/avatars/image-juliusomo.png';
import { ReplayType, RepliesType } from '../models/models'

export default class Replay extends Component<ReplayType, { text:string }> {
    constructor(props:any) {
        super(props)

        this.state = {
            text: this.props.editReplayID ? 
            this.props.item.replies.map((replayItem: RepliesType, index:number) => { 
                if(replayItem.id === this.props.editReplayID) {
                    return `@${replayItem.user.username} `
                } }).join('')
             : 
            `@${this.props.item.user.username} `
        }
    }

    handleChangeReplayText = (e: string) => {
        this.setState({
            text: e
        })
      }

  render() {
    return (
        <form className="coment"  onSubmit={(e) => this.props.handleAddReplay(e,
             this.state.text, 
            this.props.item.id, 
            this.props.editReplayID, 
            this.props.item.user.username, 
            this.props.editReplayID ? 
            this.props.item.replies.map((replayItem: any, index:number) => { 
                if(replayItem.id === this.props.editReplayID) {
                    return replayItem.user.username
                } }).join('')
             : 
            false )} >
        <div className="coment-img">
          <img src={avatar} alt="avatar" className="coment-img" />
        </div>
        <textarea 
          value= {this.state.text}
          onChange={(e:any) => this.handleChangeReplayText(e.target.value)}
          name="textarea" 
          className='textarea textarea-style' 
          autoFocus 
          onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
 />
        <button type="submit" className="btn-pink">REPLAY</button>
      </form>
    )
  }
}
