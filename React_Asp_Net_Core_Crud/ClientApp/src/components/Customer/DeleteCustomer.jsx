import axios from 'axios';
import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { toast } from 'react-toastify';

export function DeleteCustomer(props) {

  const { open, toggleDeleteCustomerModal, customerId, fetchCustomer, pagerSetting } = props;

  const handleDeleteCustomer = (e) => {
    e.preventDefault();
    axios.delete("api/customer/get/" + customerId)
      .then(res => {
        fetchCustomer(pagerSetting.page, pagerSetting.pageSize, pagerSetting.sortOrder);
        toggleDeleteCustomerModal(false);
        toast.success('Customer Deleted Successfully');
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
        <Modal.Header>Delete Customer</Modal.Header>
        <Modal.Content >
          <div>Are you sure want to delete customer?</div>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => toggleDeleteCustomerModal(false)}>
            Cancel
          </Button>
          <Button
            content="Delete"
            labelPosition='right'
            icon='delete'
            onClick={(e) => handleDeleteCustomer(e)}
            negative
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}
