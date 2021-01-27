//https://material-table.com/#/
import React from 'react';
import MaterialTable from 'material-table';

const MaterialTable_my = (props) => {
  return (
    <MaterialTable
      title={props.title}
      columns={props.columns}
      data={props.data}
      options={{
        sorting: props.sorting ? props.sorting : true,
        search: props.search ? props.search : true,
        pageSize: props.search ? props.search : 10,
        filtering: props.filtering ? props.filtering : false,
        selection: props.selection ? props.selection : false,
        rowStyle: {
          backgroundColor: '#EEE',
        },
        headerStyle: {
          backgroundColor: '#EEE',
        },
      }}
    />
  );
};

export default MaterialTable_my;
