import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useParams } from 'react-router-dom'

import { useAppDispatch, useSelectorTyped } from '../../redux'
import { fetchArticle } from '../../redux/features/articles'

import { ReactComponent as ArrowLeft } from '../../assets/ArrowLeft.svg'
import './articlePage.scss'

export default function ArticlePage() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { article, loading } = useSelectorTyped(({ articles }) => ({
    article: articles.selectedArticle,
    loading: articles.loading,
  }))

  useEffect(() => {
    dispatch(fetchArticle(id as string))
      .unwrap()
      .catch(() => {
        console.log('Something went wrong')
      })
  }, [id])

  return !loading ? (
    <>
      <img
        className="background-img"
        src={article.imageUrl}
        alt={article.title}
      />
      <div className="content-article">
        <h1>{article.title}</h1>
        <p>{article.summary}</p>
      </div>

      <Link className="link-back-home" to="/articles-ts/">
        <ArrowLeft className="icon-arrow-left" />
        <span>Back to homepage</span>
      </Link>
    </>
  ) : (
    <p>loading...</p>
  )
}
