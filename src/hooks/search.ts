import MiniSearch from 'minisearch'
import { documents } from 'md:search'

const miniSearch = new MiniSearch({
  fields: ['title', 'anchors'],
  storeFields: ['file', 'path', 'title'],
  searchOptions: {
    fuzzy: 0.5,
    prefix: true,
    boost: { markdown: 1 }
  }
})

miniSearch.addAll(documents)

export const useSearch = () => {
  return {
    search: (query: string) => {
      return miniSearch.search(query)
    }
  }
}
