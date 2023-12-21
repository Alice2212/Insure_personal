import React, { useState } from "react";
import DropDownMenu from "./DropDownMenu";

const Table = ({ data }) => {
  const { tableHead, tabledata } = data;

  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const pageSize = 5; // Items per page

  const handlePreviousClick = () => {
    if (currentPageIndex > 1) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleNextClick = () => {
    const lastPageIndex = Math.ceil(tabledata.length / pageSize);
    if (currentPageIndex < lastPageIndex) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const isLastPage =
    currentPageIndex === Math.ceil(tabledata.length / pageSize);
  const isFirstPage = currentPageIndex === 1;

  const currentPageData = tabledata.slice(
    (currentPageIndex - 1) * pageSize,
    currentPageIndex * pageSize
  );

  const renderedData = currentPageData.map((leads, index) => {
    return (
      <tr className="bg-white border-b hover:bg-gray-50" key={index}>
        <td className="w-4 p-4">{index+1}</td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {leads.data1}
        </th>
        <td className="px-6 py-4">{leads.data2}</td>
        <td className="px-6 py-4">{leads.data3}</td>
        <td className="px-6 py-4">{leads.data4}</td>
        <td className="px-6 py-4">{leads.data5}</td>
        <td className="px-6 py-4">
          {leads.data6 || <DropDownMenu
            data={{
              actionState: ["Approve", "Reject", "Transfer"],
              defaultdata: leads.data7,
            }}
            id={String(index + 1)}
          />}
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="p-4">
                {tableHead.head1}
              </th>
              <th scope="col" className="px-6 py-3">
                {tableHead.head2}
              </th>
              <th scope="col" className="px-6 py-3">
                {tableHead.head3}
              </th>
              <th scope="col" className="px-6 py-3">
                {tableHead.head4}
              </th>
              <th scope="col" className="px-6 py-3">
                {tableHead.head5}
              </th>
              <th scope="col" className="px-6 py-3">
                {tableHead.head6}
              </th>
              <th scope="col" className="px-6 py-3">
                {tableHead.head7}
              </th>
            </tr>
          </thead>
          <tbody>{renderedData}</tbody>
        </table>
        <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span className="font-semibold text-orange-500">
              {(currentPageIndex - 1) * pageSize + 1}
            </span>
            -
            {currentPageIndex * pageSize > tabledata.length
              ? tabledata.length
              : currentPageIndex * pageSize}{" "}
            of{" "}
            <span className="font-semibold text-orange-500">
              {tabledata.length}
            </span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a
                onClick={handlePreviousClick}
                disabled={isFirstPage}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Previous
              </a>
            </li>
            {Array.from({ length: Math.ceil(tabledata.length / pageSize) }).map(
              (_, index) => (
                <li key={index}>
                  <a
                    onClick={() => setCurrentPageIndex(index + 1)}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    {index + 1}
                  </a>
                </li>
              )
            )}
            <li>
              <a
                onClick={handleNextClick}
                disabled={isLastPage}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Table;
