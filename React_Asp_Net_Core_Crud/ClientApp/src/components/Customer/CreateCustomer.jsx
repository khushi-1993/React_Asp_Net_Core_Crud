import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import { toast } from 'react-toastify';

export function CreateCustomer(props) {

    const { open, toggleCreateCustomerModal, fetchCustomer, pagerSetting } = props;
    const [customer, setCustomer] = useState({ Name: "", Address: "" });

    const handleChange = e => {
        e.persist();
        setCustomer(prevCustomer => ({ ...prevCustomer, [e.target.name]: e.target.value }));
    }

    const handleCreateCustomer = (e) => {
        e.preventDefault();
        axios.post('api/customer/post', customer)
            .then(response => {
                setCustomer({ Name: "", Address: "" });
                fetchCustomer(pagerSetting.page, pagerSetting.pageSize, pagerSetting.sortOrder);
                toggleCreateCustomerModal(false);
                toast.success('Customer Added Successfully');
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
                <Modal.Header>Create Customer</Modal.Header>
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
                    <Button color='black' onClick={() => toggleCreateCustomerModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        content="Create"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={(e) => handleCreateCustomer(e)}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </div>
    )
}
