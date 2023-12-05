
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
        handle: {
            crumb: "Home"
        },
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: '/users',
                handle: {
                    crumb: "Users"
                },
                children: [
                    {
                        index: true,
                        Component: Users,
                    },
                    {
                        path: '/users/add',
                        Component: AddUser,
                        handle: {
                            crumb: "Add"
                        },

                    },
                ]
            },

            {
                path: '/mode',
                Component: Mode,
                handle: {
                    crumb: "Mode"
                },
            },
            {
                path: '/presensi',
                Component: Presensi,
                handle: {
                    crumb: "Presensi"
                },
            },
        ]
    }
]);

export default router