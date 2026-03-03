"use client";

import { motion } from "framer-motion";

export default function ConfirmModal({ onConfirm, onCancel }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl"
      >
        <p className="mb-4">Are you sure?</p>
        <div className="flex gap-3">
          <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded">
            Delete
          </button>
          <button onClick={onCancel} className="px-4 py-2 border rounded">
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}