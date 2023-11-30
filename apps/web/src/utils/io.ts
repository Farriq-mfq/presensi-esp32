import { io } from 'socket.io-client'

const socket = io(`${process.env.SOCKET_SERVER}`)

socket.emit('connect_web', true)


export default socket