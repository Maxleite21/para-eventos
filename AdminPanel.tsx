import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  LayoutDashboard, 
  ChevronLeft, 
  Gift, 
  Tag, 
  Hash, 
  AlertCircle 
} from 'lucide-react'

interface GiftItem {
  id: number
  name: string
  category: string
  quantity_needed: number
  quantity_reserved: number
  event_id: number
}

export default function AdminPanel() {
  const { eventSlug } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState<any>(null)
  const [gifts, setGifts] = useState<GiftItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Form states for adding/editing
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity_needed: 1
  })

  useEffect(() => {
    fetchEventAndGifts()
  }, [eventSlug])

  const fetchEventAndGifts = async () => {
    try {
      setLoading(true)
      // Fetch event
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('slug', eventSlug)
        .single()

      if (eventError) throw eventError
      setEvent(eventData)

      // Fetch gifts
      const { data: giftsData, error: giftsError } = await supabase
        .from('gifts')
        .select('*')
        .eq('event_id', eventData.id)
        .order('id', { ascending: true })

      if (giftsError) throw giftsError
      setGifts(giftsData || [])
    } catch (err: any) {
      console.error(err)
      setError('Não foi possível carregar os dados do evento.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddGift = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.category) return

    try {
      const { error } = await supabase.from('gifts').insert([{
        ...formData,
        event_id: event.id,
        quantity_reserved: 0,
        reservations: []
      }])

      if (error) throw error
      
      setIsAdding(false)
      setFormData({ name: '', category: '', quantity_needed: 1 })
      await fetchEventAndGifts()
    } catch (err) {
      alert('Erro ao adicionar item.')
      console.error(err)
    }
  }

  const handleUpdateGift = async (id: number) => {
    try {
      const { error } = await supabase
        .from('gifts')
        .update(formData)
        .eq('id', id)

      if (error) throw error
      
      setEditingId(null)
      await fetchEventAndGifts()
    } catch (err) {
      alert('Erro ao atualizar item.')
      console.error(err)
    }
  }

  const handleDeleteGift = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este item?')) return

    try {
      const { error } = await supabase
        .from('gifts')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchEventAndGifts()
    } catch (err) {
      alert('Erro ao excluir item.')
      console.error(err)
    }
  }

  const startEditing = (gift: GiftItem) => {
    setEditingId(gift.id)
    setFormData({
      name: gift.name,
      category: gift.category,
      quantity_needed: gift.quantity_needed
    })
  }

  if (loading) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>
  )

  if (error || !event) return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 text-center">
      <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Evento não encontrado</h2>
      <p className="text-stone-500 mb-6">{error || 'Verifique se o link está correto.'}</p>
      <button onClick={() => navigate('/')} className="bg-stone-900 text-white px-6 py-2 rounded-xl font-bold">Voltar para Home</button>
    </div>
  )

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans pb-20">
      {/* Header Admin */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(`/${eventSlug}`)}
              className="p-2 hover:bg-stone-100 rounded-lg text-stone-400 transition-colors"
              title="Ver Site Público"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-stone-900 p-1.5 rounded-lg">
                <LayoutDashboard className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-black text-stone-900 leading-none">Painel Admin</h1>
                <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">{event.name}</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-lg shadow-emerald-100"
          >
            <Plus className="w-4 h-4" />
            Novo Item
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Form para adicionar item */}
        {isAdding && (
          <div className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-xl mb-10 animate-in fade-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Gift className="text-emerald-600 w-6 h-6" />
                Adicionar Novo Presente
              </h3>
              <button onClick={() => setIsAdding(false)} className="text-stone-400 hover:text-stone-600"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleAddGift} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                  <Gift className="w-3 h-3" /> Nome do Item
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: Air Fryer Philips" 
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-emerald-500 transition-colors"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                  <Tag className="w-3 h-3" /> Categoria
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: Eletrodomésticos" 
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-emerald-500 transition-colors"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                  <Hash className="w-3 h-3" /> Quantidade Necessária
                </label>
                <div className="flex gap-4">
                  <input 
                    type="number" 
                    min="1"
                    className="flex-1 px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-emerald-500 transition-colors"
                    value={formData.quantity_needed}
                    onChange={e => setFormData({...formData, quantity_needed: parseInt(e.target.value) || 1})}
                    required
                  />
                  <button type="submit" className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all">Salvar</button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Lista de Itens */}
        <div className="bg-white rounded-[2rem] border border-stone-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-8 py-5 text-xs font-black text-stone-400 uppercase tracking-widest">Item</th>
                  <th className="px-8 py-5 text-xs font-black text-stone-400 uppercase tracking-widest">Categoria</th>
                  <th className="px-8 py-5 text-xs font-black text-stone-400 uppercase tracking-widest">Meta</th>
                  <th className="px-8 py-5 text-xs font-black text-stone-400 uppercase tracking-widest">Reservados</th>
                  <th className="px-8 py-5 text-xs font-black text-stone-400 uppercase tracking-widest text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {gifts.map(gift => (
                  <tr key={gift.id} className="group hover:bg-emerald-50/30 transition-colors">
                    <td className="px-8 py-5">
                      {editingId === gift.id ? (
                        <input 
                          type="text" 
                          className="w-full px-3 py-1.5 border border-emerald-300 rounded-lg outline-none"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      ) : (
                        <span className="font-bold text-stone-900">{gift.name}</span>
                      )}
                    </td>
                    <td className="px-8 py-5">
                      {editingId === gift.id ? (
                        <input 
                          type="text" 
                          className="w-full px-3 py-1.5 border border-emerald-300 rounded-lg outline-none"
                          value={formData.category}
                          onChange={e => setFormData({...formData, category: e.target.value})}
                        />
                      ) : (
                        <span className="text-sm font-bold px-3 py-1 bg-stone-100 text-stone-500 rounded-full">{gift.category}</span>
                      )}
                    </td>
                    <td className="px-8 py-5">
                      {editingId === gift.id ? (
                        <input 
                          type="number" 
                          className="w-20 px-3 py-1.5 border border-emerald-300 rounded-lg outline-none"
                          value={formData.quantity_needed}
                          onChange={e => setFormData({...formData, quantity_needed: parseInt(e.target.value) || 1})}
                        />
                      ) : (
                        <span className="font-bold text-stone-900">{gift.quantity_needed}</span>
                      )}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-stone-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500" 
                            style={{ width: `${Math.min(100, (gift.quantity_reserved / gift.quantity_needed) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-black text-emerald-600">{gift.quantity_reserved}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        {editingId === gift.id ? (
                          <>
                            <button onClick={() => handleUpdateGift(gift.id)} className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"><Save className="w-5 h-5" /></button>
                            <button onClick={() => setEditingId(null)} className="p-2 text-stone-400 hover:bg-stone-100 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => startEditing(gift)} className="p-2 text-stone-400 hover:bg-emerald-100 hover:text-emerald-600 rounded-lg transition-colors"><Edit3 className="w-5 h-5" /></button>
                            <button onClick={() => handleDeleteGift(gift.id)} className="p-2 text-stone-400 hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors"><Trash2 className="w-5 h-5" /></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {gifts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center">
                        <Gift className="w-12 h-12 text-stone-200 mb-4" />
                        <p className="text-stone-400 font-bold">Nenhum item cadastrado ainda.</p>
                        <button onClick={() => setIsAdding(true)} className="mt-4 text-emerald-600 font-bold hover:underline">Adicionar meu primeiro presente</button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
