import MiniSearch from 'minisearch'
import { documents } from 'md:search'
import type { SearchResult } from '@/types/search'

const suffixes = (term: string, minLength: number) => {
  if (term === null) {
    return
  }

  const tokens = []

  for (let i = 0; i <= term.length - minLength; i++) {
    tokens.push(term.slice(i))
  }

  return tokens
}

const segmenterCN = new Intl.Segmenter('zh', { granularity: 'sentence' })

const miniSearch = new MiniSearch({
  fields: ['title', 'anchors', 'text'],
  storeFields: ['file', 'path', 'title', 'anchors', 'text'],
  tokenize: (string, fieldName) => {
    if (fieldName === 'text') {
      const sentences = Array.from(segmenterCN.segment(string), (s) => s.segment.replace(/\n$/, ''))
      return sentences
    } else {
      return string.split('\n')
    }
  },
  processTerm: (term, fieldName) => {
    if (fieldName !== 'text') {
      return suffixes(term, 2)
    }
    return term
  },
  searchOptions: {
    fuzzy: true,
    prefix: true,
    boost: { title: 6, anchors: 4, text: 1 }
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
