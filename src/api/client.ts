import type { Job } from "../types/job.interface";
import type { Candidate } from "../types/candidate.interface";
import type { Application } from "../types/application.interface";

const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

export async function getJobs(): Promise<Job[]> {
    const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
    if (!response.ok) {
        throw new Error("Failed to fetch jobs");
    }
    const data: Job[] = await response.json();
    return data;
}


export async function getCandidateByEmail(email: string): Promise<Candidate> {
    const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${email}`);
    if (!response.ok) {
        throw new Error("Failed to fetch candidates");
    }
    const data: Candidate = await response.json();
    return data;
}

export async function applyToJob(payload: Application): Promise<{ ok: boolean }> {
  const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to apply: ${response.status} - ${errorText}`);
  }

  return response.json();
}