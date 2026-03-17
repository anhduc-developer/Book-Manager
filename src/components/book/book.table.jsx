import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Flex, notification, Popconfirm, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import BookDetail from "./view.book";
import UpdateBookControl from "./update.book.control";
import UpdateBookUncontrol from "./update.book.uncontrol";
import { deleteBookAPI } from "../../services/api.service";
const BookTable = (props) => {
  const {
    loadBooks,
    dataBook,
    current,
    setCurrent,
    pageSize,
    setPageSize,
    total,
  } = props;
  const [dataDetail, setDataDetail] = useState({});
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isOpenBookUpdate, setIsOpenBookUpdate] = useState(false);
  const [bookDataUpdate, setBookDataUpdate] = useState(null);
  useEffect(() => {
    loadBooks();
  }, [current, pageSize]);
  const onChange = (pagination, filters, sorter, extra) => {
    //neu page thay doi => set lai page
    //them dau + de convert kieu du lieu "5" => 5
    if (pagination && pagination.current) {
      if (+pagination.current != +current) {
        setCurrent(+pagination.current);
      }
    }
    //neu thay doi pageSize
    if (pagination && pagination.pageSize) {
      if (!pagination.pageSize != +pageSize) {
        setPageSize(+pagination.pageSize);
      }
    }
  };
  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return (
          <div style={{ marginLeft: "15px" }}>
            {(current - 1) * pageSize + index + 1}
          </div>
        );
      },
    },
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => (
        <a
          onClick={() => {
            setDataDetail(record);
            setIsDetailOpen(true);
          }}
        >
          {record._id}
        </a>
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "mainText",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      render: (text, record, index, action) => {
        if (text) {
          return new Intl.NumberFormat(`vi-VN`, {
            style: "currency",
            currency: `VND`,
          }).format(text);
        }
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <EditOutlined
            onClick={() => {
              setBookDataUpdate(record);
              setIsOpenBookUpdate(true);
            }}
            style={{ color: "orange" }}
          />
          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            placement="left"
            onConfirm={() => {
              handleDeleteBook(record._id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];
  const handleDeleteBook = async (id) => {
    const resDelete = await deleteBookAPI(id);
    if (resDelete.data) {
      notification.success({
        message: "Delete Book success",
        description: "Xóa book thành công",
      });
      setIsOpenBookUpdate(false);
      loadBooks();
    } else {
      notification.error({
        message: "Delete Book Failed",
        description: JSON.stringify(resDelete.message),
      });
    }
  };
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataBook}
        rowKey={"_id"}
        onChange={onChange}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
      />
      <UpdateBookUncontrol
        isOpenBookUpdate={isOpenBookUpdate}
        setIsOpenBookUpdate={setIsOpenBookUpdate}
        bookDataUpdate={bookDataUpdate}
        setBookDataUpdata={setBookDataUpdate}
        loadBooks={loadBooks}
      />
      <BookDetail
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        loadBooks={loadBooks}
      />
    </>
  );
};
export default BookTable;
