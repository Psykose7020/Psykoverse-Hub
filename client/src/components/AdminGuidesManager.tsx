import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Save, X, ExternalLink, BookOpen } from "lucide-react";

interface CustomGuide {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string | null;
  externalLink: string | null;
  featured: number;
  sortOrder: number;
}

const CATEGORIES = [
  { id: "debutant", name: "Les Bases du Jeu" },
  { id: "expansion", name: "Expansion & Développement" },
  { id: "combat", name: "Combat & Stratégie" },
  { id: "defense", name: "Défense & Sécurité" },
  { id: "regles", name: "Règles du Jeu" },
  { id: "custom", name: "Guides Personnalisés" },
];

const ICONS = ["BookOpen", "Users", "Globe", "Rocket", "Shield", "Target", "Trophy", "Zap", "Star", "Clock"];
const COLORS = [
  "from-blue-500 to-cyan-600",
  "from-green-500 to-emerald-600",
  "from-purple-500 to-pink-600",
  "from-red-500 to-rose-600",
  "from-amber-500 to-orange-600",
  "from-teal-500 to-cyan-600",
  "from-indigo-500 to-purple-600",
];

export function AdminGuidesManager({ token }: { token: string }) {
  const [guides, setGuides] = useState<CustomGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGuide, setEditingGuide] = useState<CustomGuide | null>(null);
  const [formData, setFormData] = useState({
    categoryId: "custom",
    title: "",
    description: "",
    icon: "BookOpen",
    color: "from-blue-500 to-cyan-600",
    link: "",
    externalLink: "",
    featured: false,
    sortOrder: 0,
  });

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const res = await fetch("/api/guides");
      if (res.ok) {
        const data = await res.json();
        setGuides(data);
      }
    } catch (err) {
      console.error("Failed to fetch guides:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingGuide 
        ? `/api/admin/guides/${editingGuide.id}` 
        : "/api/admin/guides";
      const method = editingGuide ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchGuides();
        resetForm();
      }
    } catch (err) {
      console.error("Failed to save guide:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce guide ?")) return;

    try {
      const res = await fetch(`/api/admin/guides/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setGuides(guides.filter(g => g.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete guide:", err);
    }
  };

  const startEdit = (guide: CustomGuide) => {
    setEditingGuide(guide);
    setFormData({
      categoryId: guide.categoryId,
      title: guide.title,
      description: guide.description,
      icon: guide.icon,
      color: guide.color,
      link: guide.link || "",
      externalLink: guide.externalLink || "",
      featured: guide.featured === 1,
      sortOrder: guide.sortOrder,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingGuide(null);
    setFormData({
      categoryId: "custom",
      title: "",
      description: "",
      icon: "BookOpen",
      color: "from-blue-500 to-cyan-600",
      link: "",
      externalLink: "",
      featured: false,
      sortOrder: 0,
    });
  };

  if (loading) {
    return <div className="text-gray-400 text-center py-8">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Guides Personnalisés ({guides.length})</h3>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter un guide
        </button>
      </div>

      {showForm && (
        <div className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-white">
              {editingGuide ? "Modifier le guide" : "Nouveau guide"}
            </h4>
            <button onClick={resetForm} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Catégorie</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-2 text-white"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Titre *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-2 text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-2 text-white"
                rows={2}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Lien interne (ex: /guide/mon-guide)</label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-2 text-white"
                  placeholder="/guide/..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Lien externe (URL complète)</label>
                <input
                  type="url"
                  value={formData.externalLink}
                  onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
                  className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-2 text-white"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Icône</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-2 text-white"
                >
                  {ICONS.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Couleur</label>
                <select
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-2 text-white"
                >
                  {COLORS.map((color) => (
                    <option key={color} value={color}>{color.replace("from-", "").split(" ")[0]}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Ordre d'affichage</label>
                <input
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                  className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="featured" className="text-sm text-gray-400">Mettre en avant (featured)</label>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                {editingGuide ? "Mettre à jour" : "Créer"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {guides.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Aucun guide personnalisé</p>
          <p className="text-sm">Cliquez sur "Ajouter un guide" pour créer votre premier guide</p>
        </div>
      ) : (
        <div className="space-y-3">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="flex items-center justify-between bg-[#1C2230] border border-[#2E384D] rounded-lg p-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 bg-gradient-to-br ${guide.color} rounded-lg flex items-center justify-center`}>
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{guide.title}</h4>
                  <p className="text-sm text-gray-500">{guide.description.substring(0, 60)}...</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                      {CATEGORIES.find(c => c.id === guide.categoryId)?.name || guide.categoryId}
                    </span>
                    {guide.link && (
                      <span className="text-xs text-gray-500">{guide.link}</span>
                    )}
                    {guide.externalLink && (
                      <ExternalLink className="w-3 h-3 text-gray-500" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(guide)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-[#2E384D] rounded transition-colors"
                  title="Modifier"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(guide.id)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
