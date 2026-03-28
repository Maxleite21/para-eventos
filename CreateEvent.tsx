import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { Gift, ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function CreateEvent() {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [color, setColor] = useState('#556b2f')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('events')
        .insert([{ 
          name, 
          slug: slug.toLowerCase().replace(/\s+/g, '-'), 
          theme_color: color 
        }])

      if (error) throw error
      setSuccess(true)
    } catch (error: any) {
      alert('Erro ao criar evento: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white p-10 rounded-[2rem] shadow-xl text-center border border-stone-100">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-emerald-600 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-serif text-stone-900 mb-4">Lista Criada!</h2>
          <p className="text-stone-500 mb-8 leading-relaxed">
            Seu evento foi configurado com sucesso. Agora você pode começar a adicionar os presentes.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => navigate(`/${slug}`)}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg"
            >
              Ver Minha Lista
            </button>
            <button 
              onClick={() => navigate('/')}
              className="w-full text-stone-400 py-2 text-sm font-medium hover:text-stone-600"
            >
              Voltar para Início
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] py-12 px-6">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-stone-500 hover:text-stone-900 font-medium mb-12 transition-colors mx-auto max-w-lg w-full"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <div className="max-w-lg mx-auto bg-white p-10 rounded-[2rem] shadow-xl border border-stone-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-emerald-600 p-2 rounded-xl">
            <Gift className="text-white w-6 h-6" />
          </div>
          <h2 className="text-3xl font-serif text-stone-900 tracking-tight">Criar Nova Lista</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2 ml-1">Nome do Evento</label>
            <input 
              type="text" 
              placeholder="Ex: Chá de Cozinha da Mel" 
              className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-stone-900 placeholder:text-stone-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2 ml-1">Link Personalizado (slug)</label>
            <div className="relative flex items-center">
              <span className="absolute left-5 text-stone-400 font-bold select-none">/</span>
              <input 
                type="text" 
                placeholder="mel-e-max" 
                className="w-full pl-10 pr-5 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-stone-900 placeholder:text-stone-300"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2 ml-1">Cor do Tema</label>
            <div className="flex gap-3">
              {['#556b2f', '#869477', '#ff69b4', '#4a90e2', '#9b59b6', '#f39c12'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-full border-4 transition-all ${color === c ? 'border-emerald-200 scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <input 
                type="color" 
                className="w-10 h-10 p-0 border-0 rounded-full cursor-pointer bg-transparent"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-stone-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-stone-100 disabled:opacity-50"
          >
            {loading ? 'Criando...' : 'Configurar Minha Lista'}
          </button>
        </form>
      </div>
    </div>
  )
}
