import {
  AnyAction,
  AsyncThunk,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'

import {
  getArticleId,
  getNewArticlesBySummary,
  getNewArticlesByTitle,
} from '../../servises/servises'

type TGenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type TPendingAction = ReturnType<TGenericAsyncThunk['pending']>
type TRejectedAction = ReturnType<TGenericAsyncThunk['rejected']>

function isPendingAction(action: AnyAction): action is TPendingAction {
  return action.type.endsWith('/pending')
}

function isRejectedAction(action: AnyAction): action is TRejectedAction {
  return action.type.endsWith('/rejected')
}

function filterResponse(toFilter: IArticle[], ids: number[]) {
  return toFilter.filter((article) => !ids.includes(article.id))
}

interface IArticlesState {
  articles: IArticle[]
  selectedArticle: IArticle
  bySummary: IArticle[]
  byTitle: IArticle[]
  loading: boolean
  error: string | undefined
}

const initialState: IArticlesState = {
  articles: [],
  selectedArticle: {} as IArticle,
  bySummary: [],
  byTitle: [],
  loading: false,
  error: undefined,
}

interface IGetArticleArgs {
  search: string
  page?: number
}

interface ISearchResponse {
  byTitle: IArticle[]
  bySummary: IArticle[]
  page: number
}

export const fetchArticles = createAsyncThunk<
  IArticle[],
  number,
  { rejectValue: Record<string, any> }
>('articles/fetchArticles', async (page, thunkAPI) => {
  try {
    return await getNewArticlesByTitle('', page)
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e?.response.data)
  }
})

export const searchArticles = createAsyncThunk<
  ISearchResponse,
  IGetArticleArgs,
  { rejectValue: Record<string, any> }
>('articles/searchArticles', async ({ search, page }, thunkAPI) => {
  try {
    const getByTitle: Promise<IArticle[]> = getNewArticlesByTitle(search, page)
    const getBySummary: Promise<IArticle[]> = getNewArticlesBySummary(
      search,
      page
    )

    const [responseByTitle, responseBySummary] = await Promise.all([
      getByTitle,
      getBySummary,
    ])

    return {
      byTitle: responseByTitle,
      bySummary: responseBySummary,
      page: page || 0,
    }
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e?.response.data)
  }
})

export const fetchArticle = createAsyncThunk<
  IArticle,
  string,
  { rejectValue: Record<string, any> }
>('articles/fetchArticle', async (id, thunkAPI) => {
  try {
    return await getArticleId(id)
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e?.response.data)
  }
})

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, { payload }) => {
      state.articles = payload
      state.loading = false
    })

    builder.addCase(searchArticles.fulfilled, (state, { payload }) => {
      if (payload.page === 0) {
        const ids = payload.byTitle.map((article) => article.id)
        const filterred = filterResponse(payload.bySummary, ids)

        state.byTitle = payload.byTitle
        state.bySummary = payload.bySummary
        state.articles = [...payload.byTitle, ...filterred]
      } else {
        const fullByTitle = [...state.byTitle, ...payload.byTitle]
        const fullBySummary = [...state.bySummary, ...payload.bySummary]
        const ids = fullByTitle.map((article) => article.id)
        const filterred = filterResponse(fullBySummary, ids)

        state.byTitle = fullByTitle
        state.bySummary = fullBySummary
        state.articles = [...payload.byTitle, ...filterred]
      }

      state.loading = false
    })

    builder.addCase(fetchArticle.fulfilled, (state, { payload }) => {
      state.selectedArticle = payload
      state.loading = false
    })

    builder.addMatcher(isPendingAction, (state) => {
      state.loading = true
    })
    builder.addMatcher(isRejectedAction, (state) => {
      state.loading = false
    })
  },
})

export default notificationsSlice.reducer
