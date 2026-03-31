import { useState } from "react";
import { Check, ChevronDown, MapPin, Clock, Phone, Mail, Menu, X } from "lucide-react";

/**
 * Design Philosophy: Medical Minimalism with Warm Humanity
 * - Premium wellness clinic aesthetic with peptide therapy focus
 * - Color palette: Dark green (#1B5E3F), warm beige (#F5F1ED), soft gold (#D4A574)
 * - Typography: Playfair Display (headers), Inter (body)
 * - Emphasis on medical credibility, safety, and personalized approach
 * - Real clinic photos integrated for authenticity
 */

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [selectedProgram, setSelectedProgram] = useState("Новый понедельник");
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // CDN URLs for clinic photos
  const photos = {
    ivPatient: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/lpIjVeIoDTAQVIOG.webp",
    doctorOffice: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/TKhJXPaJQWNGgEiB.jpg",
    ivDrip: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/DvYEDyiDcefFfwuZ.jpg",
    recliners: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/ZIcdmlMlVmVhLyZD.jpg",
    receptionLogo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/xMgEidrUcTgfXKfc.jpg",
    receptionDesk: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/iNJVkdeepDsPpcDN.jpg",
    waitingArea: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/xBiIIyOqnOdmPTVU.jpg",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/YmfaYcSJobutlROw.jpg",
    logoCircle: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/LmXzAEntIIRgShGK.png",
    logoCircleLight: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/LmXzAEntIIRgShGK.png",
    heroBackground: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/hdtQvaxiWb9W7we.jpg",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <img src={photos.logoCircle} alt="Logo" className="w-10 h-10 rounded-full" />
            <div>
              <div className="font-serif font-bold text-gray-800">Понедельник</div>
              <div className="text-xs text-gray-600">КЛИНИКА</div>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#approach" className="text-sm text-gray-700 hover:text-gray-900">Наш подход</a>
            <a href="#programs" className="text-sm text-gray-700 hover:text-gray-900">Кому подойдёт</a>
            <a href="#programs" className="text-sm text-gray-700 hover:text-gray-900">Программы</a>
            <a href="#results" className="text-sm text-gray-700 hover:text-gray-900">Результаты</a>
            <a href="#faq" className="text-sm text-gray-700 hover:text-gray-900">Контакты</a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+79150665353" className="text-sm text-gray-700 hover:text-gray-900">+7 (915) 066-05-53</a>
            <button className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
              Записаться
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <div className="container py-4 flex flex-col gap-4">
              <a href="#approach" onClick={closeMobileMenu} className="text-sm text-gray-700 hover:text-gray-900">Наш подход</a>
              <a href="#programs" onClick={closeMobileMenu} className="text-sm text-gray-700 hover:text-gray-900">Кому подойдёт</a>
              <a href="#programs" onClick={closeMobileMenu} className="text-sm text-gray-700 hover:text-gray-900">Программы</a>
              <a href="#results" onClick={closeMobileMenu} className="text-sm text-gray-700 hover:text-gray-900">Результаты</a>
              <a href="#faq" onClick={closeMobileMenu} className="text-sm text-gray-700 hover:text-gray-900">Контакты</a>
              <button className="w-full px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                Записаться
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section Screen 1 - Desktop: minimalist center layout */}
      <section className="relative hidden sm:block py-32 md:py-40 overflow-hidden" style={{
        backgroundImage: `url(${photos.heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        
        <div className="container relative z-10 flex items-center justify-center min-h-[600px]">
          <div className="text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 font-display leading-tight" style={{textShadow: '0 2px 4px rgba(255,255,255,0.3)'}}>
              Ваш новый понедельник начинается здесь
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed" style={{textShadow: '0 1px 2px rgba(255,255,255,0.3)'}}>
              Начните свой новый понедельник — без лишнего веса
            </p>
            <p className="text-base md:text-lg text-gray-600 uppercase tracking-widest font-semibold" style={{textShadow: '0 1px 2px rgba(255,255,255,0.3)'}}>
              Медицинская программа снижения веса под контролем врача
            </p>
          </div>
        </div>
      </section>

      {/* Hero Section Screen 2 - Desktop: UTP blocks and details */}
      <section className="relative hidden sm:block py-16 md:py-20 overflow-hidden bg-background">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 font-display">Клиника снижения веса на новейших препаратах под контролем врачей без жёстких диет и откатов</h2>
            <p className="text-base md:text-lg text-foreground/80 mb-8 leading-relaxed">
              Диагностика, пептидная терапия и восполнение дефицитов с клинически протестированными протоколами инфузионной терапии и питания
            </p>
            
            {/* Patient results statistic */}
            <div className="mb-8 p-4 bg-primary/10 border-l-4 border-primary rounded">
              <p className="text-base text-foreground font-semibold">
                Пациенты клиники в среднем теряют 6–15 кг за курс программы
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left column - UTP blocks */}
            <div>
              <div className="grid grid-cols-1 gap-4 mb-8">
                {[
                  "Программы похудения и современные препараты под контролем врача-эндокринолога по вашим анализам",
                  "Пептидная терапия и современные препараты для контроля аппетита",
                  "Восполнение дефицитов витаминов и микроэлементов",
                  "Лечение причин набора веса, а не временные диеты",
                ].map((text, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-border">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-0.5">
                        ✓
                      </div>
                      <p className="text-sm text-foreground leading-snug">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right column - additional info */}
            <div>
              <p className="text-foreground/80 text-base mb-6 leading-relaxed italic">
                Многие пациенты приходят к нам после того, как слышали о препаратах семаглутида и тирзепатида (Оземпик, Мунжаро и аналоги).
                <br />
                <br />
                Мы подбираем терапию индивидуально — с учётом анализов, состояния организма и целей пациента.
              </p>
              
              <div className="flex flex-row gap-3">
                <a href="#programs" className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors text-center text-base">
                  Подобрать программу
                </a>
                <a href="#consultation" className="px-6 py-3 border-2 border-primary text-primary hover:bg-primary/5 rounded-lg font-semibold transition-colors text-center text-base">
                  Записаться
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile hero - Screen 1: Text-only elegant design */}
      <section className="sm:hidden relative w-full" style={{
        margin: 0,
        padding: '3rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        backgroundColor: '#F5F1ED',
        justifyContent: 'center',
        minHeight: '60vh'
      }}>
        {/* Main title */}
        <div style={{
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h1 className="font-serif font-bold text-gray-800" style={{
            margin: 0,
            lineHeight: '1.3',
            fontSize: '1.75rem',
            letterSpacing: '-0.5px'
          }}>
            Ваш новый понедельник начинается здесь
          </h1>
        </div>

        {/* Subtitle */}
        <div style={{
          marginBottom: '2.5rem',
          textAlign: 'center'
        }}>
          <p className="text-base text-gray-700 leading-relaxed italic" style={{
            margin: 0,
            fontSize: '0.95rem',
            fontStyle: 'italic'
          }}>
            Начните свой новый понедельник — без лишнего веса
          </p>
        </div>

        {/* Program description */}
        <div style={{
          textAlign: 'center',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(27, 94, 63, 0.1)'
        }}>
          <p className="text-sm text-gray-800 uppercase tracking-widest font-semibold leading-relaxed" style={{
            margin: 0,
            fontSize: '0.8rem',
            letterSpacing: '0.05em'
          }}>
            Медицинская программа<br/>снижения веса под<br/>контролем врача
          </p>
        </div>
      </section>

      {/* Program offer section - seamless transition */}
      <section className="sm:hidden relative text-center" style={{
        backgroundColor: '#D9CBB1',
        margin: 0,
        padding: '2rem 1rem'
      }}>
        <p className="text-sm text-gray-800 uppercase tracking-widest font-semibold leading-relaxed px-4" style={{
          margin: 0
        }}>
          ЭТАПЫ ПРОГРАММЫ СНИЖЕНИЯ ВЕСА<br/>ПОШАГОВЫЙ ПУТЬ К РЕЗУЛЬТАТУ — ОТ ДИАГНОСТИКИ ДО ЗАКРЕПЛЕНИЯ
        </p>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">Этапы программы снижения веса</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Пошаговый путь к результату — от диагностики до закрепления
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Новый понедельник",
                description: "Базовая программа для начинающих",
                features: ["Консультация врача", "Анализы и диагностика", "Подбор препаратов", "Еженедельное наблюдение"]
              },
              {
                title: "Интенсив",
                description: "Ускоренная программа похудения",
                features: ["Все включено в базовую", "Инфузионная терапия", "Питание по плану", "Дважды в неделю"]
              },
              {
                title: "VIP",
                description: "Премиум программа с максимальной поддержкой",
                features: ["Персональный врач", "Домашние визиты", "Круглосуточная поддержка", "Индивидуальный план"]
              }
            ].map((program, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-foreground mb-2 font-display">{program.title}</h3>
                <p className="text-sm text-foreground/70 mb-6">{program.description}</p>
                <ul className="space-y-3 mb-8">
                  {program.features.map((feature, fidx) => (
                    <li key={fidx} className="flex gap-2 text-sm text-foreground">
                      <Check size={16} className="text-primary flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm">
                  Выбрать программу
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">Результаты пациентов</h2>
            <p className="text-lg text-foreground/70">Реальные истории успеха</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Анна", loss: "12 кг", time: "3 месяца" },
              { name: "Мария", loss: "15 кг", time: "4 месяца" },
              { name: "Елена", loss: "10 кг", time: "2.5 месяца" }
            ].map((result, idx) => (
              <div key={idx} className="text-center p-6 bg-background rounded-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">−{result.loss}</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">{result.name}</h3>
                <p className="text-sm text-foreground/70">за {result.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-background">
        <div className="container max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">Часто задаваемые вопросы</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Безопасны ли препараты?",
                answer: "Да, все препараты прошли клинические испытания и одобрены для медицинского использования. Мы используем только проверенные и безопасные препараты под контролем врача."
              },
              {
                question: "Сколько стоит программа?",
                answer: "Цена зависит от выбранной программы и индивидуальных потребностей. Начиная от 15 000 рублей в месяц. Первая консультация бесплатна."
              },
              {
                question: "Какие результаты можно ожидать?",
                answer: "В среднем пациенты теряют 6-15 кг за курс программы. Результаты зависят от индивидуальных особенностей организма и соблюдения рекомендаций."
              },
              {
                question: "Есть ли побочные эффекты?",
                answer: "Побочные эффекты минимальны. Могут быть легкая тошнота или снижение аппетита в первые дни, которые проходят самостоятельно."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-background/50 transition-colors"
                >
                  <span className="font-semibold text-foreground text-left">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-primary flex-shrink-0 transition-transform ${
                      expandedFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 py-4 bg-background/50 border-t border-border text-foreground/80">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">Свяжитесь с нами</h2>
            <p className="text-lg text-foreground/70">Запишитесь на первую бесплатную консультацию</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Ваше имя"
              value={formData.name}
              onChange={handleFormChange}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Ваш телефон"
              value={formData.phone}
              onChange={handleFormChange}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Записаться на консультацию
            </button>
            {submitted && (
              <p className="text-center text-sm text-green-600">Спасибо! Мы свяжемся с вами в ближайшее время.</p>
            )}
          </form>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-semibold text-foreground">Телефон</p>
              <p className="text-sm text-foreground/70">+7 (915) 066-05-53</p>
            </div>
            <div>
              <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-semibold text-foreground">Адрес</p>
              <p className="text-sm text-foreground/70">Москва, ул. Петровка, 15</p>
            </div>
            <div>
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-semibold text-foreground">Часы работы</p>
              <p className="text-sm text-foreground/70">Пн-Пт: 10:00-19:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-8">
        <div className="container text-center text-sm">
          <p>&copy; 2024 Клиника "Понедельник". Все права защищены.</p>
        </div>
      </footer>

      {/* Mobile CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border p-3 sm:hidden">
        <button className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
          Записаться на консультацию
        </button>
      </div>

      {/* Mobile spacing for fixed button */}
      <div className="h-16 sm:hidden"></div>
    </div>
  );
}

import { useAuth } from "@/_core/hooks/useAuth";
