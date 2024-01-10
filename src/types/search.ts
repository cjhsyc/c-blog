import { type SearchResult as MiniSearchResult } from 'minisearch'

export type SearchResult = MiniSearchResult & {
  file: string
  title: string
  anchors: string
  text: string
  path: string
}
