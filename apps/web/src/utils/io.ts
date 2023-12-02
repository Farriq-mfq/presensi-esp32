import { io } from 'socket.io-client'
import events from '@presensi/events'
const socket = io(`${process.env.SOCKET_SERVER}`)
socket.emit(events.WEB_CONNECT, "CONNECTED WITH WEB");
export default socket