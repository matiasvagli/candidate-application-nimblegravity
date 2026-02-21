import { useState } from "react";
import type { Job } from "../types/job.interface";
import type { Candidate } from "../types/candidate.interface";
import { applyToJob } from "../api/client";

interface JobItemProps {
  job: Job;
  candidate: Candidate;
}

export function JobItem({ job, candidate }: JobItemProps) {
  const [repoUrl, setRepoUrl] = useState("");

 const [submitting, setSubmitting] = useState(false);
const [message, setMessage] = useState<string | null>(null);

async function handleSubmit() {
  if (!repoUrl.trim()) {
    setMessage("Repo URL is required");
    return;
  }

  if (!repoUrl.includes("github.com")) {
    setMessage("Please enter a valid GitHub repository URL");
    return;
  }

  // Validar que tengamos todos los datos necesarios
  if (!candidate.uuid || !candidate.candidateId || !candidate.applicationId || !job.id) {
    setMessage("Missing candidate or job data. Please refresh the page.");
    return;
  }

  try {
    setSubmitting(true);
    setMessage(null);

    await applyToJob({
      uuid: candidate.uuid,
      jobId: job.id,
      candidateId: candidate.candidateId,
      applicationId: candidate.applicationId,
      repoUrl,
    });

    setMessage("Application sent successfully!");
    setRepoUrl("");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to apply";
    setMessage(`Error: ${errorMessage}`);
  } finally {
    setSubmitting(false);
  }
}

  return (
    <div style={{ 
      border: "1px solid #ddd", 
      borderRadius: "8px",
      padding: "16px", 
      marginBottom: "16px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <h3 style={{ margin: "0 0 12px 0", color: "#333" }}>{job.title}</h3>

      <input
        type="text"
        placeholder="https://github.com/tu-usuario/tu-repo"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        style={{ 
          width: "100%", 
          marginBottom: "12px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "14px"
        }}
      />

      <button 
        onClick={handleSubmit} 
        disabled={submitting || !repoUrl.trim()}
        style={{
          backgroundColor: (submitting || !repoUrl.trim()) ? "#ccc" : "#007acc",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: (submitting || !repoUrl.trim()) ? "not-allowed" : "pointer",
          fontSize: "14px",
          fontWeight: "bold"
        }}
      >
        {submitting ? "Submitting..." : "Submit Application"}
      </button>

      {message && (
        <p style={{ 
          marginTop: "12px", 
          marginBottom: "0",
          color: message.includes("success") ? "#28a745" : "#dc3545",
          fontSize: "14px"
        }}>
          {message}
        </p>
      )}
    </div>
  );
}       