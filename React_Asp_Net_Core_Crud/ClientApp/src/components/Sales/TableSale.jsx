import React, { useState } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
import { UpdateSale } from './UpdateSale';
import { DeleteSale } from './DeleteSale';
import { Pager } from './../Pager';
import dateFormat from 'dateformat';


export function TableSale(props) {
    const { sales, fetchSale, pagerSetting, setPagerSettings } = props;
    const [column, setColumn] = useState(null);
    const [direction, setDirection] = useState(null);
    const [updateSaleModal, setUpdateSaleModal] = useState(false);
    const [deleteSaleModal, setDeleteSaleModal] = useState(false);
    const [saleID, setSaleID] = useState(null);
    const [sale, setSale] = useState({ Id: "", DateSold: new Date().toISOString().slice(0, 10), ProductId: null, CustomerId: null, StoreId: null });

    const toggleUpdateSaleModal = (value, cust) => {
        setUpdateSaleModal(value);
        if (cust != null) {
            setSale({ Id: cust.Id, DateSold: cust.DateSold, ProductId: cust.ProductId, CustomerId: cust.CustomerId, StoreId: cust.StoreId });
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
            case 'Product_Name': {
                if (pagerSetting.sortOrder === 'Product_Name') {
                    newSortOrder = 'Product_Name_desc';
                    setColumn("Product_Name_desc");
                    setDirection("descending");
                }
                else {
                    newSortOrder = 'Product_Name';
                    setColumn("Product_Name");
                    setDirection("ascending");
                }
                break;
            }
            case 'Customer_Name': {
                if (pagerSetting.sortOrder === 'Customer_Name') {
                    newSortOrder = 'Customer_Name_desc';
                    setColumn("Customer_Name_desc");
                    setDirection("descending");
                }
                else {
                    newSortOrder = 'Customer_Name';
                    setColumn("Customer_Name");
                    setDirection("ascending");
                }
                break;
            }
            case 'Store_Name': {
                if (pagerSetting.sortOrder === 'Store_Name') {
                    newSortOrder = 'Store_Name_desc';
                    setColumn("Store_Name_desc");
                    setDirection("descending");
                }
                else {
                    newSortOrder = 'Store_Name';
                    setColumn("Store_Name");
                    setDirection("ascending");
                }
                break;
            }
            case 'DateSold': {
                if (pagerSetting.sortOrder === 'DateSold') {
                    newSortOrder = 'DateSold_desc';
                    setColumn("DateSold_desc");
                    setDirection("descending");
                }
                else {
                    newSortOrder = 'DateSold';
                    setColumn("DateSold");
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
                            onClick={(e) => handleHeaderClick(e, 'Customer_Name')}
                            sorted={column === 'Customer_Name' ? direction : column === 'Customer_Name_desc' ? 'descending' : null}
                            >
                                Customer
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                 onClick={(e) => handleHeaderClick(e, 'Product_Name')}
                                 sorted={column === 'Product_Name' ? direction : column === 'Product_Name_desc' ? 'descending' : null}
                            >
                                Product
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                onClick={(e) => handleHeaderClick(e, 'Store_Name')}
                                sorted={column === 'Store_Name' ? direction : column === 'Store_Name_desc' ? 'descending' : null}
                            >
                                Store
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                onClick={(e) => handleHeaderClick(e, 'DateSold')}
                                sorted={column === 'DateSold' ? direction : column === 'DateSold_desc' ? 'descending' : null}
                            >
                                Date Sold
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
                            (sales && sales.map((s) => (
                                <Table.Row key={s.Id}>
                                    <Table.Cell>{s.CustomerName}</Table.Cell>
                                    <Table.Cell>{s.ProductName}</Table.Cell>
                                    <Table.Cell>{s.StoreName}</Table.Cell>
                                    <Table.Cell>{dateFormat(s.DateSold, "dd mmm, yyyy")}</Table.Cell>
                                    <Table.Cell> <Button className="fontsize-12" color='yellow' icon onClick={() => toggleUpdateSaleModal(true, s)}><Icon name='edit' /> EDIT</Button></Table.Cell>
                                    <Table.Cell> <Button className="fontsize-12" color='red' icon onClick={() => toggleDeleteSaleModal(true, s.Id)}><Icon name='trash' /> DELETE</Button></Table.Cell>
                                </Table.Row>
                            )))
                        }
                    </Table.Body>
                </Table>
                <UpdateSale open={updateSaleModal} toggleUpdateSaleModal={toggleUpdateSaleModal} sales={sale} fetchSale={fetchSale} pagerSetting={pagerSetting} />
                <DeleteSale open={deleteSaleModal} toggleDeleteSaleModal={toggleDeleteSaleModal} saleId={saleID} fetchSale={fetchSale} pagerSetting={pagerSetting} />
            </div>
            <div className="marginTop-20">
                <Pager totalItems={props.pagerSetting.totalRecord} handlePageChange={pagerSetting.handlePageChange} fetchData={fetchSale} pagerSetting={pagerSetting} setPagerSettings={setPagerSettings} />
            </div>
        </div>
    )
}
