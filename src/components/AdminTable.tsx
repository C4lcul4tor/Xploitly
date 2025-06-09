// src/components/AdminTable.tsx
import React from 'react';

interface Props {
  data: any[];
}

const AdminTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-cyan-900 text-white">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Surname</th>
            <th className="p-2 border">Birthdate</th>
            <th className="p-2 border">Personal Number</th>
            <th className="p-2 border">Mobile</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Course</th>
            <th className="p-2 border">Registered At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, idx) => (
            <tr key={entry.id} className="border-b hover:bg-cyan-900/10">
              <td className="p-2 border">{idx + 1}</td>
              <td className="p-2 border">{entry.name}</td>
              <td className="p-2 border">{entry.surname}</td>
              <td className="p-2 border">{entry.birthdate}</td>
              <td className="p-2 border">{entry.personalNumber}</td>
              <td className="p-2 border">{entry.mobile}</td>
              <td className="p-2 border">{entry.email}</td>
              <td className="p-2 border">{entry.course}</td>
              <td className="p-2 border">{entry.registered_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
