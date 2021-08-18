import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Button, Form, Modal, Dropdown } from 'semantic-ui-react'
import { toast } from 'react-toastify';

export function CreateSale(props) {

  const { open, toggleCreateSaleModal, fetchSale, pagerSetting } = props;
  const [sale, setSale] = useState({ DateSold: new Date().toISOString().slice(0, 10), ProductId: null,CustomerId:null,StoreId:null });
  const [productOption, setProductOption] = useState(null);
  const [customerOption, setCustomerOption] = useState(null);
  const [storeOption, setStoreOption] = useState(null);

  useEffect((e) => {
    fetchProduct();
    fetchCustomer();
    fetchStore();
  }, []);

  const fetchProduct = () => {
    axios.get('api/product/GetAll')
      .then(response => {
        const productOptionSet = [];
        response.data.map((e) => (
          productOptionSet.push({ text: e.Name, value: e.Id })
        ))
        setProductOption(productOptionSet);
      })
      .catch(err => {
        toast.error(err);
      })
  }

  const fetchCustomer = () => {
    axios.get('api/customer/GetAll')
      .then(response => {
        const customerOptionSet = [];
        response.data.map((e) => (
          customerOptionSet.push({ text: e.Name, value: e.Id })
        ))
        setCustomerOption(customerOptionSet);
      })
      .catch(err => {
        toast.error(err);
      })
  }

  const fetchStore = () => {
    axios.get('api/store/GetAll')
      .then(response => {
        const storeOptionSet = [];
        response.data.map((e) => (
          storeOptionSet.push({ text: e.Name, value: e.Id })
        ))
        setStoreOption(storeOptionSet);
      })
      .catch(err => {
        toast.error(err);
      })
  }

  const handleChange = (e,data) => {
    e.persist();
    setSale(prevSale => ({ ...prevSale, [data.name]: data.value }));
  }

  const handleDateChange = (e) => {
    e.preventDefault();
    setSale(prevSale => ({ ...prevSale, [e.target.name]: e.target.value }));
  }

  const handleCreateSale = (e) => {
    e.preventDefault();
    if(sale.DateSold === "" )
    {
      setSale(prevSale => ({ ...prevSale, DateSold: new Date().toISOString().slice(0, 10) }));
    }

    axios.post('api/sales/post', sale)
      .then(response => {
        setSale({ DateSold: "", ProductId: null,CustomerId:null,StoreId:null  });
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
                          <label>Date Sold<span className="red"> *</span></label>
           <input type="date" name="DateSold" defaultValue={new Date().toISOString().slice(0, 10)} max={new Date().toISOString().slice(0, 10)} onChange={handleDateChange}/>
            </Form.Field>
            <Form.Field>
                          <label>Customer<span className="red"> *</span></label>
              <Dropdown
                selection
                name="CustomerId"
                options={customerOption}
                placeholder='---Select Customer---'
               onChange={handleChange}
               required
              />
            </Form.Field>
            <Form.Field>
                          <label>Product<span className="red"> *</span></label>
              <Dropdown
                selection
                name="ProductId"
                options={productOption}
                placeholder='---Select Product---'
               onChange={handleChange}
               required
              />
            </Form.Field>
            <Form.Field>
                          <label>Store<span className="red"> *</span></label>
              <Dropdown
                selection
                name="StoreId"
                options={storeOption}
                placeholder='---Select Store---'
               onChange={handleChange}
               required
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
