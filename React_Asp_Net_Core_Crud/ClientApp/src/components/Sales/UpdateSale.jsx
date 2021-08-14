import axios from 'axios';
import React from 'react'
import { Button, Form, Modal,DateInput, Dropdown} from 'semantic-ui-react'
import { toast } from 'react-toastify';

export function UpdateSale(props) {
  const { open, toggleUpdateSaleModal, sale, fetchSale, pagerSetting } = props;

  const handleUpdateSale = (e) => {
    e.preventDefault();
    axios.put('api/sales/put/' + sale.Id, sale)
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
            <Dropdown className="custom-dropdown"
         // options={options}
         // onChange={handleDataSizeChange}
          defaultValue={pagerSetting.pageSize}
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
