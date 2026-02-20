import { useEffect, useState } from "react";
import { getJobs, getCandidateByEmail } from "./api/client";
import type { Job } from "./types/job.interface";
import type { Candidate } from "./types/candidate.interface";

function App() {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  // Traer jobs
  useEffect(() => {
    getJobs()
      .then((data) => {
        console.log("Jobs:", data);
        setJobs(data);
      })
      .catch((error) => {
        console.error("Error jobs:", error);
      });
  }, []);

  // Traer candidato
  useEffect(() => {
    getCandidateByEmail("vaglimatias@gmail.com")
      .then((data) => {
        console.log("Candidate:", data);
        setCandidate(data);
      })
      .catch((error) => {
        console.error("Error candidate:", error);
      });
  }, []);

  return (
    <div>
      <h1>Candidate Application</h1>

      <h2>Candidate</h2>
      {candidate && <pre>{JSON.stringify(candidate, null, 2)}</pre>}

      <h2>Jobs</h2>
      {jobs && <pre>{JSON.stringify(jobs, null, 2)}</pre>}
    </div>
  );
}

export default App;