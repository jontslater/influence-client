import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getSingleJob } from '../../../api/job';
import { useAuth } from '../../../utils/context/authContext'; // Using the auth context for the logged-in user
import ApplicationForm from '../../../components/ApplicationForm';

export default function ApplyJob() {
  const router = useRouter();
  const { id } = router.query; // Get the job ID from the URL
  const [job, setJob] = useState(null);
  const [user, setUser] = useState(null); // State to store user details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user: authUser } = useAuth(); // Get the logged-in user from the auth context

  useEffect(() => {
    if (!id || !authUser?.uid) return; // If there's no job ID or user is not logged in, don't fetch anything

    // Fetch the job details
    const fetchJob = async () => {
      try {
        setLoading(true);
        const jobData = await getSingleJob(id);
        setJob(jobData);
      } catch (err) {
        setError('Unable to fetch job details.');
      } finally {
        setLoading(false);
      }
    };

    // Set the user state once the authUser is available
    if (authUser && authUser.uid && !user) {
      setUser(authUser); // Set user state when authUser is available
    }

    fetchJob();
  }, [id, authUser?.uid]); // Trigger fetch whenever job ID or authUser UID changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!job || !user) return <p>Job or user data not found.</p>;

  return (
    <div>
      <h1>Apply for Job: {job.description}</h1>
      <ApplicationForm
        jobId={job.id}
        posterId={job.client_id}
        applicantId={user.id} // Pass the logged-in user's ID
        userName={user.displayName} // Assuming displayName is set in the user object
        userBio={user.bio || 'No bio available'} // Use a default bio if not available
      />
    </div>
  );
}
