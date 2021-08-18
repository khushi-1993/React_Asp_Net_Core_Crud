import axios from 'axios';
import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { toast } from 'react-toastify';

export function DeleteStore(props) {

  const { open, toggleDeleteStoreModal, storeId, fetchStore, pagerSetting } = props;

  const handleDeleteStore = (e) => {
    e.preventDefault();
    axios.delete("api/store/delete/" + storeId)
        .then(res => {
            if (res.data.StatusCode == 400) {
                toast.warning('This store is used in sale.');
            }
            else {
                fetchStore(pagerSetting.page, pagerSetting.pageSize, pagerSetting.sortOrder);
                toggleDeleteStoreModal(false);
                toast.success('Store Deleted Successfully');
            }
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
        <Modal.Header>Delete Store</Modal.Header>
        <Modal.Content >
          <div>Are you sure want to delete store?</div>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => toggleDeleteStoreModal(false)}>
            Cancel
          </Button>
          <Button
            content="Delete"
            labelPosition='right'
            icon='delete'
            onClick={(e) => handleDeleteStore(e)}
            negative
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}
