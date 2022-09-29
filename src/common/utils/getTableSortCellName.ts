import { SortType } from '../../features/packs/packs-api'

export const getTableSortCellName = (sorting: SortType) => {
  let cellName = ''

  switch (sorting) {
    case '0created':
      cellName = 'Last Created ⬇'
      break
    case '1created':
      cellName = 'Last Created ⬆'
      break
    case '0updated':
      cellName = 'Last Updated ⬇'
      break
    case '1updated':
      cellName = 'Last Updated ⬆'
  }

  return cellName
}
