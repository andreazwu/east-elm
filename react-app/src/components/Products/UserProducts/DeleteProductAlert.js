import React from "react"
import { useDispatch } from "react-redux"
import { thunkDeleteProduct } from "../../../store/product"

const DeleteProductAlert = ({id, setShowDeleteAlert}) => {
  const dispatch = useDispatch()

  const handleDelete = async (e) => {
    e.preventDefault()
    await dispatch(thunkDeleteProduct(id))
      .then(() => setShowDeleteAlert(false))
  }
  return (
    <div>
      <h4>Delete Product Listing</h4>
      <div>
        <p>Are you sure you wish to delete this product? This cannot be undone.</p>
        <div>
          <button onClick={()=>setShowDeleteAlert(false)}>
            CANCEL
          </button>
          <button onClick={handleDelete}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteProductAlert
