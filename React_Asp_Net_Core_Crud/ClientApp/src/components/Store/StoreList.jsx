import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { CreateStore } from './CreateStore';
import { TableStore } from './TableStore';
import { ToastContainer } from 'react-toastify';

export function StoresList() {

  const [stores, setStores] = useState([]);
  const [createStoreModal, setCreateStoreModal] = useState(false);
  const [state, setState] = useState({ data: [], page: 1, pageSize: 10, maxPages: 5, totalRecord: 0, sortOrder: "" });

  useEffect((e) => {
    fetchStore(state.page, state.pageSize, "", "");
  }, []);

  const fetchStore = (page, pageSize, sortOrder) => {
    const offset = (page - 1) * pageSize;
    let url = "api/store/get?" + "offset=" + offset + "&limit=" + pageSize + "&sortOrder=" + sortOrder;
    axios.get(url)
      .then(res => {
        setStores(res.data.data);
        setState((prevState) => ({
          ...prevState,
          totalRecord: res.data.totalRecord, data: res.data.data
        }));
      })
      .catch(err => {
        console.log(err);
      })
  }

  const toggleCreateStoreModal = (value) => {
    setCreateStoreModal(value);
  }

  const setPagerSetting = (entity, data) => {
    setState((prevState) => ({
      ...prevState,
      [entity]: data
    }));
  }

  return (
    <div className="margin-20">
      <CreateStore open={createStoreModal} toggleCreateStoreModal={toggleCreateStoreModal} fetchStore={fetchStore} pagerSetting={state} />
      <Button primary onClick={() => toggleCreateStoreModal(true)}>New Store</Button>
      <TableStore stores={stores} fetchStore={fetchStore} pagerSetting={state} setPagerSettings={setPagerSetting} />
      <ToastContainer />
    </div>
  )
}



