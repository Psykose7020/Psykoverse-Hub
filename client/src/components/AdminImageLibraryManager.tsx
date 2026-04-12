import { useEffect, useMemo, useState } from "react";
import { Image as ImageIcon, Plus, Save, Trash2, X, Edit2, ExternalLink, Search } from "lucide-react";

interface ImageLibraryItem {
  id: string;
  title: string;
  imageUrl: string;
  thumbnailUrl: string | null;
  altText: string | null;
  category: string;
  tags: string | null;
  sourceUrl: string | null;
  credit: string | null;
  isActive: number;
  sortOrder: number;
}

const DEFAULT_FORM = {
  title: "",
  imageUrl: "",
  thumbnailUrl: "",
  altText: "",
  category: "general",
  tags: "",
  sourceUrl: "",
  credit: "",
  isActive: true,
  sortOrder: 0,
};

export function AdminImageLibraryManager() {
  const [items, setItems] = useState<ImageLibraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ImageLibraryItem | null>(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState(DEFAULT_FORM);

  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return items;

    return items.filter((item) =>
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      (item.tags || "").toLowerCase().includes(query) ||
      (item.credit || "").toLowerCase().includes(query),
    );
  }, [items, search]);

  async function fetchItems() {
    try {
      const res = await fetch("/api/admin/images", { credentials: "include" });
      if (res.ok) {
        setItems(await res.json());
      }
    } catch (err) {
      console.error("Failed to fetch image library:", err);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData(DEFAULT_FORM);
    setEditingItem(null);
    setShowForm(false);
  }

  function startEdit(item: ImageLibraryItem) {
    setEditingItem(item);
    setFormData({
      title: item.title,
      imageUrl: item.imageUrl,
      thumbnailUrl: item.thumbnailUrl || "",
      altText: item.altText || "",
      category: item.category,
      tags: item.tags || "",
      sourceUrl: item.sourceUrl || "",
      credit: item.credit || "",
      isActive: item.isActive === 1,
      sortOrder: item.sortOrder,
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const url = editingItem ? `/api/admin/images/${editingItem.id}` : "/api/admin/images";
      const method = editingItem ? "PUT" : "POST";
      const payload = {
        ...formData,
        thumbnailUrl: formData.thumbnailUrl || null,
        altText: formData.altText || null,
        tags: formData.tags || null,
        sourceUrl: formData.sourceUrl || null,
        credit: formData.credit || null,
        isActive: formData.isActive ? 1 : 0,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchItems();
        resetForm();
      }
    } catch (err) {
      console.error("Failed to save image library item:", err);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette image de la bibliothèque ?")) return;

    try {
      const res = await fetch(`/api/admin/images/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete image library item:", err);
    }
  }

  if (loading) {
    return <div className="text-gray-400 text-center py-8">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Bibliothèque d’images ({items.length})</h3>
          <p className="text-sm text-gray-500">Centralisez les visuels réutilisables du site</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#0B0E14] border border-[#2E384D] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-primary transition-all"
              placeholder="Rechercher une image"
            />
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-sky-500/20"
            >
              <Plus className="w-5 h-5" />
              Ajouter une image
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <div className="bg-gradient-to-br from-[#1C2230] to-[#151a24] border border-[#2E384D] rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-sky-600/20 to-cyan-600/20 border-b border-[#2E384D] px-6 py-4 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-white text-lg">
                {editingItem ? "Modifier l’image" : "Ajouter une image"}
              </h4>
              <p className="text-sm text-gray-400">URL externe ou chemin interne du site</p>
            </div>
            <button onClick={resetForm} className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Titre *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-primary transition-all"
                  placeholder="Ex: Hero background OGame"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">URL image *</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-primary transition-all"
                  placeholder="https://... ou /attached_assets/..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">URL miniature</label>
                <input
                  type="text"
                  value={formData.thumbnailUrl}
                  onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                  className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-primary transition-all"
                  placeholder="Optionnel"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Catégorie</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-primary transition-all"
                    placeholder="general"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ordre</label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value, 10) || 0 })}
                    className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Texte alternatif</label>
                <input
                  type="text"
                  value={formData.altText}
                  onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
                  className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-primary transition-all"
                  placeholder="Description accessible"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-primary transition-all"
                  placeholder="ogame, flotte, héros"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Source</label>
                  <input
                    type="url"
                    value={formData.sourceUrl}
                    onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                    className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-primary transition-all"
                    placeholder="https://source..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Crédit</label>
                  <input
                    type="text"
                    value={formData.credit}
                    onChange={(e) => setFormData({ ...formData, credit: e.target.value })}
                    className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-primary transition-all"
                    placeholder="Auteur / source"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 rounded bg-[#0B0E14] border-[#2E384D] text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                  Image active dans l’API publique
                </span>
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg"
                >
                  <Save className="w-5 h-5" />
                  {editingItem ? "Mettre à jour" : "Enregistrer"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-[#2E384D] hover:bg-[#3E4A5D] text-white rounded-xl font-medium transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>

            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-400">Prévisualisation</h5>
              <div className="bg-[#0B0E14] border border-[#2E384D] rounded-2xl overflow-hidden">
                <div className="aspect-[16/9] bg-[#111827] flex items-center justify-center overflow-hidden">
                  {formData.imageUrl ? (
                    <img
                      src={formData.thumbnailUrl || formData.imageUrl}
                      alt={formData.altText || formData.title || "Prévisualisation"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-12 h-12 text-gray-600" />
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <h6 className="text-white font-semibold truncate">{formData.title || "Titre de l’image"}</h6>
                    <span className={`text-xs px-2 py-1 rounded-full ${formData.isActive ? "bg-emerald-500/20 text-emerald-300" : "bg-gray-500/20 text-gray-300"}`}>
                      {formData.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{formData.category || "general"}</p>
                  {formData.credit && <p className="text-xs text-gray-500">Crédit: {formData.credit}</p>}
                  {formData.tags && <p className="text-xs text-cyan-300">{formData.tags}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showForm && filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-[#1C2230] border border-dashed border-[#2E384D] rounded-2xl">
          <div className="w-20 h-20 bg-gradient-to-br from-sky-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-10 h-10 text-sky-400" />
          </div>
          <h4 className="text-lg font-bold text-white mb-2">Aucune image enregistrée</h4>
          <p className="text-gray-500 mb-6">Ajoutez une première image pour centraliser vos visuels</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-medium transition-all"
          >
            <Plus className="w-5 h-5" />
            Ajouter la première image
          </button>
        </div>
      ) : !showForm && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-[#1C2230] border border-[#2E384D] rounded-2xl overflow-hidden group">
              <div className="aspect-[16/9] bg-[#0B0E14] overflow-hidden">
                <img
                  src={item.thumbnailUrl || item.imageUrl}
                  alt={item.altText || item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="text-white font-semibold truncate">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${item.isActive === 1 ? "bg-emerald-500/20 text-emerald-300" : "bg-gray-500/20 text-gray-300"}`}>
                    {item.isActive === 1 ? "Active" : "Inactive"}
                  </span>
                </div>

                {item.tags && <p className="text-xs text-cyan-300">{item.tags}</p>}
                {item.credit && <p className="text-xs text-gray-500">Crédit: {item.credit}</p>}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    {item.sourceUrl && (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        title="Ouvrir la source"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => startEdit(item)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
