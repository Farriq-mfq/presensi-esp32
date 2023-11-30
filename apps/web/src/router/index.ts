
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts';
import Home from '../pages/Home';
import About from '../pages/About';
import Users from '../pages/Users';
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
            }
        ]
    }
]);

export default router