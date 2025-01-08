import React from "react";
import Select from "react-select";

interface FiltersProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onSourceChange: (source: string) => void;
  onToDateChange: (date: Date | string) => void;
  onFromDateChange: (date: Date | string) => void;
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "business", label: "Business" },
  { value: "technology", label: "Technology" },
  { value: "science", label: "Science" },
  { value: "health", label: "Health" },
];

const sources = [
  { value: "all", label: "All Sources" },
  { value: "bbc-news", label: "BBC News" },
  { value: "cnn", label: "CNN" },
  { value: "reuters", label: "Reuters" },
];

const Filters: React.FC<FiltersProps> = ({
  onSearch,
  onCategoryChange,
  onSourceChange,
  onToDateChange,
  onFromDateChange,
}) => {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [dateError, setDateError] = React.useState("");

  const today = new Date().toISOString().split("T")[0];

  const validateDates = (start: string, end: string) => {
    if (start && end && new Date(start) > new Date(end)) {
      setDateError("Start date cannot be greater than end date");
      return false;
    }
    setDateError("");
    return true;
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    if (validateDates(newStartDate, endDate)) {
      onFromDateChange(newStartDate);
    }
    console.log("Start date:", newStartDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    if (validateDates(startDate, newEndDate)) {
      onToDateChange(newEndDate);
    }
    console.log("End date:", newEndDate);
  };

  const resetDate = (inputId: string) => {
    const dateInput = document.getElementById(inputId) as HTMLInputElement;
    if (dateInput) {
      dateInput.value = "";
      if (inputId === "startDate") {
        setStartDate("");
        onFromDateChange("");
      } else {
        setEndDate("");
        onToDateChange("");
      }
      setDateError("");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
      <div className="relative flex-1">
        <label
          htmlFor="search"
          className="text-left font-bold block text-sm text-gray-500 mb-1"
        >
          Search
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search news..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      <div className="md:w-48">
        <label
          htmlFor="startDate"
          className="text-left font-bold block text-sm text-gray-500 mb-1"
        >
          Start Date
        </label>

        <div className="relative">
          <input
            id="startDate"
            type="date"
            max={today}
            onChange={handleStartDateChange}
            placeholder="Start Date"
            className={`w-full pl-3 pr-8 py-2 border ${
              dateError ? "border-red-500" : "border-neutral-200"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
          />

          {startDate && (
            <button
              onClick={() => resetDate("startDate")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white hover:bg-gray-100 rounded-full"
              title="Reset date"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        {dateError && (
          <div className="text-red-500 text-sm absolute mt-1 bg-white p-1 rounded-md shadow-md">
            {dateError}
          </div>
        )}
      </div>
      <div className="md:w-48">
        <label
          htmlFor="endDate"
          className="text-left font-bold block text-sm text-gray-500 mb-1"
        >
          End Date
        </label>

        <div className="relative">
          <input
            id="endDate"
            type="date"
            max={today}
            onChange={handleEndDateChange}
            placeholder="End Date"
            className={`w-full pl-3 pr-8 py-2 border ${
              dateError ? "border-red-500" : "border-neutral-200"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
          />

          {endDate && (
            <button
              onClick={() => resetDate("endDate")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white hover:bg-gray-100 rounded-full"
              title="Reset date"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="md:w-48">
        <label
          htmlFor="category"
          className="text-left font-bold block text-sm text-gray-500 mb-1"
        >
          Category
        </label>
        <Select
          inputId="category"
          options={categories}
          defaultValue={categories[0]}
          onChange={(option: { value: string; label: string } | null) =>
            onCategoryChange(option?.value || "all")
          }
          className="text-sm"
          classNamePrefix="select"
        />
      </div>
      <div className="md:w-48">
        <label
          htmlFor="source"
          className="text-left font-bold block text-sm text-gray-500 mb-1"
        >
          Source
        </label>
        <Select
          inputId="source"
          options={sources}
          defaultValue={sources[0]}
          onChange={(option: { value: string; label: string } | null) =>
            onSourceChange(option?.value || "all")
          }
          className="text-sm"
          classNamePrefix="select"
        />
      </div>
    </div>
  );
};
export default Filters;
