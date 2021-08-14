import axios from 'axios';
import React from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import { toast } from 'react-toastify';

export function UpdateCustomer(props) {
  const { open, toggleUpdateCustomerModal, customer, fetchCustomer, pagerSetting } = props;

  const handleUpdateCustomer = (e) => {
    e.preventDefault();
    axios.put('api/customer/put/' + customer.Id, customer)
      .then(response => {
        fetchCustomer(pagerSetting.page, pagerSetting.pageSize, pagerSetting.sortOrder);
        toggleUpdateCustomerModal(false);
        toast.success('Customer Updated Successfully');
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
        <Modal.Header>Edit Customer</Modal.Header>
        <Modal.Content >
          <Form>
            <Form.Field>
              <label>NAME</label>
              <input placeholder='Please Enter Name' name="Name" onChange={(e) => customer.Name = e.target.value} defaultValue={customer !== undefined ? customer.Name : ""} />
            </Form.Field>
            <Form.Field>
              <label>ADDRESS</label>
              <input placeholder='Please Enter Address' name="Address" onChange={(e) => customer.Address = e.target.value} defaultValue={customer !== undefined ? customer.Address : ""} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => toggleUpdateCustomerModal(false)}>
            Cancel
          </Button>
          <Button
            content="Edit"
            labelPosition='right'
            icon='checkmark'
            onClick={handleUpdateCustomer}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}
