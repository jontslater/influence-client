import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleJob } from '../../../api/job';
import JobForm from '../../../components/JobForm';

export default function EditBook() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleJob(id).then(setEditItem);
  }, [id]);

  return (<JobForm obj={editItem} />);
}
