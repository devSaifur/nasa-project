import { Suspense, lazy } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

const AppLayout = lazy(() => import('./components/AppLayout'))
const Launch = lazy(() => import('./pages/Launch'))
const Upcoming = lazy(() => import('./pages/Upcoming'))
const History = lazy(() => import('./pages/History'))

const router = createBrowserRouter([
  {
    element: (
      <Suspense>
        <AppLayout />
      </Suspense>
    ),
    children: [
      {
        path: '/launch',
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
  {
    path: '*',
    element: <Navigate to="/launch" replace />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
