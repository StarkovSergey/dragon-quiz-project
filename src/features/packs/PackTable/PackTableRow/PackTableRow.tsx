import React, { useState } from 'react'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import SchoolIcon from '@mui/icons-material/School'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import { IconButton, TableCell, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { DeleteModal } from '../../../../common/components/modals/DeleteModal/DeleteModal'
import { SaveNameModal } from '../../../../common/components/modals/SaveNameModal/SaveNameModal'
import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import tableStyle from '../../../../styles/study-table.module.css'
import { deletePackTC, editPackTC, PackDomainType } from '../../packs-reducer'
import style from '../../packs.module.css'

type PropsType = {
  pack: PackDomainType
}

export const PackTableRow = ({ pack }: PropsType) => {
  const userID = useAppSelector(state => state.auth.profile?._id)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [openModal, setOpenModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const getPackId = () => {
    navigate(`/cards/${pack._id}`)
  }

  const deleteButtonClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setOpenDeleteModal(true)
  }

  const editButtonClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setOpenModal(true)
  }

  const deletePack = () => {
    dispatch(deletePackTC(pack._id))
  }

  const editPack = (newTitle: string) => {
    dispatch(editPackTC(pack._id, newTitle))
  }

  const deleteModalTitle = `Do you really want to remove ${pack.name}?
  All cards will be deleted.`

  return (
    <>
      <TableRow
        key={pack._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        className={style['table-row']}
        onClick={getPackId}
      >
        <TableCell component="th" scope="row">
          {pack.name}
        </TableCell>

        <TableCell align="center">{pack.cardsCount}</TableCell>
        <TableCell align="center" className={tableStyle['sorting-cell']}>
          {pack.updated.slice(0, 10)}
        </TableCell>
        <TableCell align="right" className={tableStyle['created-cell']}>
          {pack.user_name}
        </TableCell>

        <TableCell align="right">
          {userID === pack.user_id ? (
            <div>
              <IconButton disabled={pack.cardsCount === 0 || pack.status === 'loading'}>
                <SchoolIcon />
              </IconButton>
              <IconButton onClick={editButtonClickHandler} disabled={pack.status === 'loading'}>
                <ModeEditIcon />
              </IconButton>
              <IconButton onClick={deleteButtonClickHandler} disabled={pack.status === 'loading'}>
                <WhatshotIcon color={pack.status === 'loading' ? 'inherit' : 'primary'} />
              </IconButton>
            </div>
          ) : (
            <IconButton disabled={pack.cardsCount === 0}>
              <SchoolIcon />
            </IconButton>
          )}
          <SaveNameModal
            title="Edit pack name"
            itemTitle={pack.name}
            open={openModal}
            toggleOpenMode={setOpenModal}
            saveName={editPack}
          />
          <DeleteModal
            title="Delete Card"
            message={deleteModalTitle}
            open={openDeleteModal}
            toggleOpenMode={setOpenDeleteModal}
            deleteItem={deletePack}
          />
        </TableCell>
      </TableRow>
    </>
  )
}
