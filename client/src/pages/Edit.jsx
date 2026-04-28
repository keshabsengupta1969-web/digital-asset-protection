import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/assets/${id}`)
      .then(res => setForm(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/assets/${id}`, form);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Edit Asset
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option>Authorized</option>
            <option>Unauthorized</option>
          </select>

          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg">
            Update Asset
          </button>
        </form>
      </div>
    </div>
  );
}

export default Edit;