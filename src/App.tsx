import { useEffect, useState } from "react";
import { getJobs, getCandidateByEmail } from "./api/client";
import type { Job } from "./types/job.interface";
import type { Candidate } from "./types/candidate.interface";
import { JobItem } from "./components/JobItem";

function App() {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("vaglimatias@gmail.com");

 
  useEffect(() => {
    Promise.all([
      getJobs(),
      getCandidateByEmail(email)
    ])
      .then(([jobsData, candidateData]) => {
        setJobs(jobsData);
        setCandidate(candidateData);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setError("Failed to load data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Candidate Application</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>

      {candidate && (
        <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#f5f5f5" }}>
          <h3>Candidate: {candidate.firstName} {candidate.lastName}</h3>
          <p>ID: {candidate.candidateId}</p>
        </div>
      )}

      <h2>Available Positions</h2>
      {jobs && candidate ? (
        jobs.map((job) => (
          <JobItem
            key={job.id}
            job={job}
            candidate={candidate}
          />
        ))
      ) : (
        <p>No positions available</p>
      )}
    </div>
  );
}

export default App;