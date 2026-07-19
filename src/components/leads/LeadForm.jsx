import { useState } from "react";

/**
 * Lead Form Component
 */

function LeadForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(
    initialData
      ? { ...initialData, value: initialData.value ?? "" }
      : {
          name: "",
          company: "",
          email: "",
          phone: "",
          value: "",
          status: "New",
          source: "Website"
        }
  );

  const [errors, setErrors] = useState({});

  const handleChange = function (e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.company) newErrors.company = "Company is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.value !== undefined && formData.value !== "" && isNaN(formData.value)) {
      newErrors.value = "Value must be a number";
    } else if (formData.value !== undefined && formData.value !== "" && Number(formData.value) < 0) {
      newErrors.value = "Value cannot be negative";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      ...formData,
      value: formData.value === "" ? 0 : Number(formData.value)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {["name", "company", "email", "phone", "value"].map((field) => (
        <div key={field}>
          <label className="block mb-1 capitalize">
            {field === "value" ? "Value ($)" : field}
          </label>
          <input
            type={field === "value" ? "number" : "text"}
            name={field}
            value={formData[field] ?? ""}
            onChange={handleChange}
            min={field === "value" ? "0" : undefined}
            step={field === "value" ? "any" : undefined}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
          />
          {errors[field] && (
            <p className="text-red-500 text-sm">{errors[field]}</p>
          )}
        </div>
      ))}

      <div>
        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
        >
          <option>New</option>
          <option>Contacted</option>
          <option>Meeting Scheduled</option>
          <option>Proposal Sent</option>
          <option>Won</option>
          <option>Lost</option>
        </select>
      </div>

      <div>
        <label>Source</label>
        <select
          name="source"
          value={formData.source}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
        >
          <option>Website</option>
          <option>Referral</option>
          <option>LinkedIn</option>
          <option>Cold Call</option>
          <option>Email Campaign</option>
          <option>Other</option>
        </select>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
        <button
          type="button"
          onClick={onCancel}
          className="min-h-[44px] rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        >
          Cancel
        </button>

        <button className="min-h-[44px] rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
          Save
        </button>
      </div>
    </form>
  );
}

export default LeadForm;