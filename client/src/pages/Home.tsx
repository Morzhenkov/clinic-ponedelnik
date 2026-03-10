import { ChevronDown, Check, MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";

/**
 * Design Philosophy: Medical Minimalism with Warm Humanity
 * - Premium wellness clinic aesthetic with peptide therapy focus
 * - Color palette: Dark green (#1B5E3F), warm beige (#F5F1ED), soft gold (#D4A574)
 * - Typography: Playfair Display (headers), Inter (body)
 * - Emphasis on medical credibility, safety, and personalized approach
 */

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [selectedProgram, setSelectedProgram] = useState("Новый понедельник");
  const [submitted, setSubmitted] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  // Main programs
  const programs = [
    {
      id: 1,
      name: "Новый понедельник",
      subtitle: "безопасное начало программы снижения веса",
      description:
        "Первая ступень программы снижения веса. На этом этапе врач проводит диагностику, составляет индивидуальный план терапии, запускает процесс снижения веса и подготавливает организм к дальнейшей работе.",
      features: [
        "Консультация врача - назначение и оценка анализов, выявление причин набора веса и составление индивидуального плана терапии",
        "Пептидная терапия - 4 процедуры. Помогает контролировать аппетит, улучшает метаболизм и запускает процесс снижения веса",
        "Поддержка организма инфузионной терапией - восполнение дефицитов витаминов, микроэлементов и аминокислот",
        "Рекомендации по питанию и образу жизни. План, который поддерживает результат программы",
      ],
      results: ["Уходят первые 3-5 кг", "Уходит отечность", "Запускается метаболизм", "Начинается терапия"],
      duration: "4 недели (посещение 1 раз в неделю)",
      price: "от 65 000 ₽",
      pricePerWeek: "~ 16 250 ₽ в неделю",
    },
    {
      id: 2,
      name: "Интенсив",
      subtitle: "усиление терапии",
      description:
        "На этом этапе усиливается терапия, корректируются дозировки препаратов и подключаются дополнительные методы поддержки организма.",
      features: [
        "Персональное сопровождение врача - регулярные консультации и корректировка терапии",
        "Пептидная терапия с увеличением дозировок - усиление эффекта снижения веса и контроля аппетита",
        "Курс инфузионной терапии для восполнения дефицитов - витамины, микроэлементы и аминокислоты",
        "Бустеры метаболизма - препараты, усиливающие эффективность программы",
      ],
      results: ["Активное снижение веса", "Уменьшение объёмов", "Стабилизация аппетита", "Восполнение дефицитов"],
      duration: "1 цикл программы — 4 недели (посещение 1 раз в неделю). Большинство пациентов проходят 1–3 цикла программы.",
      price: "от 89 600 ₽",
      pricePerWeek: "",
    },
    {
      id: 3,
      name: "Стабилизация результата",
      subtitle: "",
      description:
        "Этап, который помогает закрепить достигнутый вес и не откатиться назад. Поддерживающие капельницы, контроль врача и мягкая коррекция образа жизни.",
      features: [
        "Регулярные консультации и контроль динамики, корректировка рекомендаций и поддержка на этапе закрепления",
        "Поддерживающая пептидная терапия с уменьшением дозировки",
        "Поддерживающие капельницы для метаболизма, поддержку обмена веществ, общее укрепление организма и восполнение энергии",
        "Рекомендации по питанию и режиму для удержания веса - формирование устойчивых привычек, которые помогают сохранить результат после завершения программы",
        "Посещение 1 раз в неделю (этап на 4 недели)",
      ],
      results: ["Закрепление веса", "Удержание результата"],
      duration: "4 недели (посещение 1 раз в неделю). Количество циклов подбирается врачом.",
      price: "от 52 000 ₽",
      pricePerWeek: "",
    },
  ];

  // Additional services
  const additionalServices = [
    {
      category: "Метаболизм и похудение",
      items: [
        {
          name: "Метаболическая поддержка",
          price: "13 000 ₽",
          description:
            "Запуск активного жиросжигания и ускорение метаболизма. Улучшает работу печени, усиливает расщепление жиров и повышает уровень энергии — логичное дополнение к любой программе снижения веса.",
        },
        {
          name: "Экспресс-похудение",
          price: "11 000 ₽",
          description:
            "Интенсивная капельница для быстрого запуска снижения веса. Помогает активировать процессы жиросжигания, уменьшить объёмы и чувствовать лёгкость в теле.",
        },
      ],
    },
    {
      category: "Детокс и очищение",
      items: [
        {
          name: "Детокс-капельница",
          price: "12 000 ₽",
          description:
            "Очищение организма от токсинов, улучшение работы печени и почек. Помогает восстановить энергию и подготовить организм к активному снижению веса.",
        },
        {
          name: "Печеночная поддержка",
          price: "11 500 ₽",
          description:
            "Специальная композиция для восстановления функции печени. Особенно полезна при интенсивном снижении веса и метаболических нарушениях.",
        },
      ],
    },
    {
      category: "Восполнение дефицитов",
      items: [
        {
          name: "Витаминный коктейль",
          price: "9 000 ₽",
          description:
            "Комплекс витаминов группы B, C и микроэлементов для восстановления энергии, улучшения кожи и волос во время программы снижения веса.",
        },
        {
          name: "Железо + витамины",
          price: "10 500 ₽",
          description:
            "Восполнение дефицита железа и витаминов при анемии. Улучшает самочувствие, избавляет от усталости и слабости.",
        },
      ],
    },
    {
      category: "Красота и кожа",
      items: [
        {
          name: "Коллаген + витамины",
          price: "13 500 ₽",
          description:
            "Улучшение качества кожи, упругости и сияния. Помогает избежать обвисания кожи при активном снижении веса и способствует её восстановлению.",
        },
        {
          name: "Биотин + микроэлементы",
          price: "11 000 ₽",
          description:
            "Укрепление волос, ногтей и улучшение состояния кожи. Особенно рекомендуется во время программ похудения для сохранения красоты.",
        },
      ],
    },
    {
      category: "Энергия и выносливость",
      items: [
        {
          name: "Энергия и тонус",
          price: "12 000 ₽",
          description:
            "Восстановление энергии, повышение выносливости и умственной активности. Идеально для активных людей, которые занимаются спортом во время программы.",
        },
        {
          name: "Спортивная поддержка",
          price: "13 000 ₽",
          description:
            "Комплекс для восстановления после тренировок, улучшения мышечного тонуса и ускорения метаболизма. Дополняет любую программу похудения.",
        },
      ],
    },
    {
      category: "Сон и восстановление",
      items: [
        {
          name: "Сон и релакс",
          price: "11 500 ₽",
          description:
            "Улучшение качества сна, снижение стресса и восстановление нервной системы. Качественный сон — основа успешного похудения.",
        },
        {
          name: "Антистресс",
          price: "10 500 ₽",
          description:
            "Снижение уровня кортизола, улучшение настроения и эмоционального состояния. Помогает справиться со стрессом во время программы.",
        },
      ],
    },
    {
      category: "Мозг и концентрация",
      items: [
        {
          name: "Ясный ум",
          price: "13 500 ₽",
          description:
            "Улучшает когнитивные функции, помогает справиться с интенсивной умственной нагрузкой и повысить мозговую активность.",
        },
        {
          name: "Супер IQ",
          price: "12 500 ₽",
          description:
            "Интеллектуальная капельница для ясности мышления, устойчивой концентрации и когнитивной поддержки.",
        },
      ],
    },
  ];

  // FAQ items
  const faqItems = [
    {
      question: "Нужно ли сдавать анализы?",
      answer:
        "Да. Программа составляется врачом на основе анализов и состояния организма.",
    },
    {
      question: "Безопасны ли препараты?",
      answer:
        "Да. Мы используем современные препараты и терапию, применяемые в эндокринологической практике.",
    },
    {
      question: "Сколько можно похудеть?",
      answer:
        "В среднем пациенты теряют от 6 до 15 кг за курс программы.",
    },
    {
      question: "Вернётся ли вес?",
      answer:
        "Для этого существует этап стабилизации — он помогает закрепить результат.",
    },
    {
      question: "Можно ли совмещать программы с спортом?",
      answer:
        "Конечно! Физическая активность хорошо дополняет программы похудения. Врач даст вам рекомендации по интенсивности и типу нагрузок.",
    },
    {
      question: "Поможет ли, если я уже пробовал/пробовала диеты?",
      answer:
        "Да, наш подход отличается от диет. Мы работаем с причинами, а не с симптомами. Пептидная терапия и инфузионная терапия помогают нормализовать метаболизм и аппетит, что часто не удаётся диетами.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/YmfaYcSJobutlROw.jpg" alt="Понедельник клиника" className="h-10 w-10 object-contain" />
            <span className="text-lg sm:text-xl font-bold text-primary font-display hidden sm:inline">Понедельник</span>
          </div>
          <div className="hidden md:flex gap-4 lg:gap-6 text-xs lg:text-sm">
            <a href="#approach" className="text-foreground hover:text-primary transition-colors">
              Наш подход
            </a>
            <a href="#suitable" className="text-foreground hover:text-primary transition-colors">
              Кому подойдет
            </a>
            <a href="#programs" className="text-foreground hover:text-primary transition-colors">
              Программы
            </a>
            <a href="#results" className="text-foreground hover:text-primary transition-colors">
              Результаты
            </a>
            <a href="#contacts" className="text-foreground hover:text-primary transition-colors">
              Контакты
            </a>
          </div>
          <div className="flex gap-1 sm:gap-2">
            <button className="hidden sm:block px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 text-xs font-semibold transition-colors">
              Подобрать программу
            </button>
            <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-xs font-semibold transition-colors">
              Записаться
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663096993096/hdtQvaxiWb9W7weDTCV6tP/iv-therapy-procedure-HrfhGSzZrzp7Ymjgf9SXUg.webp')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="container relative z-10 max-w-3xl">
          <div className="mb-8">
            <p className="text-lg sm:text-xl text-white font-semibold mb-2">Ваш новый понедельник начинается здесь</p>
            <p className="text-base sm:text-lg text-white/90">Начните свой новый понедельник — без лишнего веса</p>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 font-display leading-tight">
            Клиника снижения веса на новейших препаратах под контролем врачей без жёстких диет и откатов
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Диагностика, пептидная терапия и восполнение дефицитов с клинически протестированными протоколами инфузионной терапии и питания
          </p>

          {/* UTP Block */}
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-12">
            <div className="bg-white/95 p-3 sm:p-4 rounded-lg">
              <div className="flex gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                  ✓
                </div>
                <p className="text-xs sm:text-sm text-foreground">
                  Программы похудения и современные препараты под контролем врача-эндокринолога по вашим анализам
                </p>
              </div>
            </div>
            <div className="bg-white/95 p-3 sm:p-4 rounded-lg">
              <div className="flex gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                  ✓
                </div>
                <p className="text-xs sm:text-sm text-foreground">
                  Пептидная терапия и современные препараты для контроля аппетита
                </p>
              </div>
            </div>
            <div className="bg-white/95 p-3 sm:p-4 rounded-lg">
              <div className="flex gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                  ✓
                </div>
                <p className="text-xs sm:text-sm text-foreground">
                  Восполнение дефицитов витаминов и микроэлементов
                </p>
              </div>
            </div>
            <div className="bg-white/95 p-3 sm:p-4 rounded-lg">
              <div className="flex gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                  ✓
                </div>
                <p className="text-xs sm:text-sm text-foreground">
                  Лечение причин набора веса, а не временные диеты
                </p>
              </div>
            </div>
          </div>

          {/* Additional info */}
          <p className="text-white/80 text-xs sm:text-sm mb-6 sm:mb-8 italic">
            Многие пациенты приходят к нам после того, как слышали о препаратах семаглутида и тирзепатида (Оземпик, Мунжаро и аналоги).
            <br className="hidden sm:block" />
            Мы подбираем терапию индивидуально — с учётом анализов, состояния организма и целей пациента.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors">
              Подобрать программу
            </button>
            <button className="px-6 py-3 border-2 border-white text-white hover:bg-white/10 rounded-lg font-semibold transition-colors">
              Записаться
            </button>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" className="py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-4 font-display text-primary">
            Наш подход к похудению
          </h2>
          <p className="text-center text-foreground mb-12">
            В клинике «Понедельник» мы используем современные медицинские методы управления весом, которые применяются в мировой эндокринологической практике и используем поэтапный медицинский протокол снижения веса. Каждый этап протокола решает свою задачу.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 font-display text-primary">Протокол может включать:</h3>
              <ul className="space-y-3">
                {[
                  "Пептидную терапию",
                  "Препараты для контроля аппетита и метаболизма",
                  "Работу с инсулинорезистентностью",
                  "Регулирование уровня сахара в крови",
                  "Коррекцию питания",
                  "Восполнение дефицитов витаминов и микроэлементов",
                  "Инфузионную терапию",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-foreground mt-6 italic">
                Все назначения проводятся только после консультации врача и анализа состояния организма.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 font-display text-primary">Почему не работают диеты</h3>
              <p className="text-foreground mb-4">
                Большинство диет не учитывают:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Гормональный фон",
                  "Инсулинорезистентность",
                  "Дефициты витаминов",
                  "Состояние метаболизма",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground mb-4">Поэтому вес часто возвращается.</p>
              <p className="text-foreground font-semibold">
                В клинике «Понедельник» мы работаем с причинами набора веса, а не только с симптомом.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Suitable Section */}
      <section id="suitable" className="py-16 bg-background">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-4 font-display text-primary">
            Кому подойдёт программа снижения веса
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 font-display text-primary">
                Наша программа подойдёт вам, если:
              </h3>
              <ul className="space-y-3">
                {[
                  "Вы пробовали диеты, но вес возвращается",
                  "Чувствуете постоянный голод и сложно контролировать аппетит",
                  "Вес стоит на месте, несмотря на питание и спорт",
                  "Есть отеки, тяжесть и ощущение замедленного метаболизма",
                  "Хотите снизить вес без жёстких диет и стресса для организма",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 font-display text-primary">
                Особенно программа может быть полезна, если у вас:
              </h3>
              <ul className="space-y-3">
                {[
                  "Инсулинорезистентность",
                  "Преддиабет",
                  "Гормональные изменения",
                  "Хроническая усталость",
                  "Дефициты витаминов и микроэлементов",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4 font-display text-primary">
            Программа похудения
          </h2>
          <p className="text-center text-foreground mb-12 max-w-2xl mx-auto">
            Выберите программу, которая соответствует вашим целям и возможностям
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {programs.map((program) => (
              <div key={program.id} className="bg-background rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold mb-2 font-display text-primary">{program.name}</h3>
                {program.subtitle && (
                  <p className="text-sm text-foreground/70 mb-4 italic">{program.subtitle}</p>
                )}
                <p className="text-foreground mb-6 text-sm">{program.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Что внутри:</h4>
                  <ul className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-foreground flex gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6 p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3">На этом этапе:</h4>
                  <ul className="space-y-2">
                    {program.results.map((result, idx) => (
                      <li key={idx} className="text-sm text-foreground flex gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6 pb-6 border-b border-border">
                  <p className="text-sm text-foreground/70 mb-2">
                    <span className="font-semibold">Длительность:</span> {program.duration}
                  </p>
                  <p className="text-2xl font-bold text-primary">{program.price}</p>
                  {program.pricePerWeek && (
                    <p className="text-sm text-foreground/70">{program.pricePerWeek}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <button className="w-full px-4 py-2 text-sm text-foreground border border-border rounded-lg hover:bg-background transition-colors">
                    Подробнее
                  </button>
                  <button className="w-full px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    Записаться
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4 font-display text-primary">
            Дополнительные услуги
          </h2>
          <p className="text-center text-foreground mb-12 max-w-2xl mx-auto">
            Дополните вашу программу специализированными капельницами для достижения лучших результатов
          </p>

          <div className="space-y-12">
            {additionalServices.map((service, idx) => (
              <div key={idx}>
                <h3 className="text-2xl font-bold mb-6 font-display text-primary">{service.category}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {service.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="bg-white p-6 rounded-lg border border-border">
                      <h4 className="text-lg font-bold text-foreground mb-2">{item.name}</h4>
                      <p className="text-primary font-bold text-lg mb-3">{item.price}</p>
                      <p className="text-sm text-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4 font-display text-primary">
            Как это работает
          </h2>
          <p className="text-center text-foreground mb-12 max-w-2xl mx-auto">
            Простой и понятный процесс, который помогает вам достичь результатов
          </p>

          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              "Первичная консультация и диагностика (сдача анализов, оценка состояния)",
              "Check-up (анализы крови, оценка гормонального и метаболического статуса)",
              "Подбор индивидуальной программы похудения (капельницы + питание + режим)",
              "Прохождение процедур в клинике (мягкие кресла, чай, музыка, 30–90 минут)",
              "Посещение 1 раз в неделю",
              "Контрольные визиты, корректировка программы",
            ].map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0 text-sm">
                  {idx + 1}
                </div>
                <div className="flex items-center">
                  <p className="text-foreground">{step}</p>
                </div>
              </div>
            ))}
          </div>

          {/* IV Benefits */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 mt-12">
            <div className="bg-background p-6 rounded-lg border border-border">
              <h3 className="text-xl font-bold text-primary mb-4 font-display">Преимущества инфузионного введения</h3>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Полезные вещества попадают сразу в кровь, минуя ЖКТ, усвоение близко к 100%</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Эффект чувствуете уже в первые минуты/часы после процедуры</span>
                </li>
              </ul>
            </div>

            <div className="bg-background p-6 rounded-lg border border-border">
              <h3 className="text-xl font-bold text-primary mb-4 font-display">Комфорт и безопасность</h3>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Мягкие кресла с реклайнером</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Чай/кофе, спокойная музыка</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Процедуры под постоянным наблюдением медперсонала</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Состав и дозировки подбирает врач по анализам и анамнезу</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-16 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4 font-display text-primary">
            Результаты пациентов
          </h2>
          <p className="text-center text-foreground mb-12 max-w-2xl mx-auto">
            За курс программы пациенты обычно достигают:
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-8">
            <div className="bg-white p-6 rounded-lg border border-border">
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Снижение веса на 6–30 кг</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Уменьшение объёмов</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg border border-border">
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Снижение аппетита</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Улучшение самочувствия</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="rounded-lg overflow-hidden h-96 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663096993096/hdtQvaxiWb9W7weDTCV6tP/wellness-results-CCDrWAnx4WMRuRR4bDSn54.webp')",
            }}
          ></div>

          <p className="text-center text-sm text-foreground/70 mt-6 italic">
            *результаты индивидуальны
          </p>
        </div>
      </section>

      {/* Patient Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-4 font-display text-primary">
            Поговорите с человеком, который уже похудел именно на нашей программе
          </h2>
          <p className="text-center text-foreground mb-12">
            Оставьте контакты — мы назначим вам разговор с нашим пациентом, который прошел тот же курс, что вы рассматриваете. Бесплатно и без обязательств.
          </p>

          <div className="bg-background rounded-lg p-8 shadow-md">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Ваше имя *</label>
                <input
                  type="text"
                  placeholder="Имя"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Телефон *</label>
                <input
                  type="tel"
                  placeholder="+7 (999) 999-99-99"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors"
              >
                Отправить заявку на связь
              </button>
              {submitted && (
                <p className="text-center text-primary text-sm">Спасибо! Мы свяжемся с вами в ближайшее время.</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-4 font-display text-primary">
            Ответы на вопросы
          </h2>
          <p className="text-center text-foreground mb-12">
            Всё, что вам нужно знать о программах похудения
          </p>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-background transition-colors"
                >
                  <h3 className="font-semibold text-foreground text-left">{item.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                      expandedFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 py-4 bg-background border-t border-border">
                    <p className="text-foreground">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-4 font-display text-primary">
            Получить консультацию врача
          </h2>
          <p className="text-center text-foreground mb-12">
            Оставьте контакты и выберите интересующую вас программу — врач свяжется с вами в течение часа
          </p>

          <div className="bg-background rounded-lg p-8 shadow-md">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Ваше имя *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Телефон *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+7 (999) 999-99-99"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Интересующая программа</label>
                <select
                  name="program"
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Новый понедельник</option>
                  <option>Интенсив</option>
                  <option>Стабилизация результата</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors"
              >
                Получить консультацию
              </button>
              {submitted && (
                <p className="text-center text-primary text-sm">Спасибо! Врач свяжется с вами в ближайшее время.</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12 font-display text-primary">Контакты</h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-6 font-display text-primary">Адрес клиники</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Адрес</p>
                    <p className="text-foreground">г. Москва, ул. Адмирала Макарова 6А</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">График работы</p>
                    <p className="text-foreground">Ежедневно с 9:00 до 21:00</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Телефон</p>
                    <p className="text-foreground">+7 (999) 999-99-99</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-foreground">info@ponedelnik.clinic</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 font-display text-primary">Как добраться</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-foreground mb-2">Метро</p>
                  <p className="text-foreground">
                    Ближайшие станции: Парк культуры, Смоленская (5–10 минут пешком)
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-2">Парковка</p>
                  <p className="text-foreground">
                    Бесплатная парковка на территории клиники для пациентов
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-white border-opacity-20">
            <div className="flex items-center gap-3">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/YmfaYcSJobutlROw.jpg" alt="Понедельник клиника" className="h-12 w-12 object-contain rounded" />
              <div>
                <p className="font-bold text-lg">Понедельник</p>
                <p className="text-sm opacity-75">Клиника медицинского снижения веса</p>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <p className="font-semibold">+7 (999) 999-99-99</p>
              <p className="text-sm opacity-75">info@ponedelnik.clinic</p>
            </div>
          </div>
          <div className="text-center">
            <p className="mb-2">© 2024 Клиника медицинского снижения веса «Понедельник»</p>
            <p className="text-sm opacity-75">
              Все права защищены. Информация на сайте не является публичной офертой.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
