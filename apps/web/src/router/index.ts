
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts';
import Home from '../pages/Home';
import Mode from '../pages/Mode';
import Presensi from '../pages/Presensi';
import Users from '../pages/Users';
import AddUser from '../pages/Users/add';
const router = createBrowserRouter([
    {
        id: 'root',
        path: '/',
        Component: Layout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/users',
                Component: Users
            },
            {
                path: '/users/add',
                Component: AddUser
            },
            {
                path: '/mode',
                Component: Mode
            },
            {
                path: '/presensi',
                Component: Presensi
            },
        ]
    }
]);

export default router