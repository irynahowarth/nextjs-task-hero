import { useState } from "react";
import { TaskModalProps } from "@/app/lib/definitions";


const TaskModal: React.FC<TaskModalProps> = ({ onClose, onSave, projectList, initialTask = null }) => {
  const [name, setName] = useState(initialTask?.name || "");
  const [dueDate, setDueDate] = useState(initialTask?.dueDate || "");
  const [repeatOption, setRepeatOption] = useState(initialTask?.repeatOption || "none");
  const [projectId, setProjectId] = useState(initialTask?.projectId || "");

  const handleSave = () => {
    if (!name || !dueDate || !projectId) {
      alert("Please fill all fields.");
      return;
    }
    onSave({ name, dueDate, projectId, repeatOption });
  };

  console.log(initialTask)
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>

        {/* Task Name */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Task Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Repeat Option */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Repeat</label>
          <select
            value={repeatOption}
            onChange={(e) => setRepeatOption(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        {/* Project Selector */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Assign to Project</label>
          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select a project</option>
            {projectList.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
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

export default TaskModal;
