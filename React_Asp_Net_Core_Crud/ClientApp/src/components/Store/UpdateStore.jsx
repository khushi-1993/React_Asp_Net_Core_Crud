import axios from 'axios';
import React from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import { toast } from 'react-toastify';

export function UpdateStore(props) {
  const { open, toggleUpdateStoreModal, store, fetchStore, pagerSetting } = props;

  const handleUpdateStore = (e) => {
    e.preventDefault();
    axios.put('api/store/put/' + store.Id, store)
      .then(response => {
        fetchStore(pagerSetting.page, pagerSetting.pageSize, pagerSetting.sortOrder);
        toggleUpdateStoreModal(false);
        toast.success('Store Updated Successfully');
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
        <Modal.Header>Edit Store</Modal.Header>
        <Modal.Content >
          <Form>
            <Form.Field>
              <label>NAME</label>
              <input placeholder='Please Enter Name' name="Name" onChange={(e) => store.Name = e.target.value} defaultValue={store !== undefined ? store.Name : ""} />
            </Form.Field>
            <Form.Field>
              <label>ADDRESS</label>
              <input placeholder='Please Enter Address' name="Address" onChange={(e) => store.Address = e.target.value} defaultValue={store !== undefined ? store.Address : ""} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => toggleUpdateStoreModal(false)}>
            Cancel
          </Button>
          <Button
            content="Edit"
            labelPosition='right'
            icon='checkmark'
            onClick={handleUpdateStore}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}
