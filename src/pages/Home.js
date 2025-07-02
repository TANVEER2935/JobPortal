import React, { useState } from "react";
import { getjob, createjob, deletejob } from "../Api/jobapi";
import Button from "../components/Button";
import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query';

const Home = () => {
  const [step, setStep] = useState(1);
  

  // Step 1 fields
  const [jobtitle, setJobTitle] = useState("");
  const [companyname, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [remoteType, setRemoteType] = useState("");

  // Step 2 fields
  const [experienceMin, setExperienceMin] = useState("");
  const [experienceMax, setExperienceMax] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [totalEmployee, setTotalEmployee] = useState("");
  const [applyType, setApplyType] = useState("quick");

  
   const { data, isLoading, isError, error } = useQuery({
    queryKey: ['job'], // Unique key
    queryFn: getjob,
  });


  const queryClient = useQueryClient();
const createMutation = useMutation({
  mutationFn: createjob,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['job'] });
  },
});

const deleteMutation = useMutation({
  mutationFn: deletejob,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['job'] });
  },
});


  const handleSubmit = async () => {
    createMutation.mutate({
      jobtitle,
      companyname,
      industry,
      location,
      remoteType,
      experienceMin,
      experienceMax,
      salaryMin,
      salaryMax,
      totalEmployee,
      applyType,
    });

    // Reset form
    setJobTitle("");
    setCompanyName("");
    setIndustry("");
    setLocation("");
    setRemoteType("");
    setExperienceMin("");
    setExperienceMax("");
    setSalaryMin("");
    setSalaryMax("");
    setTotalEmployee("");
    setApplyType("quick");
    setStep(1);
  };

  
  const handleDelete = async (id) => {
   deleteMutation.mutate(id);
  };
    if (isLoading) {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
      <span className="ml-2 text-blue-500 font-medium">Loading...</span>
    </div>
  );
}
  if (isError) return <p>Error: {error.message}</p>;
 
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 py-8">
      {/* Form Box */}
      <div className="bg-white w-[577px] p-[32px] rounded-[10px] shadow-md">
        <div className="flex justify-between items-center mb-[24px]">
          <h1 className="text-[20px] font-semibold text-[#212121]">Create a job</h1>
          <span className="text-[14px] font-medium text-[#7A7A7A]">Step {step}</span>
        </div>

        {step === 1 ? (
          <>
            {/* Job Title */}
            <div className="mb-[24px]">
              <label className="block text-sm font-medium mb-[4px]">
                Job title<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="ex. UX UI Designer"
                value={jobtitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full h-[40px] px-3 border border-[#E6E6E6] rounded text-sm placeholder-[#A1A1A1]"
              />
            </div>

            {/* Company Name */}
            <div className="mb-[24px]">
              <label className="block text-sm font-medium mb-[4px]">
                Company name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="ex. Google"
                value={companyname}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full h-[40px] px-3 border border-[#E6E6E6] rounded text-sm"
              />
            </div>

            {/* Industry */}
            <div className="mb-[24px]">
              <label className="block text-sm font-medium mb-[4px]">
                Industry<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="ex. Information Technology"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full h-[40px] px-3 border border-[#E6E6E6] rounded text-sm"
              />
            </div>

            {/* Location + Remote */}
            <div className="grid grid-cols-2 gap-[24px] mb-[32px]">
              <div>
                <label className="block text-sm font-medium mb-[4px]">Location</label>
                <input
                  type="text"
                  placeholder="ex. Chennai"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-[40px] px-3 border border-[#E6E6E6] rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-[4px]">Remote type</label>
                <input
                  type="text"
                  placeholder="ex. In-office"
                  value={remoteType}
                  onChange={(e) => setRemoteType(e.target.value)}
                  className="w-full h-[40px] px-3 border border-[#E6E6E6] rounded text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                label="Next"
                onClick={() => setStep(2)}
                className="bg-[#1597E4] hover:bg-[#1386cc] text-white h-[40px] w-[75px] rounded"
              />
            </div>
          </>
        ) : (
          <>
            {/* Experience */}
            <div className="mb-[24px]">
              <label className="block text-sm font-medium mb-[8px]">Experience</label>
              <div className="grid grid-cols-2 gap-[24px]">
                <input
                  type="text"
                  placeholder="Minimum"
                  value={experienceMin}
                  onChange={(e) => setExperienceMin(e.target.value)}
                  className="h-[40px] px-3 border border-[#E6E6E6] rounded text-sm"
                />
                <input
                  type="text"
                  placeholder="Maximum"
                  value={experienceMax}
                  onChange={(e) => setExperienceMax(e.target.value)}
                  className="h-[40px] px-3 border border-[#E6E6E6] rounded text-sm"
                />
              </div>
            </div>

            {/* Salary */}
            <div className="mb-[24px]">
              <label className="block text-sm font-medium mb-[8px]">Salary</label>
              <div className="grid grid-cols-2 gap-[24px]">
                <input
                  type="text"
                  placeholder="Minimum"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  className="h-[40px] px-3 border border-[#E6E6E6] rounded text-sm"
                />
                <input
                  type="text"
                  placeholder="Maximum"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  className="h-[40px] px-3 border border-[#E6E6E6] rounded text-sm"
                />
              </div>
            </div>

            {/* Total Employee */}
            <div className="mb-[24px]">
              <label className="block text-sm font-medium mb-[8px]">Total employee</label>
              <input
                type="text"
                placeholder="ex. 100"
                value={totalEmployee}
                onChange={(e) => setTotalEmployee(e.target.value)}
                className="w-full h-[40px] px-3 border border-[#E6E6E6] rounded text-sm"
              />
            </div>

            {/* Apply Type */}
            <div className="mb-[32px]">
              <label className="block text-sm font-medium mb-[8px]">Apply type</label>
              <div className="flex gap-[16px] text-sm">
                <label className="flex items-center gap-[4px]">
                  <input
                    type="radio"
                    name="applyType"
                    value="quick"
                    checked={applyType === "quick"}
                    onChange={() => setApplyType("quick")}
                    className="accent-blue-500"
                  />
                  Quick apply
                </label>
                <label className="flex items-center gap-[4px]">
                  <input
                    type="radio"
                    name="applyType"
                    value="external"
                    checked={applyType === "external"}
                    onChange={() => setApplyType("external")}
                    className="accent-blue-500"
                  />
                  External apply
                </label>
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                label="Back"
                onClick={() => setStep(1)}
                className="text-blue-600 border border-blue-600 hover:bg-blue-50 h-[40px] w-[75px] rounded"
              />
              <Button
                label="Save"
                onClick={handleSubmit}
                className="bg-[#1597E4] hover:bg-[#1386cc] text-white h-[40px] w-[75px] rounded"
              />
            </div>
          </>
        )}
      </div>

      {/* Job Cards Section */}
      <div className="w-full max-w-3xl mt-10 space-y-6">
        {Array.isArray(data) && data.length === 0  ? (
          <p className="text-center text-gray-500">No Jobs Found</p>
        ) : (
          data?.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow p-6 flex flex-col gap-2 border border-gray-200"
            >
              {/* Header */}
              <div className="flex gap-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png"
                  alt="logo"
                  className="w-12 h-12 rounded object-contain"
                />
                <div>
                  <h2 className="text-lg font-semibold">{job.jobtitle}</h2>
                  <p className="text-gray-700 text-sm">
                    {job.companyname} - {job.industry}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {job.location}, India ({job.remoteType})
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="text-sm text-gray-700 pl-16">
                <p>Part-Time (9.00 am – 5.00 pm IST)</p>
                <p>Experience ({job.experienceMin} – {job.experienceMax} years)</p>
                <p>INR (₹) {job.salaryMin} – {job.salaryMax} / Month</p>
                <p>{job.totalEmployee} employees</p>
              </div>

              {/* Action Buttons */}
              <div className="pl-16 pt-2 flex gap-4">
                <button className="bg-[#1597E4] text-white px-4 py-2 rounded hover:bg-[#1386cc]">
                  Apply Now
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(job.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
