import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { CreateProduct } from './CreateProduct';
import { TableProduct } from './TableProduct';
import { ToastContainer } from 'react-toastify';

export function ProductsList() {

  const [products, setProducts] = useState([]);
  const [createProductModal, setCreateProductModal] = useState(false);
  const [state, setState] = useState({ data: [], page: 1, pageSize: 10, maxPages: 5, totalRecord: 0, sortOrder: "" });

  useEffect((e) => {
    fetchProduct(state.page, state.pageSize, "", "");
  }, []);

  const fetchProduct = (page, pageSize, sortOrder) => {
    const offset = (page - 1) * pageSize;
    let url = "api/product/get?" + "offset=" + offset + "&limit=" + pageSize + "&sortOrder=" + sortOrder;
    axios.get(url)
      .then(res => {
        setProducts(res.data.data);
        setState((prevState) => ({
          ...prevState,
          totalRecord: res.data.totalRecord, data: res.data.data
        }));
      })
      .catch(err => {
        console.log(err);
      })
  }

  const toggleCreateProductModal = (value) => {
    setCreateProductModal(value);
  }

  const setPagerSetting = (entity, data) => {
    setState((prevState) => ({
      ...prevState,
      [entity]: data
    }));
  }

  return (
    <div className="margin-20">
      <CreateProduct open={createProductModal} toggleCreateProductModal={toggleCreateProductModal} fetchProduct={fetchProduct} pagerSetting={state} />
      <Button primary onClick={() => toggleCreateProductModal(true)}>New Product</Button>
      <TableProduct products={products} fetchProduct={fetchProduct} pagerSetting={state} setPagerSettings={setPagerSetting} />
      <ToastContainer />
    </div>
  )
}



