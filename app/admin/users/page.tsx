'use client';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectAuth, useSelector } from '@/lib/redux';
import { loadAllUser } from '@/lib/redux/slices/authSlice/thunks';

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector(selectAuth);

  useEffect(() => {
    dispatch(loadAllUser()).unwrap();
    // .then((data) => console.log('Response from thunk ', data));
  }, []);
  return (
    <div>
      <div className="px-3 mt-3">
        <table className="table w-full px-2 text-left border-separate border-spacing-y-5">
          <thead className=" bg-slate-200 border-spacing-y-40">
            <tr>
              <th>Name</th>
              <th>email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr className="buser-b hover:bg-slate-200 py-2 " key={user._id}>
                  <td className="text-primary">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
