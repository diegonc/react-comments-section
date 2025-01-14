import React, { useContext, useState, useEffect } from 'react'
import styles from '../Style.scss'
import { ActionContext } from './ActionContext'

const InputField = ({ cancellor, parentId, child, value, edit, main }) => {
  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }

  useEffect(() => {
    setText(value)
  }, [value])

  const onCancel = () => {
    setText('')
    edit
      ? actions.handleCancel(cancellor, edit)
      : actions.handleCancel(cancellor)

  }

  const onSubmit = (event) => {
    event.preventDefault()
    edit === true
      ? actions.submit(cancellor, text, parentId, true, setText)
      : actions.submit(cancellor, text, parentId, false, setText)
    return false
  }

  const actions = useContext(ActionContext)
  return (
    <form
      className={styles.form}
      style={
        !child && !edit && main === undefined
          ? { marginLeft: 36 }
          : { marginLeft: 8 }
      }
      onSubmit={onSubmit}
    >
      <div className={styles.userImg}>
        <img
          src={actions.userImg}
          style={{ width: 38, height: 38, borderRadius: 38 / 2 }}
          alt='userIcon'
        />
      </div>
      <input
        className={styles.postComment}
        type='text'
        placeholder={actions.i18n.post.placeholder}
        component='input'
        value={text}
        onChange={handleChange}
      />
      <div className={styles.inputActions}>
        <button
          className={styles.postBtn}
          onClick={() =>
            edit === true
              ? actions.submit(cancellor, text, parentId, true, setText)
              : actions.submit(cancellor, text, parentId, false, setText)
          }
          type='button'
          disabled={!text}
          style={
            !text
              ? { backgroundColor: '#84dcff' }
              : { backgroundColor: '#30c3fd' }
          }
        >
          {actions.i18n.post.post}
        </button>
        {(text || parentId) && (
          <button
            className={styles.cancelBtn}
            onClick={onCancel}
            type='button'
          >
            {actions.i18n.post.cancel}
          </button>
        )}
      </div>
    </form>
  )
}

export default InputField
