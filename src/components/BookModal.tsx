import { Book } from "@prisma/client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { trpc } from "../utils/trpc";

interface ItemModalProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setBooks: Dispatch<SetStateAction<Book[]>>;
}

const BookModal: FC<ItemModalProps> = ({ setOpenModal, setBooks }) => {
  const [input, setInput] = useState({
    name: "",
    author: "",
    quantity: 0,
    maxBorrowDuration: 0,
  });

  const { mutate: addBook } = trpc.useMutation(["book.addBook"], {
    onSuccess(books) {
      setBooks((prev) => [...prev, books]);
    },
  });

  const onChange = (name: string, value: string | number) => {
    setInput({ ...input, [name]: value });
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/75">
      <div className="space-y-4 bg-white p-3">
        <h3 className="text-xl font-semibold">Name</h3>
        <input
          type="text"
          value={input.name}
          name="name"
          onChange={({ target: { name, value } }) => onChange(name, value)}
          className="w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
        />
        <h3 className="text-xl font-semibold">Author</h3>
        <input
          type="text"
          value={input.author}
          name="author"
          onChange={({ target: { name, value } }) => onChange(name, value)}
          className="w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
        />
        <h3 className="text-xl font-semibold">Quantity</h3>
        <input
          type="text"
          value={input.quantity}
          name="quantity"
          onChange={({ target: { name, value } }) => onChange(name, +value)}
          className="w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
        />
        <h3 className="text-xl font-semibold">Max Borrow Duration</h3>
        <input
          type="text"
          value={input.maxBorrowDuration}
          name="maxBorrowDuration"
          onChange={({ target: { name, value } }) => onChange(name, +value)}
          className="w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
        />
        <div className="grid grid-cols-2 gap-8">
          <button
            type="button"
            onClick={() => setOpenModal(false)}
            className="rounded-md bg-gray-500 p-1 text-xs text-white transition hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              addBook(input);
              setOpenModal(false);
            }}
            className="rounded-md bg-violet-500 p-1 text-xs text-white transition hover:bg-violet-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
