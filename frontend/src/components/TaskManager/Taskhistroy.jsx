import React, { useEffect, useState } from 'react';
import newRequest from '../../utils';

function Taskhistory({ historyId, sethistoryId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!historyId) return;

    newRequest.post('http://localhost:8001/taskhistory', { historyId })
      .then((res) => {
        console.log(res)
        if (res.data) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching task history:", err);
      });
  }, [historyId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Task History</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No history available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Assigned By</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
               {data.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="px-4 py-2 border">{item.status}</td>
                  <td className="px-4 py-2 border">{item.assignedBy}</td>
                  <td className="px-4 py-2 border">
                    {new Date(item.date).toLocaleString()}
                  </td>
                </tr>
              ))} 
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Taskhistory;
