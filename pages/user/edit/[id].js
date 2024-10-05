/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleUser } from '../../../api/users';
import UserForm from '../../../components/UserForm';

export default function EditBook() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleUser(id).then(setEditItem);
  }, [id]);

  // TODO: pass object to form
  return (<UserForm obj={editItem} />);
}
