import React, { Component } from 'react'
import Coment from './Coment'
import Card from './Card'
import data from './data'
import './index.css'
import Modal from './Modal'
import { CommentsType, RepliesType, AppPropsType } from '../models/models'

class App extends Component<{}, AppPropsType> {
  constructor(props:any) {
    super(props);
    this.state = {
      productData: [],
      coment: '',
      deleteModal: false,
      idComent: 0,
      idReplay: false,
      edit: false,
      editID: 0,
      editReplayID: false,
      replay: false,
      replayOfReplies:false
    };
  }

  getData = async () => {
    this.setState({
      productData: data
    })
  };

  componentDidMount() {
    this.getData();
  }

  handleNumber = (id: number, parm: string, repliesId?: number|boolean) => {
    const handleChange = () => {
      if (repliesId) {
        const changes =  this.state.productData.comments.map((item :CommentsType , index:number) => {
          return item.id === id ? 
          { ...item,
            replies: item.replies.map((replay: RepliesType, key: number) => {
            return replay.id === repliesId ? 
            parm === "minus" ?
            replay.score === 0 ? replay : {...replay, score:replay.score - 1} 
            : {...replay, score:replay.score + 1} 
             : 
            replay;
          })
        }
          : 
          item
        })
        const newData = {...this.state.productData,
          comments: changes
        }

        return newData;

      } else {
        const changes =  this.state.productData.comments.map((item :CommentsType , index:number) => {
          return item.id === id ? 
          parm === "minus" ?
          item.score === 0 ? 
              item 
               : 
              {...item, score:item.score - 1} 
            :
            {...item, score:item.score + 1} 
          : 
          item;
        })
        const newData = {...this.state.productData,
          comments: changes
        }

        return newData;
      }
    }

    this.setState({
      productData:handleChange() 
    })
  }

  handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (this.state.coment.trim() !== '') {
      this.setState({
        productData:{
          ...this.state.productData,
          comments: 
          [...this.state.productData.comments,
          {
            content: this.state.coment,
            createdAt: '0 minutes ago',
            id: Math.random(),
            replies: [],
            score: 0,
            user: this.state.productData.currentUser
          }]
        },
        coment: ""
      })
    }
  }

  handleChangeText = (e: string) => {
    this.setState({
      coment: e
    })
  }

  handleDelete = () => {
    if (!this.state.idReplay) {
    this.setState({
      productData: {
        ...this.state.productData,
        comments: 
          this.state.productData.comments.filter((item: CommentsType) => item.id !== this.state.idComent )
      }
    })
  } else {
    this.setState({
      productData: {
        ...this.state.productData,
        comments: 
        this.state.productData.comments.map((item:CommentsType , index:number) => {
        return item.id !== this.state.idComent ? 
          item :
          {...item,
            replies: item.replies.filter((replay: RepliesType) => replay.id !== this.state.idReplay )
          }
      })
     }
   })
  }
}

closeDeleteModal = (e: any) => {
  if (e.target.classList.contains("overlay") || e.target.classList.contains("modal-cancel-btn") || e.target.classList.contains("modeal-delete-btn")) {
    this.setState({ deleteModal: false })
  }
}

openDeleteModal = (id: number, repliesId: number|boolean) => {
  this.setState({ 
    deleteModal: true,       
    idComent: id,
    idReplay: repliesId
  })
}

handleOpenEditText = (editID:number, editReplayID:number|boolean) => {
  if (this.state.editID === editID &&       
    this.state.editReplayID === editReplayID &&
    this.state.edit === true) {
      this.setState({ 
        editID: 0,       
        editReplayID: false,
        edit: false
      })
    } else {
  this.setState({ 
    editID: editID,       
    editReplayID: editReplayID,
    edit: true
    })
  }
}

handleEditData = (text:string ,id:number, repliesId:number|boolean) => {
  const handleChange = () => {
    if (repliesId) {
      const changes =  this.state.productData.comments.map((item :CommentsType , index:number) => {
        return item.id === id ? 
        { ...item,
          replies: item.replies.map((replay: RepliesType, key: number) => {
          return replay.id === repliesId ? 
          replay.score === 0 ? replay : {...replay, content:text} 
          :  
          replay;
        })
      }
        : 
        item
      })
      const newData = {...this.state.productData,
        comments: changes
      }

      return newData;

    } else {
      const changes =  this.state.productData.comments.map((item :CommentsType , index:number) => {
        return item.id === id ? 
          {...item, content:text} 
        : 
        item;
      })
      const newData = {...this.state.productData,
        comments: changes
      }

      return newData;
    }
  }

  this.setState({
    productData:handleChange(),
    edit: false
  })
}

