import { useState } from "react";
import { ProjectModalProps } from "@/app/lib/definitions";


const ProjectModal: React.FC<ProjectModalProps> = ({ 
  onClose, 
  onSave, 
  initialProject = null }) => {
  const [formData, setFormData] = useState({
    id: initialProject?.id || "",
    name: initialProject?.name || "",
  })

  const handleSave = () => {
    if (!formData.name.trim()){
      alert("Please fill all fields.");
      return;
    }
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">{formData.id? 'Edit ': 'Add New '}Project</h2>

        {/* Project Name */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Project Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

       
        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
