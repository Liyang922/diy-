import { connect } from "react-redux";
import { setStock, addStock } from "../../../redux/modules/stock/action";
import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import type { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import type { TableProps } from 'antd';
import { StockData } from "../../../redux/interface";

const EditableContext : any = React.createContext(null);

const EditableRow = ({ index, ...props } : any) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

// cell
const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  } : any) => {
    const [editing, setEditing] = useState(false);
    const inputRef : any = useRef(null);
    const form : any = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current?.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values,
        });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
};


function ExsitingStock(props : any) {
    const { stockData, setStock, addStock } = props;
    const [dataSource, setDataSource] = useState(stockData);

    // dataSource变化时存储到redux中
    useEffect(() => {
        setStock(dataSource);
    }, [dataSource])
      
    // count作为key
    const [count, setCount] = useState(dataSource.length);
    // 删除
    const handleDelete = (key : any) => {
        const newData = dataSource.filter((item : any) => item.key !== key);
        setDataSource(newData);
    };

    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<StockData>>({});

    // 表格列的配置项
    const defaultColumns = [
        {
            title: '类别',
            dataIndex: 'category',
            key: 'category',
            width: '30%',
            editable: true,
            sorter: (a : any, b : any) => a.category > b.category ? -1 : 1,
            sortOrder: sortedInfo.columnKey === 'category' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: '子类别',
            dataIndex: 'subcategory',
            key: 'subcategory',
            editable: true,
            sorter: (a : any, b : any) => a.subcategory > b.subcategory ? -1 : 1,
            sortOrder: sortedInfo.columnKey === 'subcategory' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: '数量',
            dataIndex: 'number',
            key: 'number',
            editable: true,
            sorter: (a : any, b : any) => +a.number - +b.number,
            sortOrder: sortedInfo.columnKey === 'number' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (_ : any, record : any) =>
            dataSource.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                <a>Delete</a>
                </Popconfirm>
            ) : null,
        },
    ];

    // 增加表格项
    const handleAdd = () => {
        const newData = {
            key: count.toString(),
            category: `木头`,
            subcategory: '黑胡桃木',
            number: `1`,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const handleSave = (row : any) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };

    const handleChange: TableProps<StockData>['onChange'] = (pagination, filters, sorter) => {
        // console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<StockData>);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    // 对col进行处理，增加editable属性
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            // 设置cell属性
            onCell: (record : any) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    return (
        <div>
            <Button
                onClick={handleAdd}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
            增加库存信息
            </Button>
            <Table
                // 覆盖默认的 table 元素
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                // 表格列的配置描述
                columns={columns}
                onChange={handleChange}
            />
        </div>
    );
}

const mapStateToProps = (state: any) => state.stock;
const mapDispatchToProps = { setStock, addStock };
export default connect(mapStateToProps, mapDispatchToProps)(ExsitingStock);
