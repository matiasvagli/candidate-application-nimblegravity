import type { Job } from "../types/job.interface";
import type { Candidate } from "../types/candidate.interface";

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