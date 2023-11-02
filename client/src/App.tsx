import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Launch from './pages/Launch'
import Upcoming from './pages/Upcoming'
import History from './pages/History'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Launch />,
      },
      {
        path: '/upcoming',
        element: <Upcoming />,
      },
      {
        path: '/history',
        element: <History />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
