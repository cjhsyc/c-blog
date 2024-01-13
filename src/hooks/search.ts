import MiniSearch from 'minisearch'
import { documents } from 'md:search'
import type { SearchResult } from '@/types/search'

const segmenterCN = Intl.Segmenter && new Intl.Segmenter('zh', { granularity: 'word' })

const miniSearch = new MiniSearch({
  fields: ['title', 'anchors', 'text'],
  storeFields: ['file', 'path', 'title', 'anchors', 'text'],
  tokenize: (string, fieldName) => {
    if (segmenterCN) {
      return Array.from(segmenterCN.segment(string))
        .filter((s) => s.isWordLike)
        .map((s) => s.segment)
    } else {
      return MiniSearch.getDefault('tokenize')(string, fieldName)
    }
  },
  processTerm: (term) => term,
  searchOptions: {
    fuzzy: 0.25,
    prefix: true,
    boost: { title: 10, anchors: 8, text: 1 }
  }
})

miniSearch.addAll(documents)

export const useSearch = () => {
  return {
    search: (query: string) => {
      return miniSearch.search(query) as SearchResult[]
    }
  }
}
