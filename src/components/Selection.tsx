import Image from "next/image";
import Link from "next/link";

type ContentProps = {
  heading: string;
  content: string;
  route: string;
  srcs: string;
};

// const images = [
//   { src: "/books.png", alt: "Books image.." },
//   { src: "/students.png", alt: "Borrower image.." },
// ];

const Selection: React.FunctionComponent<ContentProps> = ({
  heading,
  content,
  route,
  srcs,
}) => (
  <Link href={route}>
    <div className="... mr-10 max-w-sm rounded shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
      <Image className="w-full" src={srcs} width={80} height={80} />
      <div className="px-4 py-6">
        <div className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-xl font-bold text-transparent group-hover:stroke-white">
          {heading}
        </div>
        <p className="text-base text-gray-700 group-hover:stroke-white">
          {content}
        </p>
      </div>
    </div>
  </Link>
);

export default Selection;
