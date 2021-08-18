import axios from 'axios';
import React from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import { toast } from 'react-toastify';

export function UpdateProduct(props) {
  const { open, toggleUpdateProductModal, product, fetchProduct, pagerSetting } = props;

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    axios.put('api/product/put/' + product.Id, product)
      .then(response => {
        fetchProduct(pagerSetting.page, pagerSetting.pageSize, pagerSetting.sortOrder);
        toggleUpdateProductModal(false);
        toast.success('Product Updated Successfully');
      })
      .catch(err => {
        if (err.response) {
          toast.warning("All Fields are required");
        } else if (err.request) {
          console.log(err.request)
        } else {
          toast.error(err);
        }
      })
  }

  return (
    <div>
      <Modal
        open={open}
      >
        <Modal.Header>Edit Product</Modal.Header>
        <Modal.Content >
          <Form>
            <Form.Field>
                          <label>NAME<span className="red"> *</span></label>
              <input placeholder='Please Enter Name' name="Name" onChange={(e) => product.Name = e.target.value} defaultValue={product !== undefined ? product.Name : ""} />
            </Form.Field>
            <Form.Field>
                          <label>PRICE<span className="red"> *</span></label>
              <input type="number" placeholder='Please Enter Price' name="Price" onChange={(e) => product.Price = e.target.value} defaultValue={product !== undefined ? product.Price : ""} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => toggleUpdateProductModal(false)}>
            Cancel
          </Button>
          <Button
            content="Edit"
            labelPosition='right'
            icon='checkmark'
            onClick={handleUpdateProduct}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}
