import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import { toast } from 'react-toastify';

export function CreateProduct(props) {

  const { open, toggleCreateProductModal, fetchProduct, pagerSetting } = props;
  const [product, setProduct] = useState({ Name: "", Address: "" });

  const handleChange = e => {
    e.persist();
    setProduct(prevProduct => ({ ...prevProduct, [e.target.name]: e.target.value }));
  }

  const handleCreateProduct = (e) => {
    e.preventDefault();
    axios.post('api/product/post', product)
      .then(response => {
        setProduct({ Name: "", Address: "" });
        fetchProduct(pagerSetting.page, pagerSetting.pageSize, pagerSetting.sortOrder);
        toggleCreateProductModal(false);
        toast.success('Product Added Successfully');
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
        <Modal.Header>Create Product</Modal.Header>
        <Modal.Content >
          <Form>
            <Form.Field>
              <label>NAME</label>
              <input placeholder='Please Enter Name' name="Name" onChange={handleChange} />
            </Form.Field>
            <Form.Field>
              <label>PRICE</label>
              <input type="number" placeholder='Please Enter Price' name="Address" onChange={handleChange} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => toggleCreateProductModal(false)}>
            Cancel
          </Button>
          <Button
            content="Create"
            labelPosition='right'
            icon='checkmark'
            onClick={(e) => handleCreateProduct(e)}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}
