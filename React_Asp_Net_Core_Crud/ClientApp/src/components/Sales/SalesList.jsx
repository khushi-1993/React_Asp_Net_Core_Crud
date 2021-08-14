import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { CreateSale } from './CreateSale';
import { TableSale } from './TableSale';
import { ToastContainer } from 'react-toastify';

export function SalesList() {

  const [sales, setSales] = useState([]);
  const [createSaleModal, setCreateSaleModal] = useState(false);
  const [state, setState] = useState({ data: [], page: 1, pageSize: 10, maxPages: 5, totalRecord: 0, sortOrder: "" });

  useEffect((e) => {
    fetchSale(state.page, state.pageSize, "", "");
  }, []);

  const fetchSale = (page, pageSize, sortOrder) => {
    const offset = (page - 1) * pageSize;
    let url = "api/sales/get?" + "offset=" + offset + "&limit=" + pageSize + "&sortOrder=" + sortOrder;
    axios.get(url)
      .then(res => {
        setSales(res.data.data);
        setState((prevState) => ({
          ...prevState,
          totalRecord: res.data.totalRecord, data: res.data.data
        }));
      })
      .catch(err => {
        console.log(err);
      })
  }

  const toggleCreateSaleModal = (value) => {
    setCreateSaleModal(value);
  }

  const setPagerSetting = (entity, data) => {
    setState((prevState) => ({
      ...prevState,
      [entity]: data
    }));
  }

  return (
    <div className="margin-20">
      <CreateSale open={createSaleModal} toggleCreateSaleModal={toggleCreateSaleModal} fetchSale={fetchSale} pagerSetting={state} />
      <Button primary onClick={() => toggleCreateSaleModal(true)}>New Sale</Button>
      <TableSale sales={sales} fetchSale={fetchSale} pagerSetting={state} setPagerSettings={setPagerSetting} />
      <ToastContainer />
    </div>
  )
}



