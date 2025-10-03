import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleAddTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const handleToggle = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const handleEditSave = () => {
    if (editText.trim() === "") return;
    const updatedTasks = [...tasks];
    updatedTasks[editIndex].text = editText;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditText("");
  };

  const handleEditCancel = () => {
    setEditIndex(null);
    setEditText("");
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTask(speechResult);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 p-6">
      <motion.div
        className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-lg p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          📝 Voice-Enabled To-Do App
        </h1>

        <div className="flex mb-6 gap-3">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What's on your mind?"
            className="flex-grow px-4 py-2 rounded-xl border-2 border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          {/* 🎤 Voice Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleVoiceInput}
            className={`bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-xl transition ${
              isListening ? "animate-pulse" : ""
            }`}
            title="Speak your task"
          >
            🎤
          </motion.button>

          {/* Add Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleAddTask}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-xl shadow-sm transition"
          >
            Add
          </motion.button>
        </div>

        {/* Tasks List */}
        <ul className="space-y-3 max-h-72 overflow-y-auto pr-1">
          <AnimatePresence>
            {tasks.map((t, index) => (
              <motion.li
                key={index}
                className="flex justify-between items-center bg-white shadow-md px-4 py-3 rounded-xl"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
              >
                {editIndex === index ? (
                  <div className="flex w-full items-center gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-grow border px-2 py-1 rounded-xl focus:outline-none"
                    />
                    <button
                      onClick={handleEditSave}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      ✅
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="text-gray-600 hover:text-gray-800 text-sm"
                    >
                      ❌
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between w-full items-center">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={t.completed}
                        onChange={() => handleToggle(index)}
                        className="accent-purple-600"
                      />
                      <span
                        className={`${
                          t.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {t.text}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {tasks.length > 0 && (
          <motion.button
            onClick={handleClearAll}
            whileTap={{ scale: 0.95 }}
            className="mt-6 w-full text-sm text-red-600 hover:underline"
          >
            Clear All Tasks
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
