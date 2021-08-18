import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { CreateCustomer } from './CreateCustomer';
import { TableCustomer } from './TableCustomer';
import { ToastContainer } from 'react-toastify';

export function CustomersList() {

  const [customers, setCustomers] = useState([]);
  const [createCustomerModal, setCreateCustomerModal] = useState(false);
  const [state, setState] = useState({ data: [], page: 1, pageSize: 10, maxPages: 5, totalRecord: 0, sortOrder: "" });

  useEffect((e) => {
    fetchCustomer(state.page, state.pageSize, "");
  }, []);

  const fetchCustomer = (page, pageSize, sortOrder) => {
    const offset = (page - 1) * pageSize;
      let url = "api/customer/get?" + "offset=" + offset + "&limit=" + pageSize + "&sortOrder=" + sortOrder;
    axios.get(url)
      .then(res => {
        setCustomers(res.data.data);
        setState((prevState) => ({
          ...prevState,
          totalRecord: res.data.totalRecord, data: res.data.data
        }));
      })
      .catch(err => {
        console.log(err);
      })
  }

  const toggleCreateCustomerModal = (value) => {
    setCreateCustomerModal(value);
  }

  const setPagerSetting = (entity, data) => {
    setState((prevState) => ({
      ...prevState,
      [entity]: data
    }));
  }

  return (
    <div className="margin-20">
      <CreateCustomer open={createCustomerModal} toggleCreateCustomerModal={toggleCreateCustomerModal} fetchCustomer={fetchCustomer} pagerSetting={state} />
      <Button primary onClick={() => toggleCreateCustomerModal(true)}>New Customer</Button>
      <TableCustomer customers={customers} fetchCustomer={fetchCustomer} pagerSetting={state} setPagerSettings={setPagerSetting} />
      <ToastContainer />
    </div>
  )
}



