import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Container, Table, Alert, Button,
} from 'react-bootstrap';
import Link from 'next/link';
import { getApplicationsByJobId } from '../../api/applications';

const Applications = () => {
  const router = useRouter();
  const { id } = router.query;
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    getApplicationsByJobId(id)
      .then((data) => setApplications(data))
      .catch((err) => setError(err.message));
    console.log(id);
  }, [id]);

  return (
    <Container>
      <h1 className="my-4">Applications</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {!error && applications.length === 0 && (
        <Alert variant="info">No applications found for this job.</Alert>
      )}
      {!error && applications.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Applicant Name</th>
              <th>Job Poster Name</th>
              <th>Applied On</th>
              <th>View Applicant</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={application.id}>
                <td>{index + 1}</td>
                <td>{application.applicant.userName}</td>
                <td>{application.poster.userName}</td>
                <td>{new Date(application.applied_on).toLocaleDateString()}</td>
                <Link href={`/user/${application.applicant.id}`} passHref>
                  <Button variant="info" className="action-button" aria-label={`View Applicant ${application.applicant.id}`}>
                    VIEW
                  </Button>
                </Link>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Applications;
