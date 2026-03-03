"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { useToast } from "./ToastProvider";
import ConfirmModal from "./ConfirmModal";

type Item = {
  id: number;
  name: string;
};

export default function DataTable() {
  const { showToast } = useToast();

  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");

  const [editItem, setEditItem] = useState<Item | null>(null);
  const [editName, setEditName] = useState("");

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const perPage = 5;

  const loadData = async () => {
    const res = await fetch("/api/items");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🔎 Search
  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);

  const paginated = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  // ➕ Add
  const handleAdd = async () => {
    if (!newName) return;

    await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });

    setNewName("");
    setShowAddModal(false);
    showToast("Item added successfully 🚀");
    loadData();
  };

  // ✏️ Open Edit
  const openEdit = (item: Item) => {
    setEditItem(item);
    setEditName(item.name);
  };

  // ✏️ Update
  const handleUpdate = async () => {
    if (!editItem) return;

    await fetch(`/api/items/${editItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName }),
    });

    showToast("Item updated successfully ✏️");
    setEditItem(null);
    loadData();
  };

  // ❌ Delete
  const handleDelete = async () => {
    if (!deleteId) return;

    await fetch(`/api/items/${deleteId}`, {
      method: "DELETE",
    });

    showToast("Item deleted 🗑️");
    setDeleteId(null);
    loadData();
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">
          CRUD Items
        </h2>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
        >
          <Plus size={18} />
          Add Item
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search item..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="w-full mb-4 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:text-white"
      />

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-slate-700">
            <th className="text-left p-3 dark:text-white">ID</th>
            <th className="text-left p-3 dark:text-white">Name</th>
            <th className="text-left p-3 dark:text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((item) => (
            <tr
              key={item.id}
              className="border-t dark:border-slate-600"
            >
              <td className="p-3 dark:text-white">{item.id}</td>
              <td className="p-3 dark:text-white">{item.name}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => openEdit(item)}
                  className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
                >
                  <Pencil size={14} />
                  Edit
                </button>

                <button
                  onClick={() => setDeleteId(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {paginated.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center p-4 text-gray-500">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ADD MODAL */}
      {showAddModal && (
        <Modal
          title="Add New Item"
          value={newName}
          setValue={setNewName}
          onClose={() => setShowAddModal(false)}
          onSave={handleAdd}
        />
      )}

      {/* EDIT MODAL */}
      {editItem && (
        <Modal
          title="Edit Item"
          value={editName}
          setValue={setEditName}
          onClose={() => setEditItem(null)}
          onSave={handleUpdate}
        />
      )}

      {/* DELETE CONFIRM */}
      {deleteId && (
        <ConfirmModal
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

/* 🔹 Reusable Modal Component */
function Modal({
  title,
  value,
  setValue,
  onClose,
  onSave,
}: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl w-96">
        <h3 className="text-lg font-bold mb-4 dark:text-white">
          {title}
        </h3>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg mb-4 dark:bg-slate-700 dark:text-white"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}