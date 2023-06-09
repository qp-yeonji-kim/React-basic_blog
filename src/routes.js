import HomePage from './pages/HomePage'
import ListPage from './pages/ListPage'
import CreatePage from './pages/CreatePage'
import EditPage from './pages/EditPage'
import ShowPage from './pages/ShowPage'

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/blogs',
    component: ListPage
  },
  {
    path: '/blogs/create',
    component: CreatePage
  },
  {
    path: '/blogs/edit',
    component: EditPage
  },
  {
    path: '/blogs/:id',
    component: ShowPage
  },
];

export default routes;