import React, { useState } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
import { UpdateProduct } from './UpdateProduct';
import { DeleteProduct } from './DeleteProduct';
import { Pager } from './../Pager';

export function TableProduct(props) {
    const { products, fetchProduct, pagerSetting, setPagerSettings } = props;
    const [column, setColumn] = useState(null);
    const [direction, setDirection] = useState(null);
    const [updateProductModal, setUpdateProductModal] = useState(false);
    const [deleteProductModal, setDeleteProductModal] = useState(false);
    const [productID, setProductID] = useState(null);
    const [product, setProduct] = useState({ Id: "", Name: "", Price: "" });

    const toggleUpdateProductModal = (value, cust) => {
        setUpdateProductModal(value);
        if (cust != null) {
            setProduct({ Id: cust.Id, Name: cust.Name, Price: cust.Price });
        }
    }

    const toggleDeleteProductModal = (value, productId) => {
        setDeleteProductModal(value);
        if (productId != null) {
            setProductID(productId);
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
            case 'Price': {
                if (pagerSetting.sortOrder === 'Price') {
                    newSortOrder = 'Price_desc';
                    setColumn("Price_desc");
                    setDirection("descending");
                }
                else {
                    newSortOrder = 'Price';
                    setColumn("Price");
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
        fetchProduct(pagerSetting.page, pagerSetting.pageSize, newSortOrder)
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
                                onClick={(e) => handleHeaderClick(e, 'Price')}
                                sorted={column === 'Price' ? direction : column === 'Price_desc' ? 'descending' : null}
                            >
                                Price
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
                           (products && products.map((c) => (
                                <Table.Row key={c.Id}>
                                    <Table.Cell>{c.Name}</Table.Cell>
                                    <Table.Cell><Icon name='dollar sign' />{c.Price}</Table.Cell>
                                    <Table.Cell> <Button className="fontsize-12" color='yellow' icon onClick={() => toggleUpdateProductModal(true, c)}><Icon name='edit' /> EDIT</Button></Table.Cell>
                                    <Table.Cell> <Button className="fontsize-12" color='red' icon onClick={() => toggleDeleteProductModal(true, c.Id)}><Icon name='trash' /> DELETE</Button></Table.Cell>
                                </Table.Row>
                            )))
                        }
                    </Table.Body>
                </Table>
                <UpdateProduct open={updateProductModal} toggleUpdateProductModal={toggleUpdateProductModal} product={product} fetchProduct={fetchProduct} pagerSetting={pagerSetting} />
                <DeleteProduct open={deleteProductModal} toggleDeleteProductModal={toggleDeleteProductModal} productId={productID} fetchProduct={fetchProduct} pagerSetting={pagerSetting} />
            </div>
            <div className="marginTop-20">
                <Pager totalItems={props.pagerSetting.totalRecord} handlePageChange={pagerSetting.handlePageChange} fetchData={fetchProduct} pagerSetting={pagerSetting} setPagerSettings={setPagerSettings} />
            </div>
        </div>
    )
}
