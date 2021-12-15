import React from 'react'
import { Link } from 'react-router-dom'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import { ReactComponent as ArrowRight } from '../../assets/ArrowRight.svg'
import { ReactComponent as Calendar } from '../../assets/Calendar.svg'

import './articleCard.scss'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function showFormattedDate(dateObj: Date) {
  const month = months[dateObj.getMonth()]
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()

  return `${month} ${day}th, ${year}`
}

interface IArticleCardProps {
  article: IArticle
  searchValue: string
}

const ArticleCard: React.FC<IArticleCardProps> = ({ article, searchValue }) => {
  function getHighlightedHtml(text: string) {
    return text.replace(
      new RegExp(`${searchValue}`, 'ig'),
      "<em class='highlighted'>$&</em>"
    )
  }

  const shortenedArticle =
    article.summary.length > 100
      ? `${article.summary.slice(0, 100)}...`
      : article.summary

  return (
    <li key={article.id} className="article-card">
      <Link className="article-link" to={`/${article.id}`}>
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <CardMedia
            sx={{ height: 220 }}
            component="img"
            height="140"
            image={article.imageUrl}
            alt={article.title}
          />
          <CardContent>
            <div className="date-wrapper">
              <Calendar className="icon-calendar" />
              <Typography
                variant="body2"
                sx={{
                  color: '#363636',
                  opacity: '0.6',
                  fontSize: '14px',
                  paddingBottom: '24px',
                }}
              >
                {showFormattedDate(new Date(article.publishedAt))}
              </Typography>
            </div>
            <Typography
              gutterBottom
              variant="h5"
              sx={{
                fontSize: '24px',
                lineHeight: '29px',
                color: '#363636',
                paddingBottom: '20px',
              }}
              dangerouslySetInnerHTML={
                searchValue
                  ? { __html: getHighlightedHtml(article.title) }
                  : { __html: article.title }
              }
            />
            <Typography
              variant="body2"
              color="text.secondary"
              dangerouslySetInnerHTML={
                searchValue
                  ? { __html: getHighlightedHtml(shortenedArticle) }
                  : { __html: shortenedArticle }
              }
            />
          </CardContent>
          <CardActions
            sx={{
              marginTop: 'auto',
              padding: '16px',
            }}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#363636',
                textTransform: 'none',
              }}
            >
              Read More <ArrowRight className="icon-arrow" />
            </Typography>
          </CardActions>
        </Card>
      </Link>
    </li>
  )
}

export default ArticleCard
