import { io } from 'socket.io-client'
import { WEB_CONNECT } from '@presensi/events'
const socket = io(`${process.env.SOCKET_SERVER}`)
/**
 * check if web connected
 */
export default socket