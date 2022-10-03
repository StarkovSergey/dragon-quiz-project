import React, { useState } from 'react'

import WhatshotIcon from '@mui/icons-material/Whatshot'
import { IconButton } from '@mui/material'

import { Button } from '../../../common/components/Button/Button'
import { SaveNameModal } from '../../../common/components/modals/SaveNameModal/SaveNameModal'
import { SearchBar } from '../../../common/components/SearchBar/SearchBar'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import tableStyles from '../../../styles/study-table.module.css'
import { addNewPackTC, ResetFiltersTC, searchPacksTC } from '../packs-reducer'
import style from '../packs.module.css'

import { NumberOfCards } from './NumberOfCards/NumberOfCards'
import { ShowCardsPack } from './ShowPacksCards/ShowCardsPack'

export const PackSettings = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.packs.addingNewPackStatus)
  const searchText = useAppSelector(state => state.packs.search)
  const [openModal, setOpenModal] = useState(false)

  const searchPack = (text: string) => {
    dispatch(searchPacksTC(text))
  }

  const addNewPack = (packName: string) => {
    dispatch(addNewPackTC(packName))
  }

  const resetFilters = () => {
    dispatch(ResetFiltersTC())
  }

  const addButtonHandler = (showModal: boolean) => {
    setOpenModal(showModal)
  }

  return (
    <div>
      <div className={tableStyles.header}>
        <h2>Pack list</h2>
        <Button onClick={() => addButtonHandler(true)} art disabled={status === 'loading'}>
          Add new pack
        </Button>
      </div>
      <div className={style.settings}>
        <SearchBar search={searchPack} className={style.search} searchText={searchText} />
        <ShowCardsPack />
        <NumberOfCards />
        <IconButton className={style['filter-button']} onClick={resetFilters} size={'large'}>
          <WhatshotIcon color={'primary'} />
        </IconButton>
      </div>
      <SaveNameModal
        title="Add new pack"
        open={openModal}
        toggleOpenMode={setOpenModal}
        saveName={addNewPack}
        isAddNewItem={true}
      />
    </div>
  )
}
