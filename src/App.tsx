import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux'

import ArticlesListPage from './view/ArticlesListPage/ArticlesListPage'
import ArticlePage from './view/ArcticlePage/ArticlePage'

import './App.scss'

function App() {
  return (
    <div className="main-container">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<ArticlesListPage />} path="/articles-ts/" />
            <Route element={<ArticlePage />} path="/articles-ts/:id" />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
