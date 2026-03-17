import { useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import { fetchAllBookAPI } from "../services/api.service";
import BookForm from "../components/book/create.book.control";
import CreateBookUncontrol from "../components/book/create.book.uncontrol";

const BookPage = () => {
  const [dataBook, setDataBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(1);
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const res = await fetchAllBookAPI(current, pageSize);
    if (res.data) {
      setDataBook(res.data.result.reverse());
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };
  return (
    <>
      <CreateBookUncontrol loadBooks={loadBooks} />
      <BookTable
        dataBook={dataBook}
        setDataBook={setDataBook}
        current={current}
        setCurrent={setCurrent}
        pageSize={pageSize}
        total={total}
        setTotal={setTotal}
        loadBooks={loadBooks}
      />
    </>
  );
};
export default BookPage;
