import { useState } from "react";

export default function AllowedStudentsUploadForm() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!file) return setMsg("Please select a CSV file.");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/allowed-students/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setMsg(`Upload successful! Inserted: ${data.inserted}/${data.total}`);
      } else {
        setMsg(data.error || "Upload failed.");
      }
    } catch {
      setMsg("Network error.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow max-w-md mx-auto flex flex-col gap-3 bg-white">
      <label className="font-semibold">
        Upload allowed_students.csv:
        <input type="file" accept=".csv" onChange={e => setFile(e.target.files[0])} required />
      </label>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Upload</button>
      {msg && <div className="mt-2 text-blue-600">{msg}</div>}
    </form>
  );
}