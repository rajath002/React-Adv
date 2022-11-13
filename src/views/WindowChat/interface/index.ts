export interface IMessage {
    message: string,
    sender: string,
    id: string,
}

export interface IWindow {
    loggedInUser: string,
    messages: IMessage[]
}