import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");

  const fetchAssets = async () => {
    const res = await axios.get("http://localhost:5000/assets");
    setAssets(res.data);
  };

  const deleteAsset = async (id) => {
    await axios.delete(`http://localhost:5000/assets/${id}`);
    fetchAssets();
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // 📊 Stats
  const total = assets.length;
  const authorized = assets.filter(a => a.status === "Authorized").length;
  const unauthorized = assets.filter(a => a.status === "Unauthorized").length;

  // 🔍 Search Filter
  const filteredAssets = assets.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">
            Digital Asset Dashboard
          </h1>

          <Link
            to="/create"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            + Add Asset
          </Link>
        </div>

        {/* 📊 Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <div className="bg-white p-5 rounded-xl shadow-md hover:scale-105 transition">
            <h2 className="text-gray-500 text-sm">Total Assets</h2>
            <p className="text-2xl font-bold text-gray-800">{total}</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md hover:scale-105 transition">
            <h2 className="text-gray-500 text-sm">Authorized</h2>
            <p className="text-2xl font-bold text-green-600">{authorized}</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md hover:scale-105 transition">
            <h2 className="text-gray-500 text-sm">Unauthorized</h2>
            <p className="text-2xl font-bold text-red-600">{unauthorized}</p>
          </div>

        </div>

        {/* 🔍 Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
        </div>

        {/* 📦 Asset Cards */}
        <div className="grid gap-4">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <div className="flex justify-between items-center">

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {asset.title}
                  </h2>
                  <p className="text-gray-500">{asset.description}</p>
                </div>

                {/* Status Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${asset.status === "Authorized"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                    }`}
                >
                  {asset.status}
                </span>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-4">
                <Link
                  to={`/edit/${asset.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteAsset(asset.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAssets.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No assets found 🚫
          </p>
        )}

      </div>
    </div>
  );
}

export default Home;