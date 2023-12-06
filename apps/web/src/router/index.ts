
import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Auth/Login';
import Home from '../pages/Home';
import Mode from '../pages/Mode';
import Presensi from '../pages/Presensi';
import Users from '../pages/Users';
import AddUser from '../pages/Users/add';
const router = createBrowserRouter([
    {
        id: 'root',
        path: '/',
        Component: MainLayout,
        handle: {
            crumb: "Dashboard"
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
    },
    // {
    //     id: "auth_root",
    //     path: "/auth",
    //     Component: AuthLayout,
    //     children: [
    //         {
    //             path: "/login",
    //             Component:Login
    //         }
    //     ]
    // }
]);

export default router