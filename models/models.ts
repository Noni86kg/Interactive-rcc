export interface CommentsType {
        id: number,
        content: string,
        createdAt: string,
        score: number
        user: {
          image: { 
            png: string,
            webp: string
          },
          username: string
        },
        replies: [
            {
                id: number,
                content: string,
                createdAt: string,
                score: number,
                replyingTo: string
                user: {
                  image: { 
                    png: string,
                    webp: string
                  },
                  username: string
                }
              }
        ]
}

export interface RepliesType {
    id: number,
    content: string,
    createdAt: string,
    score: number,
    replyingTo: string
    user: {
      image: { 
        png: string,
        webp: string
      },
      username: string
    }
  }

export interface AppPropsType {
    productData: any,
    coment: string,
    deleteModal: boolean,
    idComent: number,
    idReplay: boolean|number,
    edit: boolean,
    editID: number,
    editReplayID: boolean|number,
    replay: boolean,
    replayOfReplies:boolean
}

export interface CardType {
    item: CommentsType;
    key: number;
    handleNumber: (id: number, parm: string, repliesId?: number|boolean) => void;
    currentUser: any;
    openDeleteModal: (id: number, repliesId: number|boolean) => void;
    handleOpenEditText: (editID:number, editReplayID:number|boolean) => void;
    edit: boolean;
    editID: number;
    editReplayID: number|boolean;
    handleEditData: (text:string ,id:number, repliesId:number|boolean) => void;
    replay: boolean;
    handleOpenReplayText: (editID:number, editReplayID:number|boolean, parms: string) => void;
    handleAddReplay: (e:any, text:string ,id:number, repliesId:number|boolean, userName:string, repliesName: string) => void;
    replayOfReplies: boolean;
}

export interface ReplayType {
  item: CommentsType;
  editReplayID: number|boolean;
  handleAddReplay: (e:any, text:string ,id:number, repliesId:number|boolean, userName:string, repliesName: any) => void;
}

export interface ComentType {
    textValue: string;
    handleAddComment: (e: React.FormEvent) => void;
    handleChangeText: (e: string) => void;
}

export interface ModalType {
    closeDeleteModal: (e: any) => void;
    handleDelete: () => void;
}