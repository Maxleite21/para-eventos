import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [slug, setSlug] = useState('')
  const navigate = useNavigate()

  const handleGoToEvent = (e: React.FormEvent) => {
    e.preventDefault()
    if (slug.trim()) {
      navigate(`/${slug.trim().toLowerCase()}`)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      <header className="bg-white border-b border-stone-200 py-6 px-8 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">GiftList <span className="text-emerald-600 font-black">PRO</span></h1>
        <nav className="hidden md:flex gap-6 items-center">
          <a href="#" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">Funcionalidades</a>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all shadow-md">Criar Minha Lista</button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">Plataforma SaaS para Eventos</span>
          <h2 className="text-5xl md:text-6xl font-serif text-stone-900 mb-8 leading-tight">Suas listas de presentes em um só lugar.</h2>
          
          {/* Campo de Busca de Evento */}
          <div className="bg-white p-2 rounded-2xl shadow-xl border border-stone-200 max-w-md mx-auto mb-12">
            <form onSubmit={handleGoToEvent} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Digite o nome do evento (ex: mel-e-max)" 
                className="flex-1 px-4 py-3 rounded-xl outline-none text-sm"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              <button type="submit" className="bg-stone-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-stone-800 transition-all">Acessar Lista</button>
            </form>
          </div>

          <p className="text-xl text-stone-600 mb-12 leading-relaxed">
            Uma solução elegante para gerenciar listas de Casamento, Chá de Panela e eventos especiais.
          </p>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
            <h3 className="text-xl font-bold mb-3">Links Únicos</h3>
            <p className="text-stone-600 text-sm">Cada cliente recebe um link personalizado para compartilhar com os convidados.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
            <h3 className="text-xl font-bold mb-3">Cores Customizadas</h3>
            <p className="text-stone-600 text-sm">O tema do site se adapta automaticamente à escolha do cliente.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
            <h3 className="text-xl font-bold mb-3">Gestão de Itens</h3>
            <p className="text-stone-600 text-sm">Controle total de quantidades e reservas em tempo real.</p>
          </div>
        </div>
      </main>

      <footer className="py-12 text-center text-stone-400 text-xs border-t border-stone-200 bg-white mt-20">
        <p>© 2026 GiftList PRO • O sistema oficial dos seus eventos.</p>
      </footer>
    </div>
  )
}
