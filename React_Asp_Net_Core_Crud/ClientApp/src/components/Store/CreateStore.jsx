import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import { toast } from 'react-toastify';

export function CreateStore(props) {

  const { open, toggleCreateStoreModal, fetchStore, pagerSetting } = props;
  const [store, setStore] = useState({ Name: "", Address: "" });

  const handleChange = e => {
    e.persist();
    setStore(prevStore => ({ ...prevStore, [e.target.name]: e.target.value }));
  }

  const handleCreateStore = (e) => {
    e.preventDefault();
    axios.post('api/store/post', store)
      .then(response => {
        setStore({ Name: "", Address: "" });
        fetchStore(pagerSetting.page, pagerSetting.pageSize, pagerSetting.sortOrder);
        toggleCreateStoreModal(false);
        toast.success('Store Added Successfully');
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
        <Modal.Header>Create Store</Modal.Header>
        <Modal.Content >
          <Form>
            <Form.Field>
                          <label>NAME<span className="red"> *</span></label>
              <input placeholder='Please Enter Name' name="Name" onChange={handleChange} />
            </Form.Field>
            <Form.Field>
                          <label>ADDRESS<span className="red"> *</span></label>
              <input placeholder='Please Enter Address' name="Address" onChange={handleChange} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => toggleCreateStoreModal(false)}>
            Cancel
          </Button>
          <Button
            content="Create"
            labelPosition='right'
            icon='checkmark'
            onClick={(e) => handleCreateStore(e)}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}
