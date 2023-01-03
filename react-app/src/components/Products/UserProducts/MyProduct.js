import { useState } from "react"
import { Link } from "react-router-dom"
import { Modal } from "../../../context/Modal"
import DeleteProductAlert from "./DeleteProductAlert"
import EditProductForm from "./EditProductForm"
import noimage from "../../Images/noimage.jpg"

const MyProduct = ({ product }) => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  return (
    <div className="myproduct-wrapper">

      <div className="myproduct-img">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.Images[0].url}
            alt="myproduct-img"
            onError={e => e.target.src={noimage}}
          />
        </Link>
      </div>

      <div className="myproduct-info">
        <Link to={`/products/${product.id}`}>
          <div className="myproduct-name">{product.name}</div>
        </Link>
        <div className="myproduct-category">{product.category}</div>
        <div className="myproduct-price">${Number(product.price).toFixed(2)}</div>
      </div>

      <div className="myproduct-buttons-container">
        <button className="myproduct-edit" onClick={()=>setShowEditModal(true)}>
          EDIT
        </button>
        <div>
        {showEditModal && (
          <Modal onClose={()=>setShowEditModal(false)}>
            <EditProductForm
              setShowEditModal={setShowEditModal}
              product={product}
            />
          </Modal>
        )}
        </div>
        <button className="myproduct-delete" onClick={()=>setShowDeleteAlert(true)}>
          DELETE
        </button>
        <div>
        {showDeleteAlert && (
          <Modal onClose={()=>setShowDeleteAlert(false)}>
            <DeleteProductAlert
              setShowDeleteAlert={setShowDeleteAlert}
              id={product.id}
            />
          </Modal>
        )}
        </div>
      </div>

    </div>
  )
}

export default MyProduct
