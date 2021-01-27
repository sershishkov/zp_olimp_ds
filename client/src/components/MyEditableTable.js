import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

const MyEditableTable = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
  }, [setData, props.data]);

  return (
    <MaterialTable
      title={props.title}
      columns={props.columns}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);

              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              console.log(oldData);
              console.log(newData);
              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);

              resolve();
            }, 1000);
          }),
      }}
      options={{
        sorting: props.sorting ? props.sorting : true,
        search: props.search ? props.search : true,
        pageSize: props.search ? props.search : 10,
        filtering: props.filtering ? props.filtering : false,
      }}
    />
  );
};

export default MyEditableTable;
