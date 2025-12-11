import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Save, X, ExternalLink, BookOpen, Rocket, Shield, Target, Trophy, Zap, Star, Clock, Users, Globe, Eye, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

interface CustomGuide {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  content: string | null;
  icon: string;
  color: string;
  link: string | null;
  externalLink: string | null;
  featured: number;
  sortOrder: number;
}

const CATEGORIES = [
  { id: "debutant", name: "Débutant - Les Bases", icon: "🎮" },
  { id: "expansion", name: "Expansion & Développement", icon: "🚀" },
  { id: "combat", name: "Combat & Stratégie", icon: "⚔️" },
  { id: "defense", name: "Défense & Sécurité", icon: "🛡️" },
  { id: "avance", name: "Techniques Avancées", icon: "🧠" },
  { id: "custom", name: "Guides Personnalisés", icon: "✨" },
];

const ICONS = [
  { id: "BookOpen", component: BookOpen, label: "Livre" },
  { id: "Rocket", component: Rocket, label: "Fusée" },
  { id: "Shield", component: Shield, label: "Bouclier" },
  { id: "Target", component: Target, label: "Cible" },
  { id: "Trophy", component: Trophy, label: "Trophée" },
  { id: "Zap", component: Zap, label: "Éclair" },
  { id: "Star", component: Star, label: "Étoile" },
  { id: "Clock", component: Clock, label: "Horloge" },
  { id: "Users", component: Users, label: "Équipe" },
  { id: "Globe", component: Globe, label: "Globe" },
];

const COLORS = [
  { id: "from-blue-500 to-cyan-600", label: "Bleu Cyan", preview: "bg-gradient-to-br from-blue-500 to-cyan-600" },
  { id: "from-green-500 to-emerald-600", label: "Vert Émeraude", preview: "bg-gradient-to-br from-green-500 to-emerald-600" },
  { id: "from-purple-500 to-pink-600", label: "Violet Rose", preview: "bg-gradient-to-br from-purple-500 to-pink-600" },
  { id: "from-red-500 to-rose-600", label: "Rouge Rose", preview: "bg-gradient-to-br from-red-500 to-rose-600" },
  { id: "from-amber-500 to-orange-600", label: "Orange", preview: "bg-gradient-to-br from-amber-500 to-orange-600" },
  { id: "from-teal-500 to-cyan-600", label: "Turquoise", preview: "bg-gradient-to-br from-teal-500 to-cyan-600" },
  { id: "from-indigo-500 to-purple-600", label: "Indigo", preview: "bg-gradient-to-br from-indigo-500 to-purple-600" },
  { id: "from-pink-500 to-rose-600", label: "Rose", preview: "bg-gradient-to-br from-pink-500 to-rose-600" },
];

function getIconComponent(iconId: string) {
  const found = ICONS.find(i => i.id === iconId);
  return found ? found.component : BookOpen;
}

