import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Button, Form, Modal,DateInput,Dropdown} from 'semantic-ui-react'
import { toast } from 'react-toastify';

export function CreateSale(props) {

  const { open, toggleCreateSaleModal, fetchSale, pagerSetting } = props;
  const [sale, setSale] = useState({ Name: "", Address: "" });
  const [productOption,setProductOption] = useState(null);

  useEffect((e) => {
    fetchProduct();
  }, []);

  const fetchProduct = () =>
  {
    axios.get('api/product/GetAll')
    .then(response => {
    })
    .catch(err => {
        toast.error(err);
    })
  }

  // const fetchCustomer = () =>
  // {
    
  // }

  // const fetchStore = () =>
  // {
    
  // }

  const handleChange = e => {
    e.persist();
    setSale(prevSale => ({ ...prevSale, [e.target.name]: e.target.value }));
  }

  const handleCreateSale = (e) => {
    e.preventDefault();
    axios.post('api/sales/post', sale)
      .then(response => {
        setSale({ Name: "", Address: "" });
        fetchSale(pagerSetting.page, pagerSetting.pageSize, pagerSetting.sortOrder);
        toggleCreateSaleModal(false);
        toast.success('Sale Added Successfully');
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
        <Modal.Header>Create Sale</Modal.Header>
        <Modal.Content >
          <Form>
            <Form.Field>
              <label>NAME</label>
              {/* <DateInput
          inline
          name='date'
         // value={this.state.date}
          defaultShow={true}
          onChange={this.handleDateChange}
        /> */}
            </Form.Field>
            <Form.Field>
            <Dropdown 
          options={productOption}
         // onChange={handleDataSizeChange}
          defaultValue={pagerSetting.pageSize}
        />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => toggleCreateSaleModal(false)}>
            Cancel
          </Button>
          <Button
            content="Create"
            labelPosition='right'
            icon='checkmark'
            onClick={(e) => handleCreateSale(e)}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}
