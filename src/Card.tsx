import React, { Component } from 'react'
import Replay from './Replay'
import { RepliesType, CardType } from '../models/models'

export default class Card extends Component<CardType, { valueTextEdit:string }> {
  constructor(props:any) {
    super(props)

    this.state = {
      valueTextEdit: ''
    }
  }

  handleChangeEditText = (e: string) => {
    this.setState({
      valueTextEdit: e
    })
  }

  handleSubmit = (e: React.FormEvent, id:number, repliesId: number|boolean) => {
    e.preventDefault();
    this.props.handleEditData(this.state.valueTextEdit, id, repliesId)
  }

  render() {
    const { score, user, createdAt, content, replies, id } = this.props.item;

    return (
      <>
      <div className='card'>
        <div className="number">
        <svg onClick={() => this.props.handleNumber(id, "plus")} width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg>
        <span>
        <b>{score}</b>
        </span>
        <div className="minus-div" onClick={() => this.props.handleNumber(id, "minus")}>
          <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/></svg>
        </div>
        </div>
        <div className="user-name">
        <img src={require(`${user.image.png}`)} />
        <h4>
            {user.username}
        </h4>
        {user.username === this.props.currentUser.username && 
        <div className='current-user'>you</div>
        }
        <p>
          {createdAt}
        </p>
        </div>
        {this.props.edit && this.props.editID === id && !this.props.editReplayID  ?
          <form onSubmit={(e) => this.handleSubmit(e, id, false)} className="text text-edit">
          <textarea value={this.state.valueTextEdit} 
          onChange={(e) => this.handleChangeEditText(e.target.value)}
          name="text-edit" 
          className="textarea-style" 
          autoFocus 
          onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)} />
          <button type='submit' className="btn-pink">UPDATE</button>
              </form>
              :
          <div className="text text-comentar">
            <p>{content}</p>
        </div>
        }
        <div className="replay">
        {user.username === this.props.currentUser.username ?
          <>
           <div className="delete-btn"  onClick={() => this.props.openDeleteModal(id, false)}>
           <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
           <h4>Delete</h4>
           </div>
           <div className='replay-btn' onClick={() =>{ this.props.handleOpenEditText(id, false); this.setState({valueTextEdit:content})}}>
             <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
             <h4>Edit</h4>
           </div>
          </>
           :
           <div className='replay-btn' onClick={() =>{ this.props.handleOpenReplayText(id, false, 'replay'); this.setState({valueTextEdit:content})}}>
           <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
           <h4>Replay</h4>
           </div>
      }
        </div>
      </div>
      {(this.props.replay && this.props.editID === id && !this.props.editReplayID ) && 
              <Replay 
              item={this.props.item} 
              editReplayID={false} 
              handleAddReplay={this.props.handleAddReplay}
              />
      }

      {/* reploes */}
      {replies.length > 0 &&
      <div className="replies-div">
        <div className="replies-vertical-line"></div>
        <div className="replies">

        {replies?.map((item: RepliesType, index: number) => {

          return (
            <>
            <div className='card' key={index}>
              <div className="number">
              <svg onClick={() => this.props.handleNumber(id, "plus", item.id)} width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg>
              <span>
              <b>{item.score}</b>
              </span>
              <div className="minus-div" onClick={() => this.props.handleNumber(id, "minus", item.id)}>
                <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/></svg>
              </div>
              </div>
              <div className="user-name">
              <img src={require(`${item.user.image.png}`)} />
              <h4>
                  {item.user.username}
              </h4>
              {item.user.username === this.props.currentUser.username && 
                <div className='current-user'>you</div>
              }
              <p>
                {item.createdAt}
              </p>
              </div>
              {this.props.edit && this.props.editID === id && this.props.editReplayID === item.id  ?
          <form onSubmit={(e) => this.handleSubmit(e, id, item.id)} className="text text-edit">
          <textarea 
          onChange={(e) => this.handleChangeEditText(e.target.value)}
          value={this.state.valueTextEdit}
          name="text-edit-replay" 
          className="textarea-style" 
          autoFocus 
          onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)} />
          <button type='submit' className="btn-pink">UPDATE</button>
              </form>
              :
              <div className="text text-comentar">
                  <p><span>@{item.replyingTo}</span> &nbsp;{item.content}</p>
              </div>
        }
              <div className="replay">
              {item.user.username === this.props.currentUser.username ?
          <>
           <div className="delete-btn" onClick={() => this.props.openDeleteModal(id, item.id)}>
           <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
           <h4>Delete</h4>
           </div>
           <div className='replay-btn' onClick={() =>{ {this.props.handleOpenEditText(id, item.id); this.setState({valueTextEdit: item.content})}}}>
             <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
             <h4>Edit</h4>
           </div>
          </>
           :
           <div className='replay-btn' onClick={() =>{ this.props.handleOpenReplayText(id, item.id, 'replayOfReplies'); this.setState({valueTextEdit:item.content})}}>
           <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
           <h4>Replay</h4>
           </div>
      }
              </div>
            </div>
            {(this.props.replayOfReplies && this.props.editID === id && this.props.editReplayID === item.id ) && 
              <Replay 
              item={this.props.item} 
              editReplayID={item.id} 
              handleAddReplay={this.props.handleAddReplay}
              />
      }
            </>
          )
        }
        )}
        </div>
      </div>
      }
      </>
    )
  }
}
