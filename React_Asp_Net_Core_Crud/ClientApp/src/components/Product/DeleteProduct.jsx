import axios from 'axios';
import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { toast } from 'react-toastify';

export function DeleteProduct(props) {

  const { open, toggleDeleteProductModal, productId, fetchProduct, pagerSetting } = props;

  const handleDeleteProduct = (e) => {
    e.preventDefault();
    axios.delete("api/product/delete/" + productId)
        .then(res => {
            if (res.data.StatusCode == 400) {
                toast.warning('This product is used in sale.');
            }
            else {
                fetchProduct(pagerSetting.page, pagerSetting.pageSize, pagerSetting.sortOrder);
                toggleDeleteProductModal(false);
                toast.success('Product Deleted Successfully');
            }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div>
      <Modal
        open={open}
      >
        <Modal.Header>Delete Product</Modal.Header>
        <Modal.Content >
          <div>Are you sure want to delete product?</div>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => toggleDeleteProductModal(false)}>
            Cancel
          </Button>
          <Button
            content="Delete"
            labelPosition='right'
            icon='delete'
            onClick={(e) => handleDeleteProduct(e)}
            negative
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}
