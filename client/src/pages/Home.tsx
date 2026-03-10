import { Button } from "@/components/ui/button";
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
  const [selectedProgram, setSelectedProgram] = useState("Старт");
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
      name: "Старт",
      subtitle: "безопасное начало программы снижения веса",
      description:
        "Первая ступень программы снижения веса. На этом этапе врач проводит диагностику, составляет индивидуальный план терапии, запускает процесс снижения веса и подготавливает организм к дальнейшей работе.",
      features: [
        "Консультация врача - назначение и оценка анализов, выявление причин набора веса и составление индивидуального плана терапии",
        "Пептидная терапия - 4 процедуры. Помогает контролировать аппетит, улучшает метаболизм и запускает процесс снижения веса",
        "Поддержка организма IV-терапией - восполнение дефицитов витаминов, микроэлементов и аминокислот",
        "Рекомендации по питанию и образу жизни. План, который поддерживает результат программы",
      ],
      results: ["Уходят первые 3-5 кг", "Уходит отечность", "Запускается метаболизм", "Начинается терапия"],
      duration: "4 недели",
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
        "Курс капельниц для восполнения дефицитов - витамины, микроэлементы и аминокислоты",
        "Бустеры метаболизма - препараты, усиливающие эффективность программы",
      ],
      results: ["Увеличиваются дозировки", "Восполняются дефициты", "Основное снижение веса"],
      duration: "1 цикл программы — 4 недели. Большинство пациентов проходят 1–3 цикла программы.",
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
      duration: "4 недели. Количество циклов подбирается врачом.",
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
        {
          name: "Антиинсулинорезистентность",
          price: "11 000 ₽",
          description:
            "Нормализация углеводного обмена и чувствительности к инсулину. Стабилизирует уровень глюкозы в крови и снижает тягу к сладкому — важный шаг при склонности к набору веса.",
        },
        {
          name: "Метаболическая активация",
          price: "11 000 ₽",
          description:
            "Насыщает клетки энергией, повышает выносливость и увеличивает сжигание жиров организмом. Подходит тем, кто хочет больше активности без чувства усталости.",
        },
        {
          name: "Антиотечный баланс",
          price: "11 000 ₽",
          description:
            "Мягкое выведение лишней жидкости и поддержка лимфодренажа. Снижает отёки, облегчает самочувствие и визуально уменьшает объёмы.",
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
            "Быстрое и качественное очищение организма от токсинов и продуктов обмена. Помогает снять чувство тяжести и вернуть комфорт в теле.",
        },
        {
          name: "AfterParty",
          price: "15 000 ₽",
          description:
            "Восстановительная капельница после интоксикаций и перегрузок. Улучшает работу печени, снижает симптомы интоксикации, возвращает энергию и ясность ума.",
        },
        {
          name: "Супер детокс",
          price: "17 000 ₽",
          description:
            "Комплексное очищение организма на всех уровнях и восстановление клеток. Подходит как усиление детокс-этапа в программах похудения.",
        },
        {
          name: "Витаминная",
          price: "15 000 ₽",
          description:
            "Комплексная поддержка печени и детоксикации за счёт витаминов. Помогает организму легче переносить изменения в питании и режимах.",
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
            "Восстановление уровня железа и профилактика анемии. Снижает усталость, улучшает концентрацию и общий уровень энергии — важно при изменении рациона.",
        },
        {
          name: "Витаминная (B, C, D)",
          price: "12 000 ₽",
          description:
            "Комплексное насыщение организма витаминами группы B, витамином C и витамином D. Поддержка иммунитета, нервной системы и обмена веществ.",
        },
        {
          name: "Минеральная",
          price: "11 000 ₽",
          description:
            "Восстановление минерального баланса и устранение обезвоживания. Поддерживает нервную систему, мышцы и сердечно-сосудистую систему.",
        },
        {
          name: "Протеиновая",
          price: "13 000 ₽",
          description:
            "Восполняет дефицит белка, делает кожу более упругой, ногти крепкими, а волосы — сияющими. Особенно актуально при снижении калорийности рациона.",
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
            "Поддержка роста и укрепление волос изнутри. Улучшает питание волосяных фолликулов, снижает ломкость и выпадение, увеличивает объём.",
        },
        {
          name: "Сияющая кожа",
          price: "16 000 ₽",
          description:
            "Придаёт коже сияние, уменьшает пигментацию и повышает упругость. Способствует выравниванию тона и улучшению тургора.",
        },
        {
          name: "Поддержка сосудов",
          price: "13 000 ₽",
          description:
            "Комплекс для микроциркуляции и сосудистого тонуса. Улучшает кровоснабжение тканей, поддерживает работу мозга и сердечно-сосудистой системы.",
        },
        {
          name: "Золушка",
          price: "10 000 ₽",
          description:
            "Комплекс антиоксидантов для молодости и красоты. Помогает коже выглядеть более свежей и отдохнувшей.",
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
            "Помогает эффективно восстановиться за короткий промежуток времени после длительной работы и вернуть силы для новых задач.",
        },
        {
          name: "Энерго+",
          price: "11 000 ₽",
          description:
            "Повышает уровень энергии, улучшает переносимость нагрузок и способствует восстановлению после стресса и переутомления.",
        },
        {
          name: "Миланский коктейль",
          price: "15 000 ₽",
          description:
            "Повышает выносливость, силовые показатели и эффективность тренировок. Хорошо сочетается с программами похудения при активном спорте.",
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
            "Омоложение на клеточном уровне. Поддержка кожи, тканей и общего тонуса организма в долгосрочной перспективе.",
        },
        {
          name: "NAD+ 2.0",
          price: "20 000 ₽",
          description:
            "Усиленная капельница клеточного восстановления. Энергия, концентрация и мощная анти-эйдж поддержка.",
        },
        {
          name: "Антистресс",
          price: "16 000 ₽",
          description:
            "Помогает восстановиться после длительного стресса, защитить нервную систему во время интенсивной работы и справиться с тревожностью.",
        },
        {
          name: "Здоровый сон",
          price: "11 500 ₽",
          description:
            "Снимает нервное напряжение и мышечные спазмы, помогает быстро заснуть, крепко спать всю ночь и проснуться полным сил.",
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
        "Да, наш подход отличается от диет. Мы работаем с причинами, а не с симптомами. Пептидная терапия и IV-терапия помогают нормализовать метаболизм и аппетит, что часто не удаётся диетами.",
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
            <Button variant="outline" size="sm" className="text-xs hidden sm:block">
              Подобрать программу
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-xs">
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 font-display leading-tight">
            Клиника снижения веса на новейших препаратах под контролем врачей без жёстких диет и откатов
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Диагностика, пептидная терапия и восполнение дефицитов с клинически протестированными протоколами IV-терапии и питания
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
                  Капельницы для снижения аппетита и ускорения метаболизма
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
            Часто пациенты приходят к нам после того, как слышали о препаратах: Озempик, Семаглютид
          </p>

          {/* Hero Form */}
          <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-lg">
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
              Оставьте контакты — подберём программу похудения за 5 минут. Первая консультация врача — в подарок.
            </p>
            <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
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
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white text-sm">
                Получить программу
              </Button>
            </form>
            {submitted && (
              <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-xs sm:text-sm">
                ✓ Ваша заявка принята! Мы свяжемся с вами в течение 5 минут.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section id="approach" className="py-12 sm:py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 font-display text-primary">
            Наш подход к похудению
          </h2>
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base md:text-lg text-foreground leading-relaxed">
              В клинике «Понедельник» мы используем современные медицинские методы управления весом, которые применяются в мировой эндокринологической практике и используем поэтапный медицинский протокол снижения веса. Каждый этап протокола решает свою задачу.
            </p>

            <div className="bg-accent/20 p-4 sm:p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4 font-display">Протокол может включать:</h3>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-foreground">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Пептидную терапию</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Препараты для контроля аппетита и метаболизма</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Работу с инсулинорезистентностью</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Регулирование уровня сахара в крови</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Коррекцию питания</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Восполнение дефицитов витаминов и микроэлементов</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>IV-терапию</span>
                </li>
              </ul>
            </div>

            <p className="text-foreground leading-relaxed italic">
              Все назначения проводятся только после консультации врача и анализа состояния организма.
            </p>

            <div className="border-l-4 border-primary pl-4 sm:pl-6 py-4">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4 font-display">Почему не работают диеты</h3>
              <p className="text-sm sm:text-base text-foreground mb-3 sm:mb-4">Большинство диет не учитывают:</p>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-foreground mb-4">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Гормональный фон</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Инсулинорезистентность</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Дефициты витаминов</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Состояние метаболизма</span>
                </li>
              </ul>
              <p className="text-sm sm:text-base text-foreground font-semibold mb-3 sm:mb-4">Поэтому вес часто возвращается.</p>
              <p className="text-sm sm:text-base text-foreground">
                <strong>В клинике «Понедельник» мы работаем с причинами набора веса, а не только с симптомом.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Suitable For Section */}
      <section id="suitable" className="py-12 sm:py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 font-display text-primary">
            Кому подойдёт программа снижения веса
          </h2>
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4 font-display">Наша программа подойдёт вам, если:</h3>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground">
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Вы пробовали диеты, но вес возвращается</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Чувствуете постоянный голод и сложно контролировать аппетит</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Вес стоит на месте, несмотря на питание и спорт</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Есть отеки, тяжесть и ощущение замедленного метаболизма</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Хотите снизить вес без жёстких диет и стресса для организма</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4 font-display">Особенно программа может быть полезна, если у вас:</h3>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground">
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Инсулинорезистентность</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Преддиабет</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Гормональные изменения</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Хроническая усталость</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Дефициты витаминов и микроэлементов</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-12 sm:py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 font-display text-primary">
            Программа похудения
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {programs.map((program) => (
              <div key={program.id} className="bg-background rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-border">
                <div className="p-4 sm:p-6 border-b border-border bg-white">
                  <h3 className="text-lg sm:text-2xl font-bold text-primary mb-2 font-display">{program.name}</h3>
                  {program.subtitle && (
                    <p className="text-xs sm:text-sm text-muted-foreground">{program.subtitle}</p>
                  )}
                </div>
                <div className="p-4 sm:p-6">
                  <p className="text-xs sm:text-sm text-foreground mb-4 sm:mb-6 leading-relaxed">{program.description}</p>

                  <div className="mb-4 sm:mb-6">
                    <p className="text-xs font-semibold text-primary mb-2 sm:mb-3 uppercase">Что внутри:</p>
                    <ul className="space-y-1 sm:space-y-2">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex gap-2 text-xs text-foreground leading-relaxed text-xs">
                          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                    <p className="text-xs font-semibold text-primary mb-2 uppercase">На этом этапе:</p>
                    <ul className="space-y-1">
                      {program.results.map((result, idx) => (
                        <li key={idx} className="text-xs text-foreground flex gap-2">
                          <span className="text-primary">✓</span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-border pt-4 mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Длительность:</p>
                    <p className="text-sm font-semibold text-foreground mb-3">{program.duration}</p>
                    <div className="mb-3">
                      <p className="text-2xl font-bold text-primary">{program.price}</p>
                      {program.pricePerWeek && (
                        <p className="text-xs text-muted-foreground">{program.pricePerWeek}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 text-xs">
                      Подробнее
                    </Button>
                    <Button className="flex-1 bg-primary hover:bg-primary/90 text-xs">
                      Записаться
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Consultation Note */}
          <div className="bg-accent/20 p-6 rounded-lg text-center mb-12">
            <p className="text-foreground">
              <strong>Разовая консультация врача — 5 000 ₽</strong>
            </p>
          </div>

          {/* Additional Services Section */}
          <div className="mb-12">
            <p className="text-center text-foreground mb-8 max-w-3xl mx-auto">
              Капельницы можно подключать к основным программам похудения как усиление эффекта или проходить отдельными курсами. Ниже — дополнительные направления: метаболизм, детокс, иммунитет, красота, энергия, сон, стресс и когнитивная продуктивность.
            </p>

            {additionalServices.map((serviceGroup, groupIdx) => (
              <div key={groupIdx} className="mb-12">
                <h3 className="text-2xl font-bold text-primary mb-6 font-display">
                  {serviceGroup.category}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {serviceGroup.items.map((item, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg border border-border hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-foreground mb-2 text-sm">{item.name}</h4>
                      <p className="text-primary font-bold text-lg mb-3">{item.price}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 font-display text-primary">
            Как проходят процедуры
          </h2>
          <div className="space-y-4 mb-12">
            {[
              "Онлайн-заявка или звонок",
              "Консультация врача (оффлайн/онлайн), сбор анамнеза, назначение анализов",
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
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg border border-border">
              <h3 className="text-xl font-bold text-primary mb-4 font-display">Преимущества IV-введения</h3>
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

            <div className="bg-white p-6 rounded-lg border border-border">
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
      <section id="results" className="py-16 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4 font-display text-primary">
            Результаты до/после
          </h2>
          <p className="text-center text-foreground mb-12 max-w-2xl mx-auto">
            Реальные кейсы: фото «до/после», указание кг и сроков (с согласия клиентов)
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

      {/* Patient Testimonials Section */}
      <section className="py-16 bg-background">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-4 font-display text-primary">
            Поговорите с человеком, который уже похудел именно на вашей программе
          </h2>
          <p className="text-center text-foreground mb-12">
            Оставьте контакты — мы назначим вам разговор с нашим пациентом, который прошел тот же курс, что вы рассматриваете. Бесплатно и без обязательств.
          </p>

          <div className="bg-white rounded-lg p-8 shadow-md">
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
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Какая программа вас интересует? *</label>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Старт</option>
                  <option>Интенсив</option>
                  <option>Стабилизация результата</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                Отправить заявку на связь
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6 mb-6">
              Мы назначим вам разговор с нашим пациентом в течение 24 часов. Бесплатно. Никаких обязательств.
            </p>

            <div className="space-y-2 text-sm text-foreground">
              <div className="flex gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Позвоним уточнить детали</span>
              </div>
              <div className="flex gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Передадим контакты пациента</span>
              </div>
              <div className="flex gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Организуем встречу или звонок</span>
              </div>
            </div>
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
            Получите консультацию специалиста. Подберём программу под ваши анализы и образ жизни.
          </p>
          <form onSubmit={handleFormSubmit} className="space-y-4 mb-6">
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
          <p className="text-sm opacity-75">
            Не знаете, какую программу выбрать? Оставьте заявку — подберём по вашим задачам.
          </p>
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
