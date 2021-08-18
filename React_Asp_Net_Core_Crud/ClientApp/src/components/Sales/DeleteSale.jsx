import axios from 'axios';
import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { toast } from 'react-toastify';

export function DeleteSale(props) {

  const { open, toggleDeleteSaleModal, saleId, fetchSale, pagerSetting } = props;

  const handleDeleteSale = (e) => {
    e.preventDefault();
    axios.delete("api/sales/delete/" + saleId)
        .then(res => {
                fetchSale(pagerSetting.page, pagerSetting.pageSize, pagerSetting.sortOrder);
                toggleDeleteSaleModal(false);
                toast.success('Sale Deleted Successfully');
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
        <Modal.Header>Delete Sale</Modal.Header>
        <Modal.Content >
          <div>Are you sure want to delete sale?</div>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => toggleDeleteSaleModal(false)}>
            Cancel
          </Button>
          <Button
            content="Delete"
            labelPosition='right'
            icon='delete'
            onClick={(e) => handleDeleteSale(e)}
            negative
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}
