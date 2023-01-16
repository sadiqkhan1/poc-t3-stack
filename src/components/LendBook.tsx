import { Book } from "@prisma/client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { trpc } from "../utils/trpc";

interface ItemModalProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  borrowerId: string;
}

const LendBookModal: FC<ItemModalProps> = ({ setOpenModal, borrowerId }) => {
  const [availableBooks, setAvailableBooks] = useState<
    (Book & { checked: boolean })[]
  >([]);
  const [input, setInput] = useState({
    lendDays: "",
  });

  const { mutate: lendBook } = trpc.useMutation(["book.lendBook"]);
  const { mutate: updateBorrowQuantity } = trpc.useMutation([
    "book.updateBorrowQuantity",
  ]);

  trpc.useQuery(["book.getAllBooks"], {
    onSuccess(books) {
      setAvailableBooks(
        books
          .filter(
            ({ quantity, borrowedQuantity }: Book) =>
              quantity - borrowedQuantity > 0
          )
          .map((availableBook) => ({ ...availableBook, checked: false }))
      );
    },
  });

  const onChange = (name: string, value: string | number) => {
    setInput({ ...input, [name]: value });
  };

  const submit = () => {
    const { lendDays } = input;
    availableBooks
      .filter(({ checked }) => checked)
      .map(({ id: bookId, borrowedQuantity }) => {
        lendBook({
          borrowedFrom: new Date(),
          borrowedTill: new Date(
            new Date().setDate(new Date().getDate() + Number(lendDays))
          ),
          borrowerId,
          bookId,
        });
        updateBorrowQuantity({
          id: bookId,
          borrowedQuantity: borrowedQuantity + 1,
        });
      });
  };

  const changeSelected = (selectedId: string) => {
    const newAvailableBooks = availableBooks;
    const idx = availableBooks.findIndex(({ id }) => id === selectedId);
    newAvailableBooks.splice(idx, 1, {
      ...(availableBooks[idx] as Book & { checked: boolean }),
      checked: !availableBooks[idx]?.checked,
    });
    setAvailableBooks([...newAvailableBooks]);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/75">
      <div className="space-y-4 bg-white p-3">
        <h3 className="text-xl font-semibold">Lend Days</h3>
        <input
          type="text"
          value={input.lendDays}
          name="lendDays"
          onChange={({ target: { name, value } }) => onChange(name, value)}
          className="w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
        />
        <h3 className="text-xl font-semibold">Available Books</h3>
        <table>
          <tr>
            <th>Book Name</th>
            <th>Author</th>
            <th>Quantity</th>
            <th>Max Borrow Durartion</th>
            <th></th>
          </tr>
          {availableBooks.map(
            ({
              id,
              name,
              author,
              quantity,
              maxBorrowDuration,
              borrowedQuantity,
              checked,
            }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{author}</td>
                <td>{quantity - borrowedQuantity}</td>
                <td>{maxBorrowDuration}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => changeSelected(id)}
                  />
                </td>
              </tr>
            )
          )}
        </table>
        <div className="grid grid-cols-2 gap-8">
          <button
            type="button"
            onClick={() => setOpenModal(false)}
            className="rounded-md bg-gray-500 p-1 text-xs text-white transition hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            disabled={availableBooks.every(({ checked }) => !checked)}
            type="button"
            onClick={() => {
              submit();
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

export default LendBookModal;
