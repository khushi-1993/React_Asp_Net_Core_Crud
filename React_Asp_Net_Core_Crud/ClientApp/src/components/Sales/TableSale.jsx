import React, { useState } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
import { UpdateSale } from './UpdateSale';
import { DeleteSale } from './DeleteSale';
import { Pager } from './../Pager';

export function TableSale(props) {
    const { sales, fetchSale, pagerSetting, setPagerSettings } = props;
    const [column, setColumn] = useState(null);
    const [direction, setDirection] = useState(null);
    const [updateSaleModal, setUpdateSaleModal] = useState(false);
    const [deleteSaleModal, setDeleteSaleModal] = useState(false);
    const [saleID, setSaleID] = useState(null);
    const [sale, setSale] = useState({ Id: "", Name: "", Address: "" });

    const toggleUpdateSaleModal = (value, cust) => {
        setUpdateSaleModal(value);
        if (cust != null) {
            setSale({ Id: cust.Id, Name: cust.Name, Address: cust.Address });
        }
    }

    const toggleDeleteSaleModal = (value, saleId) => {
        setDeleteSaleModal(value);
        if (saleId != null) {
            setSaleID(saleId);
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
        fetchSale(pagerSetting.page, pagerSetting.pageSize, newSortOrder)
    }

    return (
        <div>
            <div className="marginTop-20 container_table">
                <Table sortable celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                              //  onClick={(e) => handleHeaderClick(e, 'Name')}
                              //  sorted={column === 'Customer' ? direction : column === 'Name_desc' ? 'descending' : null}
                            >
                                Name
                            </Table.HeaderCell>
                            <Table.HeaderCell
                               //onClick={(e) => handleHeaderClick(e, 'Address')}
                              //  sorted={column === 'Address' ? direction : column === 'Address_desc' ? 'descending' : null}
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
                            sales.map((c) => (
                                <Table.Row key={c.Id}>
                                    {/* <Table.Cell>{c.}</Table.Cell>
                                    <Table.Cell>{c.Address}</Table.Cell> */}
                                    <Table.Cell> <Button className="fontsize-12" color='yellow' icon onClick={() => toggleUpdateSaleModal(true, c)}><Icon name='edit' /> EDIT</Button></Table.Cell>
                                    <Table.Cell> <Button className="fontsize-12" color='red' icon onClick={() => toggleDeleteSaleModal(true, c.Id)}><Icon name='trash' /> DELETE</Button></Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table>
                <UpdateSale open={updateSaleModal} toggleUpdateSaleModal={toggleUpdateSaleModal} sale={sale} fetchSale={fetchSale} pagerSetting={pagerSetting} />
                <DeleteSale open={deleteSaleModal} toggleDeleteSaleModal={toggleDeleteSaleModal} saleId={saleID} fetchSale={fetchSale} pagerSetting={pagerSetting} />
            </div>
            <div className="marginTop-20">
                <Pager totalItems={props.pagerSetting.totalRecord} handlePageChange={pagerSetting.handlePageChange} fetchData={fetchSale} pagerSetting={pagerSetting} setPagerSettings={setPagerSettings} />
            </div>
        </div>
    )
}
