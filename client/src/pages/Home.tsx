import { Button } from "@/components/ui/button";
import { ChevronDown, Check, X, MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";

/**
 * Design Philosophy: Medical Minimalism with Warm Humanity
 * - Premium wellness clinic aesthetic with IV therapy focus
 * - Color palette: Dark green (#1B5E3F), warm beige (#F5F1ED), soft gold (#D4A574)
 * - Typography: Playfair Display (headers), Inter (body)
 * - Emphasis on medical credibility, safety, and personalized approach
 */

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      name: "Старт",
      subtitle: "запуск программы похудения",
      description:
        "Первая ступень, чтобы безопасно войти в процесс снижения веса. Персональная консультация, базовая диагностика и стартовый курс, который мягко разгружает организм и подготавливает к более глубокой трансформации.",
      features: [
        "Персональная и корректирующая консультация врача",
        "Подбор iv‑терапии и плана по снижению веса",
        "Рекомендации по питанию и образу жизни",
      ],
      duration: "Индивидуально, стартовый курс",
      price: "65 000 ₽",
    },
    {
      id: 2,
      name: "Основная программа трансформации",
      description:
        "Главная программа для заметного снижения веса и изменения самочувствия. Глубокая работа с метаболизмом, аппетитом и привычками под постоянным контролем врача.",
      features: [
        "Персональные и промежуточные консультации врача",
        "Курс капельниц для жиросжигания, детокса и энергии",
        "Подбор плана питания и режима под ваш ритм жизни",
        "Коррекция программы по ходу курса",
      ],
      duration: "Курс из нескольких этапов",
      price: "98 000 ₽",
    },
    {
      id: 3,
      name: "Поддержка и стабилизация",
      subtitle: "результата",
      description:
        "Этап, который помогает закрепить достигнутый вес и не откатиться назад. Поддерживающие капельницы, контроль врача и мягкая коррекция образа жизни.",
      features: [
        "Персональные и корректирующие консультации врача",
        "Поддерживающие капельницы для метаболизма и энергии",
        "Рекомендации по питанию и режиму для удержания веса",
      ],
      duration: "Курс поддерживающих визитов",
      price: "52 000 ₽",
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
            "Запуск активного жиросжигания и ускорение метаболизма. Улучшает работу печени, усиливает расщепление жиров и повышает уровень энергии.",
        },
        {
          name: "Экспресс‑похудение",
          price: "11 000 ₽",
          description:
            "Интенсивная капельница для быстрого запуска снижения веса. Помогает активировать процессы жиросжигания, уменьшить объёмы.",
        },
        {
          name: "Антиинсулинорезистентность",
          price: "11 000 ₽",
          description:
            "Нормализация углеводного обмена и чувствительности к инсулину. Стабилизирует уровень глюкозы в крови.",
        },
        {
          name: "Метаболическая активация",
          price: "11 000 ₽",
          description:
            "Насыщает клетки энергией, повышает выносливость и увеличивает сжигание жиров организмом.",
        },
      ],
    },
    {
      category: "Детокс и восстановление",
      items: [
        {
          name: "Экспресс детокс",
          price: "12 000 ₽",
          description:
            "Быстрое и качественное очищение организма от токсинов. Помогает снять чувство тяжести и вернуть комфорт в теле.",
        },
        {
          name: "AfterParty",
          price: "15 000 ₽",
          description:
            "Восстановительная капельница после интоксикаций. Улучшает работу печени, возвращает энергию и ясность ума.",
        },
        {
          name: "Супер детокс",
          price: "17 000 ₽",
          description:
            "Комплексное очищение организма на всех уровнях и восстановление клеток.",
        },
        {
          name: "Витаминная",
          price: "15 000 ₽",
          description:
            "Комплексная поддержка печени и детоксикации за счёт витаминов.",
        },
      ],
    },
    {
      category: "Восполнение дефицитов",
      items: [
        {
          name: "Восполнение железа",
          price: "9 000 ₽",
          description:
            "Восстановление уровня железа и профилактика анемии. Снижает усталость, улучшает концентрацию.",
        },
        {
          name: "Витаминная (B, C, D)",
          price: "12 000 ₽",
          description:
            "Комплексное насыщение организма витаминами. Поддержка иммунитета и обмена веществ.",
        },
        {
          name: "Минеральная",
          price: "11 000 ₽",
          description:
            "Восстановление минерального баланса и устранение обезвоживания.",
        },
        {
          name: "Протеиновая",
          price: "13 000 ₽",
          description:
            "Восполняет дефицит белка, делает кожу более упругой, ногти крепкими.",
        },
      ],
    },
    {
      category: "Красота и сосуды",
      items: [
        {
          name: "Восстановление волос",
          price: "13 000 ₽",
          description:
            "Поддержка роста и укрепление волос изнутри. Снижает ломкость и выпадение.",
        },
        {
          name: "Сияющая кожа",
          price: "16 000 ₽",
          description:
            "Придаёт коже сияние, уменьшает пигментацию и повышает упругость.",
        },
        {
          name: "Поддержка сосудов",
          price: "13 000 ₽",
          description:
            "Комплекс для микроциркуляции и сосудистого тонуса. Улучшает кровоснабжение тканей.",
        },
        {
          name: "Золушка",
          price: "10 000 ₽",
          description:
            "Комплекс антиоксидантов для молодости и красоты. Помогает коже выглядеть свежей.",
        },
      ],
    },
    {
      category: "Энергия и спорт",
      items: [
        {
          name: "Заряд энергии",
          price: "13 000 ₽",
          description:
            "Помогает эффективно восстановиться и вернуть силы для новых задач.",
        },
        {
          name: "Энерго+",
          price: "11 000 ₽",
          description:
            "Повышает уровень энергии, улучшает переносимость нагрузок.",
        },
        {
          name: "Миланский коктейль",
          price: "15 000 ₽",
          description:
            "Повышает выносливость, силовые показатели и эффективность тренировок.",
        },
      ],
    },
    {
      category: "Омоложение, стресс и сон",
      items: [
        {
          name: "Antiage",
          price: "21 000 ₽",
          description:
            "Омоложение на клеточном уровне. Поддержка кожи, тканей и общего тонуса организма.",
        },
        {
          name: "NAD+ 2.0",
          price: "20 000 ₽",
          description:
            "Усиленная капельница клеточного восстановления. Энергия, концентрация и мощная анти‑эйдж поддержка.",
        },
        {
          name: "Антистресс",
          price: "16 000 ₽",
          description:
            "Помогает восстановиться после длительного стресса и справиться с тревожностью.",
        },
        {
          name: "Здоровый сон",
          price: "11 500 ₽",
          description:
            "Снимает нервное напряжение, помогает быстро заснуть и проснуться полным сил.",
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
            "Улучшает когнитивные функции, помогает справиться с интенсивной умственной нагрузкой.",
        },
        {
          name: "Супер IQ",
          price: "12 500 ₽",
          description:
            "Интеллектуальная капельница для ясности мышления и устойчивой концентрации.",
        },
      ],
    },
  ];

  // FAQ items
  const faqItems = [
    {
      question: "Насколько это безопасно?",
      answer:
        "Все процедуры проводятся под контролем опытных врачей. Состав и дозировки подбираются индивидуально по результатам анализов. Мы используем только проверенные и безопасные компоненты.",
    },
    {
      question: "Обязательно ли сдавать анализы?",
      answer:
        "Да, анализы — это основа для подбора правильной программы. Они помогают врачу понять ваш метаболический статус и выбрать оптимальный состав капельницы.",
    },
    {
      question: "Можно ли совмещать программы с спортом?",
      answer:
        "Конечно! Физическая активность хорошо дополняет программы похудения. Врач даст вам рекомендации по интенсивности и типу нагрузок.",
    },
    {
      question: "Сколько процедур нужно для результата?",
      answer:
        "Это зависит от ваших целей и исходного состояния. Обычно первые результаты видны уже после 3–5 процедур. Полный курс подбирается индивидуально.",
    },
    {
      question: "Поможет ли, если я уже пробовал/пробовала диеты?",
      answer:
        "Да, наш подход отличается от диет. Мы работаем с причинами, а не с симптомами. IV-терапия помогает нормализовать метаболизм и аппетит, что часто не удаётся диетами.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="text-xl font-bold text-primary">Понедельник</div>
          <div className="hidden md:flex gap-8">
            <a href="#programs" className="text-sm text-foreground hover:text-primary">
              Программы
            </a>
            <a href="#how-it-works" className="text-sm text-foreground hover:text-primary">
              Как это работает
            </a>
            <a href="#doctors" className="text-sm text-foreground hover:text-primary">
              Врачи
            </a>
            <a href="#results" className="text-sm text-foreground hover:text-primary">
              Результаты
            </a>
            <a href="#faq" className="text-sm text-foreground hover:text-primary">
              Вопросы
            </a>
            <a href="#contacts" className="text-sm text-foreground hover:text-primary">
              Контакты
            </a>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              Подобрать программу
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Записаться
            </Button>
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
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-display">
            Похудение с врачами, а не диетами
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Инфузионные капельницы, check‑up и питание по анализам — безопасный путь к минус
            сантиметрам и килограммам
          </p>

          {/* UTP Block */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <div className="bg-white/95 p-4 rounded-lg">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                  ✓
                </div>
                <p className="text-sm text-foreground">
                  Медицинский подход к снижению веса, а не модные диеты
                </p>
              </div>
            </div>
            <div className="bg-white/95 p-4 rounded-lg">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                  ✓
                </div>
                <p className="text-sm text-foreground">
                  Капельницы, которые работают точечно по причинам набора веса
                </p>
              </div>
            </div>
            <div className="bg-white/95 p-4 rounded-lg">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                  ✓
                </div>
                <p className="text-sm text-foreground">
                  Check-up, чтобы не навредить здоровью и усилить результат
                </p>
              </div>
            </div>
            <div className="bg-white/95 p-4 rounded-lg">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                  ✓
                </div>
                <p className="text-sm text-foreground">
                  Процедуры без боли и стресса: просто прилечь и расслабиться
                </p>
              </div>
            </div>
          </div>

          {/* Hero Form */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <p className="text-sm text-muted-foreground mb-4">
              Оставьте контакты — подберём программу похудения за 5 минут. Первая консультация врача
              — в подарок.
            </p>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
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
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                Получить программу
              </Button>
            </form>
            {submitted && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                ✓ Ваша заявка принята! Мы свяжемся с вами в течение 5 минут.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4 font-display text-primary">
            Наш подход к похудению
          </h2>
          <div className="max-w-3xl mx-auto bg-accent/30 p-8 rounded-lg">
            <p className="text-lg text-foreground mb-4 leading-relaxed">
              Мы работаем не с диетами, а с истинными причинами лишнего веса — через iv‑терапию,
              интегративный и превентивный подход. Капельницы помогают мягко снижать вес, убирать
              тягу к еде, очищать организм, выравнивать гормональный фон и возвращать энергию.
            </p>
            <p className="text-foreground leading-relaxed">
              <strong>Фокус направлений:</strong> уменьшение жировой прослойки, управление
              аппетитом, детокс и восстановление после срывов и хронического стресса, поддержка
              работы щитовидной железы и гормонов, защита кожи во время похудения.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12 font-display text-primary">
            Программы похудения
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {programs.map((program) => (
              <div key={program.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6 border-b border-border">
                  <h3 className="text-2xl font-bold text-primary mb-2 font-display">{program.name}</h3>
                  {program.subtitle && (
                    <p className="text-sm text-muted-foreground">{program.subtitle}</p>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-sm text-foreground mb-4">{program.description}</p>
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-primary mb-3">Что внутри:</p>
                    <ul className="space-y-2">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-foreground">
                          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-border pt-4 mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Длительность:</p>
                    <p className="text-sm font-semibold text-foreground mb-3">{program.duration}</p>
                    <p className="text-2xl font-bold text-primary">от {program.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Подробнее
                    </Button>
                    <Button className="flex-1 bg-primary hover:bg-primary/90">
                      Записаться
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Services Note */}
          <div className="bg-accent/20 p-6 rounded-lg mb-12">
            <p className="text-center text-foreground">
              <strong>Разовая консультация врача</strong> — 5 000 ₽ | <strong>Набор анализов + iv‑терапия</strong> — 24 000 ₽
            </p>
          </div>

          {/* Additional Services */}
          <div className="mb-12">
            <p className="text-center text-foreground mb-8">
              Капельницы можно подключать к основным программам похудения как усиление эффекта или
              проходить отдельными курсами. Ниже — дополнительные направления: метаболизм, детокс,
              иммунитет, красота, энергия, сон, стресс и когнитивная продуктивность.
            </p>

            {additionalServices.map((serviceGroup, groupIdx) => (
              <div key={groupIdx} className="mb-12">
                <h3 className="text-2xl font-bold text-primary mb-6 font-display">
                  {serviceGroup.category}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {serviceGroup.items.map((item, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg border border-border hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-foreground mb-1">{item.name}</h4>
                      <p className="text-primary font-bold text-lg mb-3">{item.price}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12 font-display text-primary">
            Как проходят процедуры
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4 mb-12">
              {[
                "Онлайн-заявка или звонок",
                "Консультация врача (оффлайн/онлайн), сбор анамнеза, назначение анализов",
                "Check-up (анализы крови, оценка гормонального и метаболического статуса)",
                "Подбор индивидуальной программы похудения (капельницы + питание + режим)",
                "Прохождение процедур в клинике (мягкие кресла, чай, музыка, 30–90 минут)",
                "Контрольные визиты, корректировка программы",
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex items-center">
                    <p className="text-foreground">{step}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* IV Benefits */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div
                className="rounded-lg p-8 text-white"
                style={{
                  backgroundImage:
                    "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663096993096/hdtQvaxiWb9W7weDTCV6tP/doctor-consultation-NkoBpyY75JQTKVbprpHfXZ.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="bg-black/50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 font-display">Преимущества IV-введения</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-2">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span>Полезные вещества попадают сразу в кровь, минуя ЖКТ, усвоение близко к 100%</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span>Эффект чувствуете уже в первые минуты/часы после процедуры</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div
                className="rounded-lg p-8 text-white"
                style={{
                  backgroundImage:
                    "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663096993096/hdtQvaxiWb9W7weDTCV6tP/clinic-reception-jmJdCtFncFimLXSjfDkaXj.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="bg-black/50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 font-display">Комфорт и безопасность</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-2">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span>Мягкие кресла с реклайнером</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span>Чай/кофе, спокойная музыка, возможность работать с ноутбуком</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span>Процедуры под постоянным наблюдением медперсонала</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span>Состав и дозировки подбирает врач по анализам и анамнезу</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-16 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4 font-display text-primary">
            Результаты до/после
          </h2>
          <p className="text-center text-foreground mb-12 max-w-2xl mx-auto">
            За время работы нашу методику похудения опробовали люди разных возрастов и запросов —
            вот их результаты
          </p>
          <div
            className="rounded-lg overflow-hidden h-96 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663096993096/hdtQvaxiWb9W7weDTCV6tP/wellness-results-CCDrWAnx4WMRuRR4bDSn54.webp')",
            }}
          ></div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-12 font-display text-primary">
            Частые вопросы
          </h2>
          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <div key={idx} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-4 flex items-center justify-between hover:bg-accent/10 transition-colors text-left"
                >
                  <span className="font-semibold text-foreground">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform ${
                      expandedFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="p-4 bg-accent/5 border-t border-border">
                    <p className="text-foreground text-sm leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-4 font-display">
            Остались вопросы по программам похудения?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Получите консультацию специалиста. Первая консультация врача — бесплатно. Подберём
            программу под ваши анализы и образ жизни.
          </p>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full px-4 py-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <input
              type="tel"
              placeholder="+7 (999) 999-99-99"
              className="w-full px-4 py-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <Button type="submit" variant="outline" className="w-full">
              Получить консультацию
            </Button>
          </form>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12 font-display text-primary">
            Контакты
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 font-display text-primary">Адрес клиники</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">г. Москва</p>
                    <p className="text-foreground">ул. Адмирала Макарова 6А</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">График работы</p>
                    <p className="text-foreground">Ежедневно с 8:00 до 21:00</p>
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
        <div className="container text-center">
          <p className="mb-2">© 2024 Клиника медицинского снижения веса «Понедельник»</p>
          <p className="text-sm opacity-75">
            Все права защищены. Информация на сайте не является публичной офертой.
          </p>
        </div>
      </footer>
    </div>
  );
}
