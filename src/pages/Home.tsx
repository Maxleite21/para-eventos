import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Gift, Palette, ShieldCheck, ArrowRight, Star } from 'lucide-react'

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
    <div className="min-h-screen bg-[#fafaf9] text-stone-800 font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-emerald-600 p-1.5 rounded-lg">
            <Gift className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight">GiftList <span className="text-emerald-600 font-black">PRO</span></h1>
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <a href="#features" className="text-sm font-semibold text-stone-500 hover:text-emerald-600 transition-colors">Funcionalidades</a>
          <a href="#pricing" className="text-sm font-semibold text-stone-500 hover:text-emerald-600 transition-colors">Preços</a>
          <button 
            onClick={() => navigate('/create')}
            className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-700 transition-all shadow-md hover:shadow-emerald-200"
          >
            Criar Minha Lista
          </button>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto py-20 md:py-32 px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 animate-bounce">
            <Star className="w-3 h-3 fill-emerald-700" />
            Nova Versão 2.0
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-stone-900 mb-8 leading-[1.1] tracking-tight max-w-4xl mx-auto">
            A forma mais elegante de <span className="text-emerald-600 italic">ganhar presentes.</span>
          </h2>
          <p className="text-xl text-stone-500 mb-12 leading-relaxed max-w-2xl mx-auto">
            Gerencie listas para Casamentos, Chás e Aniversários com um sistema inteligente que seus convidados vão adorar usar.
          </p>

          {/* Search Box */}
          <div className="max-w-lg mx-auto bg-white p-2 rounded-2xl shadow-2xl shadow-emerald-100 border border-stone-200 mb-16 transform transition-all hover:scale-[1.02]">
            <form onSubmit={handleGoToEvent} className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center px-4 gap-3 border-b sm:border-b-0 sm:border-r border-stone-100 py-2">
                <Search className="text-stone-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Nome do evento (ex: mel-e-max)" 
                  className="flex-1 outline-none text-stone-800 font-medium placeholder:text-stone-300"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
              <button type="submit" className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group">
                Acessar Lista
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          <div className="flex justify-center gap-8 opacity-40 grayscale filter">
            {/* Logos fictícios de parceiros */}
            <span className="font-serif text-xl font-bold italic">WeddingPlanner</span>
            <span className="font-serif text-xl font-bold italic">Evently</span>
            <span className="font-serif text-xl font-bold italic">Giftify</span>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-24 border-y border-stone-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-20">
              <h3 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Por que escolher o GiftList PRO?</h3>
              <p className="text-stone-500">Tudo o que você precisa para uma organização impecável.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="group">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Palette className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold mb-3">Identidade Visual</h4>
                <p className="text-stone-500 leading-relaxed">Personalize cores, mensagens e o tema para combinar perfeitamente com o seu evento.</p>
              </div>
              <div className="group">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold mb-3">Reservas Inteligentes</h4>
                <p className="text-stone-500 leading-relaxed">Evite presentes repetidos com nosso sistema de reserva em tempo real para convidados.</p>
              </div>
              <div className="group">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all">
                  <Gift className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold mb-3">Sugestões de Convidados</h4>
                <p className="text-stone-500 leading-relaxed">Permita que seus convidados sugiram itens novos que você esqueceu de listar.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-6xl mx-auto py-24 px-6">
          <div className="bg-emerald-600 rounded-[3rem] p-12 md:p-20 text-white text-center relative overflow-hidden shadow-2xl shadow-emerald-200">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Comece sua lista em menos de 2 minutos.</h2>
              <p className="text-lg md:text-xl opacity-90 mb-12 max-w-xl mx-auto">
                Junte-se a milhares de casais que já usam nossa plataforma para organizar seus eventos.
              </p>
              <button 
                onClick={() => navigate('/create')}
                className="bg-white text-emerald-700 px-12 py-5 rounded-full text-lg font-black hover:bg-emerald-50 transition-all shadow-xl hover:scale-105"
              >
                Criar Minha Lista Agora
              </button>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-black/5 rounded-full blur-3xl -translate-x-1/2"></div>
          </div>
        </section>
      </main>

      <footer className="py-12 text-center text-stone-400 text-sm bg-white border-t border-stone-100">
        <div className="flex items-center justify-center gap-2 mb-4 grayscale opacity-50">
          <Gift className="w-4 h-4" />
          <span className="font-bold tracking-tight">GiftList PRO</span>
        </div>
        <p>© 2026 • Feito com amor para momentos inesquecíveis.</p>
      </footer>
    </div>
  )
}
