import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Button, Form, Modal, Dropdown} from 'semantic-ui-react'
import { toast } from 'react-toastify';
import dateFormat from 'dateformat';

export function UpdateSale(props) {
  const { open, toggleUpdateSaleModal, sales, fetchSale, pagerSetting } = props;
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

  const handleUpdateSale = (e) => {
    e.preventDefault();
    axios.put('api/sales/put/' + sales.Id, sales)
      .then(response => {
        fetchSale(pagerSetting.page, pagerSetting.pageSize, pagerSetting.sortOrder);
        toggleUpdateSaleModal(false);
        toast.success('Sale Updated Successfully');
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
        <Modal.Header>Edit Sale</Modal.Header>
        <Modal.Content >
          <Form>
          <Form.Field>
              <label>Date Sold</label>
           <input type="date" name="DateSold" 
          // defaultValue="2021-08-16"
           defaultValue={sales !== undefined ? dateFormat(sales.DateSold, "yyyy-mm-dd") : new Date().toISOString().slice(0, 10)} max={new Date().toISOString().slice(0, 10)} 
       onChange={(e) => sales.DateSold = e.target.value}
           />
            </Form.Field>
            <Form.Field>
              <label>Customer</label>
              <Dropdown
                selection
                name="CustomerId"
                options={customerOption}
                placeholder='---Select Customer---'
                defaultValue={sales !== undefined ? sales.CustomerId : null}
                onChange={(e) => sales.CustomerId = e.target.value}
              />
            </Form.Field>
            <Form.Field>
              <label>Product</label>
              <Dropdown
                selection
                name="ProductId"
                options={productOption}
                placeholder='---Select Product---'
                defaultValue={sales !== undefined ? sales.ProductId : null}
               onChange={(e) => sales.ProductId = e.target.value}
              />
            </Form.Field>
            <Form.Field>
              <label>Store</label>
              <Dropdown
                selection
                name="StoreId"
                options={storeOption}
                placeholder='---Select Store---'
                defaultValue={sales !== undefined ? sales.StoreId : null}
                onChange={(e) => sales.StoreId = e.target.value}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => toggleUpdateSaleModal(false)}>
            Cancel
          </Button>
          <Button
            content="Edit"
            labelPosition='right'
            icon='checkmark'
            onClick={handleUpdateSale}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}
