import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Import the ArrowLeft icon

export default function Apply() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sponsor: "",
    experience: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Application submitted successfully!");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage("Error submitting application.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-lg p-4 relative z-10">
        {/* Back to home link */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </button>

        <h1 className="text-3xl font-bold text-white">Submit Application</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-slate-800 p-6 rounded-lg mt-6">
          <div className="mb-4">
            <label className="block text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-slate-700 text-white border border-gray-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-slate-700 text-white border border-gray-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-slate-700 text-white border border-gray-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300">Sponsor Company</label>
            <input
              type="text"
              name="sponsor"
              value={formData.sponsor}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-slate-700 text-white border border-gray-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300">Driving Experience (Years)</label>
            <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                min="0"
                step="1"
                inputMode="numeric"
                className="w-full p-2 rounded bg-slate-700 text-white border border-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>

          {message && <p className="mt-4 text-white">{message}</p>}
        </form>
      </div>

      {/* Security features notice */}
      <div className="mt-8 max-w-md text-center text-sm text-gray-500">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center">
            <span>Encrypted Connection</span>
          </div>
          <div className="flex items-center">
            <span>Fraud Protection</span>
          </div>
        </div>
      </div>
    </main>
  );
}
