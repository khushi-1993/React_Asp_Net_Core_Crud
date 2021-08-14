import React, { useState } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
import { UpdateCustomer } from './UpdateCustomer';
import { DeleteCustomer } from './DeleteCustomer';
import { Pager } from './../Pager';

export function TableCustomer(props) {
    const { customers, fetchCustomer, pagerSetting, setPagerSettings } = props;
    const [column, setColumn] = useState(null);
    const [direction, setDirection] = useState(null);
    const [updateCustomerModal, setUpdateCustomerModal] = useState(false);
    const [deleteCustomerModal, setDeleteCustomerModal] = useState(false);
    const [customerID, setCustomerID] = useState(null);
    const [customer, setCustomer] = useState({ Id: "", Name: "", Address: "" });

    const toggleUpdateCustomerModal = (value, cust) => {
        setUpdateCustomerModal(value);
        if (cust != null) {
            setCustomer({ Id: cust.Id, Name: cust.Name, Address: cust.Address });
        }
    }

    const toggleDeleteCustomerModal = (value, customerId) => {
        setDeleteCustomerModal(value);
        if (customerId != null) {
            setCustomerID(customerId);
        }
    }

    const handleHeaderClick = (event, header) => {
        event.preventDefault();

        let newSortOrder = pagerSetting.sortOrder;

        switch (header) {
            case 'Name': {
                if (pagerSetting.sortOrder === 'Name') {
                    newSortOrder = 'Name_desc';
                    setColumn("Name_desc");
                    setDirection("descending");
                }
                else {
                    newSortOrder = 'Name';
                    setColumn("Name");
                    setDirection("ascending");
                }
                break;
            }
            case 'Address': {
                if (pagerSetting.sortOrder === 'Address') {
                    newSortOrder = 'Address_desc';
                    setColumn("Address_desc");
                    setDirection("descending");
                }
                else {
                    newSortOrder = 'Address';
                    setColumn("Address");
                    setDirection("ascending");
                }
                break;
            }
            default:
                {
                    newSortOrder = 'Id_desc';
                    setColumn("Id_desc");
                    setDirection("descending");
                    break;
                }
        }

        setPagerSettings('sortOrder', newSortOrder);
        fetchCustomer(pagerSetting.page, pagerSetting.pageSize, newSortOrder)
    }

    return (
        <div>
            <div className="marginTop-20 container_table">
                <Table sortable celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                onClick={(e) => handleHeaderClick(e, 'Name')}
                                sorted={column === 'Name' ? direction : column === 'Name_desc' ? 'descending' : null}
                            >
                                Name
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                onClick={(e) => handleHeaderClick(e, 'Address')}
                                sorted={column === 'Address' ? direction : column === 'Address_desc' ? 'descending' : null}
                            >
                                Address
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Actions
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Actions
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            customers.map((c) => (
                                <Table.Row key={c.Id}>
                                    <Table.Cell>{c.Name}</Table.Cell>
                                    <Table.Cell>{c.Address}</Table.Cell>
                                    <Table.Cell> <Button className="fontsize-12" color='yellow' icon onClick={() => toggleUpdateCustomerModal(true, c)}><Icon name='edit' /> EDIT</Button></Table.Cell>
                                    <Table.Cell> <Button className="fontsize-12" color='red' icon onClick={() => toggleDeleteCustomerModal(true, c.Id)}><Icon name='trash' /> DELETE</Button></Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table>
                <UpdateCustomer open={updateCustomerModal} toggleUpdateCustomerModal={toggleUpdateCustomerModal} customer={customer} fetchCustomer={fetchCustomer} pagerSetting={pagerSetting} />
                <DeleteCustomer open={deleteCustomerModal} toggleDeleteCustomerModal={toggleDeleteCustomerModal} customerId={customerID} fetchCustomer={fetchCustomer} pagerSetting={pagerSetting} />
            </div>
            <div className="marginTop-20">
                <Pager totalItems={props.pagerSetting.totalRecord} handlePageChange={pagerSetting.handlePageChange} fetchData={fetchCustomer} pagerSetting={pagerSetting} setPagerSettings={setPagerSettings} />
            </div>
        </div>
    )
}