export function AdminGuidesManager({ token }: { token: string }) {
  const [guides, setGuides] = useState<CustomGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGuide, setEditingGuide] = useState<CustomGuide | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [formData, setFormData] = useState({
    categoryId: "custom",
    title: "",
    description: "",
    content: "",
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
      content: guide.content || "",
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
      content: "",
      icon: "BookOpen",
      color: "from-blue-500 to-cyan-600",
      link: "",
      externalLink: "",
      featured: false,
      sortOrder: 0,
    });
  };

  const IconComponent = getIconComponent(formData.icon);

  if (loading) {
    return <div className="text-gray-400 text-center py-8">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Mes Guides ({guides.length})</h3>
          <p className="text-sm text-gray-500">Créez et gérez vos guides tutoriels</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/30"
            data-testid="button-add-guide"
          >
            <Plus className="w-5 h-5" />
            Créer un guide
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-gradient-to-br from-[#1C2230] to-[#151a24] border border-[#2E384D] rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-b border-[#2E384D] px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">
                    {editingGuide ? "Modifier le guide" : "Créer un nouveau guide"}
                  </h4>
                  <p className="text-sm text-gray-400">Remplissez les informations ci-dessous</p>
                </div>
              </div>
              <button onClick={resetForm} className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Catégorie</label>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, categoryId: cat.id })}
                        className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left ${
                          formData.categoryId === cat.id
                            ? "bg-primary/20 border-primary text-white"
                            : "bg-[#0B0E14] border-[#2E384D] text-gray-400 hover:border-gray-500"
                        }`}
                      >
                        <span className="text-lg">{cat.icon}</span>
                        <span className="text-sm font-medium truncate">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Titre du guide *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Ex: Guide du débutant OGame"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description courte *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                    placeholder="Une brève description du guide..."
                    rows={2}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contenu du guide</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none font-mono text-sm"
                    placeholder="Le contenu détaillé du guide... (supporte le markdown)"
                    rows={6}
                  />
                  <p className="text-xs text-gray-500 mt-1">Astuce: Utilisez ## pour les titres, ** pour le gras, - pour les listes</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Lien interne</label>
                    <input
                      type="text"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-primary transition-all"
                      placeholder="/guide/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Lien externe</label>
                    <input
                      type="url"
                      value={formData.externalLink}
                      onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
                      className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-primary transition-all"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Icône</label>
                  <div className="flex flex-wrap gap-2">
                    {ICONS.map((icon) => {
                      const Icon = icon.component;
                      return (
                        <button
                          key={icon.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, icon: icon.id })}
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                            formData.icon === icon.id
                              ? "bg-primary text-white ring-2 ring-primary ring-offset-2 ring-offset-[#1C2230]"
                              : "bg-[#0B0E14] text-gray-400 hover:text-white hover:bg-[#2E384D]"
                          }`}
                          title={icon.label}
                        >
                          <Icon className="w-5 h-5" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Couleur</label>
                  <div className="flex flex-wrap gap-2">
                    {COLORS.map((color) => (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, color: color.id })}
                        className={`w-10 h-10 rounded-xl ${color.preview} transition-all ${
                          formData.color === color.id
                            ? "ring-2 ring-white ring-offset-2 ring-offset-[#1C2230] scale-110"
                            : "hover:scale-105"
                        }`}
                        title={color.label}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-5 h-5 rounded bg-[#0B0E14] border-[#2E384D] text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      Mettre en avant
                    </span>
                  </label>

                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-400">Ordre:</label>
                    <input
                      type="number"
                      value={formData.sortOrder}
                      onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                      className="w-16 bg-[#0B0E14] border border-[#2E384D] rounded-lg px-2 py-1 text-white text-center"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg"
                    data-testid="button-save-guide"
                  >
                    <Save className="w-5 h-5" />
                    {editingGuide ? "Mettre à jour" : "Créer le guide"}
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
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Prévisualisation
                  </h5>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    {showPreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {showPreview && (
                  <div className="space-y-4">
                    <div className={`bg-gradient-to-br ${formData.color} p-[1px] rounded-2xl`}>
                      <div className="bg-[#0B0E14] rounded-2xl p-5 h-full">
                        <div className="flex items-start gap-4">
                          <div className={`w-14 h-14 bg-gradient-to-br ${formData.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-white text-lg truncate">
                                {formData.title || "Titre du guide"}
                              </h4>
                              {formData.featured && (
                                <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-gray-400 text-sm line-clamp-2">
                              {formData.description || "Description du guide..."}
                            </p>
                            <div className="flex items-center gap-2 mt-3">
                              <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-lg">
                                {CATEGORIES.find(c => c.id === formData.categoryId)?.name || "Catégorie"}
                              </span>
                              {formData.externalLink && (
                                <ExternalLink className="w-3 h-3 text-gray-500" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {formData.content && (
                      <div className="bg-[#0B0E14] border border-[#2E384D] rounded-xl p-4">
                        <h6 className="text-xs font-medium text-gray-500 mb-2">Aperçu du contenu</h6>
                        <div className="prose prose-invert prose-sm max-w-none">
                          <p className="text-gray-300 text-sm whitespace-pre-wrap line-clamp-6">
                            {formData.content}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {!showForm && guides.length === 0 ? (
        <div className="text-center py-16 bg-[#1C2230] border border-dashed border-[#2E384D] rounded-2xl">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-cyan-400" />
          </div>
          <h4 className="text-lg font-bold text-white mb-2">Aucun guide créé</h4>
          <p className="text-gray-500 mb-6">Créez votre premier guide tutoriel pour aider vos joueurs</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all"
          >
            <Plus className="w-5 h-5" />
            Créer mon premier guide
          </button>
        </div>
      ) : !showForm && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((guide) => {
            const Icon = getIconComponent(guide.icon);
            return (
              <div
                key={guide.id}
                className={`bg-gradient-to-br ${guide.color} p-[1px] rounded-xl group`}
              >
                <div className="bg-[#1C2230] rounded-xl p-4 h-full flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${guide.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white truncate">{guide.title}</h4>
                      {guide.featured === 1 && <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{guide.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-primary">
                        {CATEGORIES.find(c => c.id === guide.categoryId)?.icon} {CATEGORIES.find(c => c.id === guide.categoryId)?.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => startEdit(guide)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(guide.id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
