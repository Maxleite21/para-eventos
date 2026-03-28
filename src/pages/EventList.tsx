import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

interface Reservation {
  name: string
  quantity: number
}

interface GiftItem {
  id: number
  name: string
  category: string
  quantity_needed: number
  quantity_reserved: number
  reservations: Reservation[]
  event_id: number
}

interface EventData {
  id: number
  name: string
  slug: string
  theme_color: string
  welcome_message?: string
}

export default function EventList() {
  const { eventSlug } = useParams<{ eventSlug: string }>()
  const navigate = useNavigate()
  const [gifts, setGifts] = useState<GiftItem[]>([])
  const [eventData, setEventData] = useState<EventData | null>(null)
  const [loading, setLoading] = useState(true)
  const [reservingId, setReservingId] = useState<number | null>(null)
  const [userName, setUserName] = useState('')
  const [reserveQty, setReserveQty] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | 'Todos'>('Todos')
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [customItem, setCustomItem] = useState('')

  useEffect(() => {
    if (eventSlug) {
      fetchEventAndGifts()
    }
  }, [eventSlug])

  const fetchEventAndGifts = async () => {
    try {
      setLoading(true)
      // 1. Fetch event data by slug
      const { data: event, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('slug', eventSlug)
        .single()

      if (eventError) throw eventError
      setEventData(event)

      // 2. Fetch gifts for this event
      const { data: giftsData, error: giftsError } = await supabase
        .from('gifts')
        .select('*')
        .eq('event_id', event.id)
        .order('id', { ascending: true })

      if (giftsError) throw giftsError
      setGifts(giftsData || [])
    } catch (error) {
      console.error('Erro ao carregar evento:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReserve = async (id: number) => {
    if (!userName.trim()) {
      alert('Por favor, digite seu nome.')
      return
    }

    const gift = gifts.find(g => g.id === id)
    if (!gift) return

    const available = gift.quantity_needed - gift.quantity_reserved
    if (reserveQty > available) {
      alert(`Desculpe, só restam ${available} unidades deste item.`)
      return
    }

    const newReservation = { name: userName, quantity: reserveQty }
    const updatedReservations = [...(gift.reservations || []), newReservation]
    const updatedQtyReserved = gift.quantity_reserved + reserveQty

    try {
      const { error } = await supabase
        .from('gifts')
        .update({ 
          quantity_reserved: updatedQtyReserved, 
          reservations: updatedReservations 
        })
        .eq('id', id)

      if (error) throw error
      await fetchEventAndGifts()
    } catch (error) {
      alert('Erro ao reservar.')
      console.error(error)
    }

    setReservingId(null)
    setUserName('')
    setReserveQty(1)
  }

  const handleAddCustom = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customItem.trim() || !userName.trim() || !eventData) {
      alert('Preencha os campos.')
      return
    }

    const newItem = {
      name: customItem,
      category: 'Sugerido por Convidado',
      quantity_needed: reserveQty,
      quantity_reserved: reserveQty,
      reservations: [{ name: userName, quantity: reserveQty }],
      event_id: eventData.id
    }

    try {
      const { error } = await supabase.from('gifts').insert([newItem])
      if (error) throw error
      await fetchEventAndGifts()
      setCustomItem('')
      setUserName('')
      setReserveQty(1)
      setShowCustomForm(false)
      alert('Obrigado pela sugestão! O item foi reservado em seu nome.')
    } catch (error) {
      alert('Erro ao sugerir.')
      console.error(error)
    }
  }

  const categories = Array.from(new Set(gifts.map(g => g.category)))
  const filteredGifts = selectedCategory === 'Todos' ? gifts : gifts.filter(g => g.category === selectedCategory)

  if (loading) return (
    <div className="min-h-screen bg-[#f4f7f1] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderBottomColor: eventData?.theme_color || '#556b2f' }}></div>
    </div>
  )

  if (!eventData) return (
    <div className="min-h-screen bg-[#f4f7f1] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-stone-800">Evento não encontrado</h2>
        <p className="text-stone-600 mt-2">O link pode estar incorreto ou o evento foi removido.</p>
      </div>
    </div>
  )

  const themeColor = eventData.theme_color || '#556b2f'

  return (
    <div className="min-h-screen bg-[#f4f7f1] text-[#3c4a3e] font-sans pb-12">
      {/* Header */}
      <header className="text-white py-16 px-6 text-center shadow-md" style={{ backgroundColor: themeColor }}>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 tracking-tight">{eventData.name}</h1>
        <p className="text-xl font-light opacity-90 italic">Lista de Presentes</p>
      </header>

      <main className="max-w-6xl mx-auto py-12 px-6">
        {/* Welcome Message */}
        <section className="mb-12 text-center bg-white p-8 rounded-3xl shadow-sm border border-[#d8e0d1]">
          <div className="text-3xl mb-4">😘</div>
          <p className="text-xl font-medium mb-4 leading-relaxed" style={{ color: themeColor }}>
            {eventData.welcome_message || 'Olá pessoal, estamos organizando nossa lista de presentes! Façam suas escolhas e fiquem à vontade.'}
          </p>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Escolha um item da lista e indique a quantidade que deseja presentear. Se preferir algo diferente, use o botão abaixo!
          </p>
          
          <button 
            onClick={() => setShowCustomForm(!showCustomForm)} 
            className="mt-8 text-white px-6 py-2 rounded-full transition-colors shadow-sm font-medium"
            style={{ backgroundColor: `${themeColor}cc` }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = themeColor)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = `${themeColor}cc`)}
          >
            {showCustomForm ? 'Fechar Sugestão' : 'Sugerir outro item 🎁'}
          </button>

          {showCustomForm && (
            <form onSubmit={handleAddCustom} className="mt-8 p-6 bg-[#f4f7f1] rounded-2xl max-w-md mx-auto space-y-4 text-left border border-[#d8e0d1]">
              <h3 className="font-serif text-lg text-center" style={{ color: themeColor }}>Sugerir e Reservar Item</h3>
              <div>
                <label className="text-xs font-bold uppercase opacity-70">Nome do Item</label>
                <input type="text" placeholder="Ex: Air Fryer" className="w-full px-4 py-2 rounded-lg border border-[#d8e0d1] outline-none mt-1" value={customItem} onChange={(e) => setCustomItem(e.target.value)} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase opacity-70">Seu Nome</label>
                  <input type="text" placeholder="Seu nome" className="w-full px-4 py-2 rounded-lg border border-[#d8e0d1] outline-none mt-1" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase opacity-70">Quantidade</label>
                  <input type="number" min="1" className="w-full px-4 py-2 rounded-lg border border-[#d8e0d1] outline-none mt-1" value={reserveQty} onChange={(e) => setReserveQty(parseInt(e.target.value))} required />
                </div>
              </div>
              <button type="submit" className="w-full text-white py-3 rounded-lg font-medium transition-colors shadow-md" style={{ backgroundColor: themeColor }}>Confirmar Sugestão</button>
            </form>
          )}
        </section>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          <button 
            onClick={() => setSelectedCategory('Todos')} 
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory === 'Todos' ? 'text-white' : 'bg-white border border-[#d8e0d1]'}`}
            style={selectedCategory === 'Todos' ? { backgroundColor: themeColor } : { color: themeColor }}
          >
            Todos
          </button>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)} 
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? 'text-white' : 'bg-white border border-[#d8e0d1]'}`}
              style={selectedCategory === cat ? { backgroundColor: themeColor } : { color: themeColor }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gift Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGifts.map((gift) => {
            const isCompleted = gift.quantity_reserved >= gift.quantity_needed;
            return (
              <div key={gift.id} className={`bg-white rounded-2xl p-5 shadow-sm border transition-all duration-300 ${isCompleted ? 'border-stone-200 opacity-80 bg-stone-50' : 'border-[#d8e0d1] hover:shadow-lg'}`}>
                <div className="flex flex-col h-full">
                  <span className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: themeColor }}>{gift.category}</span>
                  <h3 className={`text-lg font-semibold leading-tight mb-2 ${isCompleted ? 'text-stone-400 line-through' : 'text-[#3c4a3e]'}`}>{gift.name}</h3>
                  
                  <div className="text-xs font-medium mb-4" style={{ color: themeColor }}>
                    {gift.quantity_reserved} de {gift.quantity_needed} reservados
                  </div>

                  <div className="mt-auto space-y-2">
                    {gift.reservations?.map((res, i) => (
                      <div key={i} className="text-[11px] text-stone-500 italic bg-white/50 py-1 px-2 rounded border border-stone-100 flex justify-between">
                        <span>{res.name}</span>
                        <span className="font-bold">+{res.quantity}</span>
                      </div>
                    ))}

                    {!isCompleted && (
                      <>
                        {reservingId === gift.id ? (
                          <div className="p-3 bg-[#f4f7f1] rounded-xl space-y-2 border border-[#d8e0d1]">
                            <input type="text" placeholder="Seu nome" className="w-full px-3 py-1.5 border border-[#869477] rounded-lg outline-none text-xs" value={userName} onChange={(e) => setUserName(e.target.value)} autoFocus />
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold opacity-70">QTD:</span>
                              <input type="number" min="1" max={gift.quantity_needed - gift.quantity_reserved} className="w-16 px-2 py-1 border border-[#869477] rounded-lg outline-none text-xs" value={reserveQty} onChange={(e) => setReserveQty(parseInt(e.target.value))} />
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleReserve(gift.id)} 
                                className="flex-1 text-white py-1.5 rounded-lg text-xs font-bold shadow-sm"
                                style={{ backgroundColor: themeColor }}
                              >
                                Confirmar
                              </button>
                              <button onClick={() => {setReservingId(null); setUserName(''); setReserveQty(1);}} className="px-2 py-1.5 text-stone-500 text-xs hover:text-stone-800 transition-colors">Sair</button>
                            </div>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setReservingId(gift.id)} 
                            className="w-full bg-white border py-2 rounded-lg text-xs font-bold transition-all hover:text-white"
                            style={{ 
                              color: themeColor, 
                              borderColor: `${themeColor}44`,
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = themeColor)}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                          >
                            Reservar Item
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      <footer className="py-16 text-center border-t border-[#d8e0d1] bg-white mt-12">
        <p className="text-sm uppercase tracking-widest mb-2 opacity-60">Com carinho,</p>
        <p className="text-3xl font-serif" style={{ color: themeColor }}>{eventData.name}</p>
        <p className="text-stone-400 text-xs mt-8 italic">© 2026 • GiftList PRO</p>
        <div className="mt-6">
          <button 
            onClick={() => navigate(`/${eventSlug}/admin`)}
            className="text-[10px] font-black uppercase tracking-widest text-stone-300 hover:text-stone-600 transition-colors"
          >
            Administrar esta lista
          </button>
        </div>
      </footer>
    </div>
  )
}
