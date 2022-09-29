import { SortType } from '../../features/packs/packs-api'

export const toggleSorting = (sorting: SortType) => {
  let newSortValue: SortType

  switch (sorting) {
    case '0created':
      newSortValue = '1created'
      break
    case '1created':
      newSortValue = '0created'
      break
    case '0updated':
      newSortValue = '1updated'
      break
    case '1updated':
      newSortValue = '0updated'
  }

  return newSortValue
}
