import React, { useState, useEffect } from 'react'

import ArticleCard from '../../components/ArticleCard/ArticleCard'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import './articlesListPage.scss'

import { useAppDispatch, useSelectorTyped } from '../../redux'
import { fetchArticles, searchArticles } from '../../redux/features/articles'

const ArticlesListPage: React.FC = () => {
  const [textInputValue, setTextInputValue] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(0)

  const dispatch = useAppDispatch()
  const { articles, loading } = useSelectorTyped(({ articles }) => ({
    articles: articles.articles,
    loading: articles.loading,
  }))

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTextInputValue(event.target.value)
    setCurrentPage(0)
  }

  function loadArticles(search: string, page = 0) {
    if (search === '') {
      dispatch(fetchArticles(page))
        .unwrap()
        .catch(() => {
          console.log('Something went wrong')
        })
    } else {
      dispatch(searchArticles({ search, page }))
        .unwrap()
        .catch(() => {
          console.log('Something went wrong')
        })
    }
  }

  function handleLoadMore() {
    loadArticles(textInputValue, currentPage + 1)
    setCurrentPage((prev) => prev + 1)
  }

  useEffect(() => {
    loadArticles(textInputValue)
  }, [textInputValue])

  return (
    <>
      <div className="search-container">
        <TextField
          sx={{
            height: 50,
            marginBottom: '50px',
            width: '600px',
          }}
          id="outlined-basic"
          label="Filter by keywords"
          variant="outlined"
          onChange={handleChange}
        />
        <p className="searching-result">Results: {articles?.length || 0}</p>
      </div>
      <ul className="articles-list">
        {articles?.length > 0 &&
          articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              searchValue={textInputValue}
            />
          ))}
      </ul>
      <div className="pagination">
        <Button variant="contained" type="button" onClick={handleLoadMore}>
          {loading ? 'Loading' : 'Load more'}
        </Button>
      </div>
    </>
  )
}

export default ArticlesListPage
