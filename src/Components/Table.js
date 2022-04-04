import React from "react";
import Button from "./Button";

function Table({ headings, data, hasAction, actionCb }) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center">
              <thead className="border-b bg-primary">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-white px-6 py-4"
                  >
                    #
                  </th>
                  {headings.map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      {heading}
                    </th>
                  ))}
                  {hasAction && (
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map((datum, i) => (
                  <tr className="bg-white border-b" key={JSON.stringify(datum)}>
                    {Object.values(datum).map((val) => (
                      <td
                        key={val}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {val}
                      </td>
                    ))}
                    {hasAction && (
                      <td>
                        <Button onClick={() => actionCb(datum)}>Delete</Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
