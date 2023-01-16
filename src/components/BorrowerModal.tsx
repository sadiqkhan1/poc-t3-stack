import { Borrower } from "@prisma/client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { trpc } from "../utils/trpc";

interface ItemModalProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setBorrower: Dispatch<SetStateAction<Borrower[]>>;
}

const BorrowerModal: FC<ItemModalProps> = ({ setOpenModal, setBorrower }) => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    contactNumber: "",
  });

  const { mutate: addBorrower } = trpc.useMutation(["borrower.addBorrower"], {
    onSuccess(borrower) {
      setBorrower((prev) => [...prev, borrower]);
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
        <h3 className="text-xl font-semibold">Email</h3>
        <input
          type="text"
          value={input.email}
          name="email"
          onChange={({ target: { name, value } }) => onChange(name, value)}
          className="w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
        />
        <h3 className="text-xl font-semibold">Contact Number</h3>
        <input
          type="text"
          value={input.contactNumber}
          name="contactNumber"
          onChange={({ target: { name, value } }) => onChange(name, value)}
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
              addBorrower(input);
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

export default BorrowerModal;
