import React, { useState } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
import { UpdateStore } from './UpdateStore';
import { DeleteStore } from './DeleteStore';
import { Pager } from './../Pager';

export function TableStore(props) {
    const { stores, fetchStore, pagerSetting, setPagerSettings } = props;
    const [column, setColumn] = useState(null);
    const [direction, setDirection] = useState(null);
    const [updateStoreModal, setUpdateStoreModal] = useState(false);
    const [deleteStoreModal, setDeleteStoreModal] = useState(false);
    const [storeID, setStoreID] = useState(null);
    const [store, setStore] = useState({ Id: "", Name: "", Address: "" });

    const toggleUpdateStoreModal = (value, cust) => {
        setUpdateStoreModal(value);
        if (cust != null) {
            setStore({ Id: cust.Id, Name: cust.Name, Address: cust.Address });
        }
    }

    const toggleDeleteStoreModal = (value, storeId) => {
        setDeleteStoreModal(value);
        if (storeId != null) {
            setStoreID(storeId);
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
        fetchStore(pagerSetting.page, pagerSetting.pageSize, newSortOrder)
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
                            stores.map((c) => (
                                <Table.Row key={c.Id}>
                                    <Table.Cell>{c.Name}</Table.Cell>
                                    <Table.Cell>{c.Address}</Table.Cell>
                                    <Table.Cell> <Button className="fontsize-12" color='yellow' icon onClick={() => toggleUpdateStoreModal(true, c)}><Icon name='edit' /> EDIT</Button></Table.Cell>
                                    <Table.Cell> <Button className="fontsize-12" color='red' icon onClick={() => toggleDeleteStoreModal(true, c.Id)}><Icon name='trash' /> DELETE</Button></Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table>
                <UpdateStore open={updateStoreModal} toggleUpdateStoreModal={toggleUpdateStoreModal} store={store} fetchStore={fetchStore} pagerSetting={pagerSetting} />
                <DeleteStore open={deleteStoreModal} toggleDeleteStoreModal={toggleDeleteStoreModal} storeId={storeID} fetchStore={fetchStore} pagerSetting={pagerSetting} />
            </div>
            <div className="marginTop-20">
                <Pager totalItems={props.pagerSetting.totalRecord} handlePageChange={pagerSetting.handlePageChange} fetchData={fetchStore} pagerSetting={pagerSetting} setPagerSettings={setPagerSettings} />
            </div>
        </div>
    )
}
