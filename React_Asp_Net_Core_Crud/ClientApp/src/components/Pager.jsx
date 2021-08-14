import React from 'react';
import { Pagination, Dropdown, Menu } from 'semantic-ui-react';
export function Pager(props) {

  const { fetchData, setPagerSettings, pagerSetting } = props;

  const options = [
    { text: '5', value: 5 },
    { text: '10', value: 10 },
    { text: '50', value: 50 },
  ]

  const handleDataSizeChange = (e, data) => {
    setPagerSettings('pageSize', data.value);
    fetchData(pagerSetting.page, data.value, pagerSetting.sortOrder)
  }

  const paginate = () => {
    const { totalItems } = props;
    let currentPage = pagerSetting.page;

    // calculate total pages
    let totalPages = Math.ceil(totalItems / pagerSetting.pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage, endPage;
    startPage = 1;
    endPage = totalPages;

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pagerSetting.pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage
    }
  }

  const { currentPage, totalPages } = paginate();

  const onChangePagination = (e, pageInfo) => {
    setPagerSettings('page', pageInfo.activePage);
    fetchData(pageInfo.activePage, pagerSetting.pageSize, pagerSetting.sortOrder)
  };

  return (
    <div >
      <Menu compact>
        <Dropdown className="custom-dropdown"
          options={options}
          onChange={handleDataSizeChange}
          defaultValue={pagerSetting.pageSize}
        />
      </Menu>
      <div className="float-right">
        <Pagination
          activePage={currentPage}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          totalPages={totalPages}
          onPageChange={onChangePagination}
        />
      </div>
    </div>
  )
}