handleOpenReplayText = (editID:number, editReplayID:number|boolean, parms: string) => {
  if (this.state.editID === editID &&       
    this.state.editReplayID === editReplayID &&
    ((parms === 'replay' && this.state.replay === true) || (parms === 'replayOfReplies' && this.state.replayOfReplies === true) )) {
      this.setState({ 
        editID: 0,       
        editReplayID: false,
        replay: false,
        replayOfReplies: false
      })
    } else {
  this.setState({ 
    editID: editID,       
    editReplayID: editReplayID,
    replay : parms === 'replay' ? true : false,
    replayOfReplies : parms === 'replayOfReplies' ? true : false
    })
  }
}

handleAddReplay = (e:any, text:string ,id:number, repliesId:number|boolean, userName:string, repliesName: string) => {
  e.preventDefault();

  if (text.trim() !== '') {
    let newText = text;
    if (text.split(' ')[0] === `@${repliesName}` || text.split(' ')[0] == `@${userName}` ) {
      if(repliesName) {
        newText = newText.slice(repliesName.length + 2, newText.length)
      } else {
        newText = newText.slice(userName.length + 2, newText.length)
      }

      text = newText;
      console.log(text)
    }

  const handleChange = () => {
    if (repliesId) {
      let repliesArray: RepliesType[] = [];
      const handleRepliesArray = (data: any) => {
        data?.map((replay: RepliesType, key: number) => {
          replay.id === repliesId ? 
          repliesArray.push(replay, 
            {
              content: text,
              createdAt: '0 minutes ago',
              id: Math.random(),
              replyingTo: repliesName,
              score: 0,
              user: this.state.productData.currentUser
            }
            ) 
          : 
          repliesArray.push(replay) ;
        })
      }

      this.state.productData.comments.map((item :CommentsType , index:number) => {
        handleRepliesArray(item.replies)
      })

      const changes =  this.state.productData.comments.map((item :CommentsType , index:number) => {
        return item.id === id ? 
        { ...item,
          replies: repliesArray
        }
        : 
        item
      })

      const newData = {...this.state.productData,
        comments: changes
      }

      return newData;

    } else {
      const changes =  this.state.productData.comments.map((item :CommentsType , index:number) => {
        return item.id === id ? 
          {
            ...item, 
            replies: [
              {
                content: text,
                createdAt: '0 minutes ago',
                id: Math.random(),
                replyingTo: userName,
                score: 0,
                user: this.state.productData.currentUser
              },
              ...item.replies
            ]
          } 
        : 
        item;
      })

      const newData = {...this.state.productData,
        comments: changes
      }

      return newData;
    }
  }

  this.setState({
    productData:handleChange(),
    replay: false,
    replayOfReplies: false
  })
}
}

  render() {

    return (
      <main>
        {this.state?.productData?.comments && this.state.productData.comments.map((item:CommentsType, index:number) => (
            <Card 
              item={item} 
              key={index} 
              handleNumber={this.handleNumber} 
              currentUser={this.state.productData.currentUser}
              openDeleteModal={this.openDeleteModal}  
              handleOpenEditText={this.handleOpenEditText}
              edit={this.state.edit}
              editID={this.state.editID}
              editReplayID={this.state.editReplayID}
              handleEditData={this.handleEditData}
              replay={this.state.replay}
              handleOpenReplayText={this.handleOpenReplayText}
              handleAddReplay={this.handleAddReplay}
              replayOfReplies={this.state.replayOfReplies}
              />     
        ))}
        <Coment 
          textValue={this.state.coment} 
          handleAddComment={this.handleAddComment} 
          handleChangeText={this.handleChangeText} />

          {this.state.deleteModal && 
          <Modal 
            closeDeleteModal={this.closeDeleteModal} 
            handleDelete={this.handleDelete} 
          />}
      </main>
    )
  }
}

export default App;
