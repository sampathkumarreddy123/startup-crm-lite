import { useState } from "react";

/**
 * Lead Form Component
 */

function LeadForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      company: "",
      email: "",
      phone: "",
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {["name", "company", "email", "phone"].map((field) => (
        <div key={field}>
          <label className="block mb-1 capitalize">{field}</label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
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
          className="w-full border p-3 rounded-lg"
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
          className="w-full border p-3 rounded-lg"
        >
          <option>Website</option>
          <option>Referral</option>
          <option>LinkedIn</option>
          <option>Cold Call</option>
          <option>Email Campaign</option>
          <option>Other</option>
        </select>
      </div>

      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Save
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default LeadForm;