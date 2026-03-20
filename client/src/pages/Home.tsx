
import { useState } from "react";
import { Check, ChevronDown, MapPin, Clock, Phone, Mail, Menu, X, Upload } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

/**
 * Design Philosophy: Medical Minimalism with Warm Humanity
 * - Premium wellness clinic aesthetic with peptide therapy focus
 * - Color palette: Dark green (#1B5E3F), warm beige (#F5F1ED), soft gold (#D4A574)
 * - Typography: Playfair Display (headers), Inter (body)
 * - Emphasis on medical credibility, safety, and personalized approach
 * - Real clinic photos integrated for authenticity
 */

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [selectedProgram, setSelectedProgram] = useState("Новый понедельник");
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const consultationMutation = trpc.consultations.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: "", phone: "" });
      setUploadedFile(null);
      toast.success("Заявка отправлена! Врач свяжется с вами в течение часа.");
      setTimeout(() => setSubmitted(false), 3000);
    },
    onError: (error) => {
      toast.error("Ошибка при отправке заявки. Пожалуйста, попробуйте снова.");
      console.error(error);
    },
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Файл слишком большой. Максимальный размер: 10 МБ");
        return;
      }
      setUploadedFile(file);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let fileData: { base64: string; fileName: string; mimeType: string } | undefined;

      if (uploadedFile) {
        const reader = new FileReader();
        await new Promise((resolve, reject) => {
          reader.onload = () => {
            const base64String = (reader.result as string).split(",")[1];
            fileData = {
              base64: base64String,
              fileName: uploadedFile.name,
              mimeType: uploadedFile.type,
            };
            resolve(null);
          };
          reader.onerror = reject;
          reader.readAsDataURL(uploadedFile);
        });
      }

      await consultationMutation.mutateAsync({
        name: formData.name,
        phone: formData.phone,
        program: selectedProgram,
        fileData,
      });
    } finally {
      setIsUploading(false);
    }
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
    heroGenerated: "https://d2xsxph8kpxj0f.cloudfront.net/310519663096993096/hdtQvaxiWb9W7weDTCV6tP/iv-therapy-procedure-HrfhGSzZrzp7Ymjgf9SXUg.webp",
    wellnessResults: "https://d2xsxph8kpxj0f.cloudfront.net/310519663096993096/hdtQvaxiWb9W7weDTCV6tP/wellness-results-CCDrWAnx4WMRuRR4bDSn54.webp",
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
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16 sm:h-18">
          {/* Logo area - original circle icon from brand logo */}
          <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/eFjoSEfsOJNdgKDH.svg"
              alt="Понедельник"
              className="h-28 w-28 sm:h-32 sm:w-32 object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-base sm:text-lg font-bold text-primary font-display tracking-wide">
                Понедельник
              </span>
              <span className="text-[10px] sm:text-xs text-foreground/60 font-medium uppercase tracking-wider">
                клиника
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex gap-5 xl:gap-6 text-sm">
            <a href="#approach" className="text-foreground hover:text-primary transition-colors">
              Наш подход
            </a>
            <a href="#suitable" className="text-foreground hover:text-primary transition-colors">
              Кому подойдёт
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

          {/* Desktop buttons */}
          <div className="hidden lg:flex gap-2">
            <a
              href="tel:+79150660553"
              className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 text-xs font-semibold transition-colors"
            >
              +7 (915) 066-05-53
            </a>
            <a
              href="#consultation"
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Записаться
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-border shadow-lg">
            <div className="container py-4 space-y-1">
              <a href="#approach" onClick={closeMobileMenu} className="block py-3 px-4 text-foreground hover:bg-primary/5 hover:text-primary rounded-lg transition-colors">
                Наш подход
              </a>
              <a href="#suitable" onClick={closeMobileMenu} className="block py-3 px-4 text-foreground hover:bg-primary/5 hover:text-primary rounded-lg transition-colors">
                Кому подойдёт
              </a>
              <a href="#programs" onClick={closeMobileMenu} className="block py-3 px-4 text-foreground hover:bg-primary/5 hover:text-primary rounded-lg transition-colors">
                Программы
              </a>
              <a href="#results" onClick={closeMobileMenu} className="block py-3 px-4 text-foreground hover:bg-primary/5 hover:text-primary rounded-lg transition-colors">
                Результаты
              </a>
              <a href="#contacts" onClick={closeMobileMenu} className="block py-3 px-4 text-foreground hover:bg-primary/5 hover:text-primary rounded-lg transition-colors">
                Контакты
              </a>
              <div className="pt-3 border-t border-border space-y-2">
                <a
                  href="tel:+79150660553"
                  className="block text-center py-3 px-4 border border-primary text-primary rounded-lg font-semibold"
                >
                  +7 (915) 066-05-53
                </a>
                <a
                  href="#consultation"
                  onClick={closeMobileMenu}
                  className="block text-center py-3 px-4 bg-primary text-white rounded-lg font-semibold"
                >
                  Записаться
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Desktop: overlay on photo, Mobile: photo on top + content below */}
      {/* Desktop hero */}
      <section className="relative hidden sm:block py-20 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${photos.receptionLogo}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40"></div>
        </div>
        <div className="container relative z-10 max-w-3xl">
          <div className="mb-8">
            <p className="text-lg md:text-xl text-white font-semibold mb-1">
              Ваш новый понедельник начинается здесь
            </p>
            <p className="text-base md:text-lg text-white/90">
              Начните свой новый понедельник — без лишнего веса
            </p>
          </div>
          <p className="text-sm text-white/70 uppercase tracking-widest mb-4">
            Медицинская программа снижения веса под контролем врача
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display leading-tight">
            Клиника снижения веса на новейших препаратах под контролем врачей без жёстких диет и откатов
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Диагностика, пептидная терапия и восполнение дефицитов с клинически протестированными протоколами инфузионной терапии и питания
          </p>

          <div className="grid grid-cols-2 gap-3 mb-10">
            {[
              "Программы похудения и современные препараты под контролем врача-эндокринолога по вашим анализам",
              "Пептидная терапия и современные препараты для контроля аппетита",
              "Восполнение дефицитов витаминов и микроэлементов",
              "Лечение причин набора веса, а не временные диеты",
            ].map((text, idx) => (
              <div key={idx} className="bg-white/95 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-0.5">
                    ✓
                  </div>
                  <p className="text-sm text-foreground leading-snug">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-white/80 text-sm mb-8 italic leading-relaxed">
            Многие пациенты приходят к нам после того, как слышали о препаратах семаглутида и тирзепатида (Оземпик, Мунжаро и аналоги).
            <br />
            Мы подбираем терапию индивидуально — с учётом анализов, состояния организма и целей пациента.
          </p>

          <div className="flex flex-row gap-3">
            <a href="#programs" className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors text-center text-base">
              Подобрать программу
            </a>
            <a href="#consultation" className="px-6 py-3 border-2 border-white text-white hover:bg-white/10 rounded-lg font-semibold transition-colors text-center text-base">
              Записаться
            </a>
          </div>
        </div>
      </section>

      {/* Mobile hero - text overlay on photo like desktop */}
      <section className="sm:hidden relative py-16 overflow-hidden">
        {/* Reception wall photo background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${photos.receptionLogo}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40"></div>
        </div>
        
        {/* Content overlay on photo */}
        <div className="container relative z-10 px-4">
          <div className="mb-6">
            <p className="text-base text-white font-semibold mb-1">
              Ваш новый понедельник начинается здесь
            </p>
            <p className="text-sm text-white/90">
              Начните свой новый понедельник — без лишнего веса
            </p>
          </div>
          <p className="text-xs text-white/70 uppercase tracking-widest mb-3">
            Медицинская программа снижения веса под контролем врача
          </p>
          <h1 className="text-xl leading-[1.2] font-bold text-white mb-3 font-display">
            Клиника снижения веса на новейших препаратах под контролем врачей без жёстких диет и откатов
          </h1>
          <p className="text-sm text-white/90 mb-4 leading-relaxed">
            Диагностика, пептидная терапия и восполнение дефицитов с клинически протестированными протоколами инфузионной терапии и питания
          </p>

          {/* UTP Block - compact cards */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              "Программы похудения и современные препараты под контролем врача-эндокринолога по вашим анализам",
              "Пептидная терапия и современные препараты для контроля аппетита",
              "Восполнение дефицитов витаминов и микроэлементов",
              "Лечение причин набора веса, а не временные диеты",
            ].map((text, idx) => (
              <div key={idx} className="bg-white/95 backdrop-blur-sm p-2.5 rounded-lg">
                <div className="flex gap-2 items-start">
                  <div className="w-5 h-5 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold mt-0.5">
                    ✓
                  </div>
                  <p className="text-[11px] text-foreground leading-snug">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-white/80 text-xs mb-4 italic leading-relaxed">
            Многие пациенты приходят к нам после того, как слышали о препаратах семаглутида и тирзепатида (Оземпик, Мунжаро и аналоги).
            Мы подбираем терапию индивидуально.
          </p>

          <div className="flex gap-2">
            <a href="#programs" className="flex-1 px-3 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors text-center text-xs">
              Подобрать программу
            </a>
            <a href="#consultation" className="flex-1 px-3 py-2 border-2 border-white text-white hover:bg-white/10 rounded-lg font-semibold transition-colors text-center text-xs">
              Записаться
            </a>
          </div>
        </div>
      </section>

      {/* Clinic Gallery Strip */}
      <section className="py-6 sm:py-10 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img src={photos.receptionDesk} alt="Ресепшн клиники" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img src={photos.doctorOffice} alt="Кабинет врача" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img src={photos.recliners} alt="Кресла для процедур" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img src={photos.waitingArea} alt="Зона ожидания" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" className="py-10 sm:py-16 bg-background">
        <div className="container max-w-4xl">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-2 sm:mb-4 font-display text-primary">
            Наш подход к похудению
          </h2>
          <p className="text-center text-foreground mb-6 sm:mb-12 text-xs sm:text-base leading-relaxed max-w-3xl mx-auto">
            В клинике «Понедельник» мы используем современные медицинские методы управления весом, которые применяются в мировой эндокринологической практике и используем поэтапный медицинский протокол снижения веса. Каждый этап протокола решает свою задачу.
          </p>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white p-5 sm:p-8 rounded-xl border border-border">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 font-display text-primary">Протокол может включать:</h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "Пептидную терапию",
                  "Препараты для контроля аппетита и метаболизма",
                  "Работу с инсулинорезистентностью",
                  "Регулирование уровня сахара в крови",
                  "Коррекцию питания",
                  "Восполнение дефицитов витаминов и микроэлементов",
                  "Инфузионную терапию",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs sm:text-sm text-foreground mt-4 sm:mt-6 italic">
                Все назначения проводятся только после консультации врача и анализа состояния организма.
              </p>
            </div>

            <div className="bg-white p-5 sm:p-8 rounded-xl border border-border">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 font-display text-primary">Почему не работают диеты</h3>
              <p className="text-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                Большинство диет не учитывают:
              </p>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {[
                  "Гормональный фон",
                  "Инсулинорезистентность",
                  "Дефициты витаминов",
                  "Состояние метаболизма",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Поэтому вес часто возвращается.</p>
              <p className="text-foreground font-semibold text-sm sm:text-base">
                В клинике «Понедельник» мы работаем с причинами набора веса, а не только с симптомом.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor's Office Photo + Approach visual */}
      <section className="py-0 bg-white">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-0 md:gap-6 items-center py-8 sm:py-12">
            <div className="rounded-xl overflow-hidden mb-6 md:mb-0">
              <img
                src={photos.doctorOffice}
                alt="Кабинет врача клиники Понедельник"
                className="w-full h-64 sm:h-80 object-cover rounded-xl"
              />
            </div>
            <div className="rounded-xl overflow-hidden">
              <img
                src={photos.receptionLogo}
                alt="Логотип клиники Понедельник на стене"
                className="w-full h-64 sm:h-80 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Suitable Section */}
      <section id="suitable" className="py-10 sm:py-16 bg-background">
        <div className="container max-w-4xl">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-2 sm:mb-4 font-display text-primary">
            Кому подойдёт программа снижения веса
          </h2>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-10">
            <div className="bg-white p-5 sm:p-8 rounded-xl border border-border">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 font-display text-primary">
                Наша программа подойдёт вам, если:
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "Вы пробовали диеты, но вес возвращается",
                  "Чувствуете постоянный голод и сложно контролировать аппетит",
                  "Вес стоит на месте, несмотря на питание и спорт",
                  "Есть отеки, тяжесть и ощущение замедленного метаболизма",
                  "Хотите снизить вес без жёстких диет и стресса для организма",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-5 sm:p-8 rounded-xl border border-border">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 font-display text-primary">
                Особенно программа может быть полезна, если у вас:
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "Инсулинорезистентность",
                  "Преддиабет",
                  "Гормональные изменения",
                  "Хроническая усталость",
                  "Дефициты витаминов и микроэлементов",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-10 sm:py-16 bg-white">
        <div className="container">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-2 sm:mb-4 font-display text-primary">
            Программа похудения
          </h2>
          <p className="text-center text-foreground mb-6 sm:mb-12 max-w-2xl mx-auto text-xs sm:text-base">
            Выберите программу, которая соответствует вашим целям и возможностям
          </p>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-12">
            {programs.map((program) => (
              <div key={program.id} className="bg-background rounded-xl p-4 sm:p-6 border border-border hover:shadow-lg transition-shadow flex flex-col">
                <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 font-display text-primary">{program.name}</h3>
                {program.subtitle && (
                  <p className="text-xs sm:text-sm text-foreground/70 mb-3 sm:mb-4 italic">{program.subtitle}</p>
                )}
                <p className="text-foreground mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed">{program.description}</p>

                <div className="mb-4 sm:mb-6">
                  <h4 className="font-semibold text-foreground mb-2 sm:mb-3 text-sm sm:text-base">Что внутри:</h4>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-foreground flex gap-2">
                        <span className="text-primary font-bold flex-shrink-0">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2 sm:mb-3 text-sm sm:text-base">На этом этапе:</h4>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {program.results.map((result, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-foreground flex gap-2">
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border">
                    <p className="text-xs sm:text-sm text-foreground/70 mb-1 sm:mb-2 leading-relaxed">
                      <span className="font-semibold">Длительность:</span> {program.duration}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-primary">{program.price}</p>
                    {program.pricePerWeek && (
                      <p className="text-xs sm:text-sm text-foreground/70">{program.pricePerWeek}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <a href="#consultation" className="w-full px-4 py-2.5 text-xs sm:text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-center font-semibold">
                      Записаться
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-10 sm:py-16 bg-background">
        <div className="container">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-2 sm:mb-4 font-display text-primary">
            Дополнительные услуги
          </h2>
          <p className="text-center text-foreground mb-6 sm:mb-12 max-w-2xl mx-auto text-xs sm:text-base">
            Дополните вашу программу специализированными капельницами для достижения лучших результатов
          </p>

          <div className="space-y-6 sm:space-y-12">
            {additionalServices.map((service, idx) => (
              <div key={idx}>
                <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-6 font-display text-primary">{service.category}</h3>
                <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-6">
                  {service.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="bg-white p-4 sm:p-6 rounded-xl border border-border hover:shadow-md transition-shadow">
                      <h4 className="text-base sm:text-lg font-bold text-foreground mb-1 sm:mb-2">{item.name}</h4>
                      <p className="text-primary font-bold text-base sm:text-lg mb-2 sm:mb-3">{item.price}</p>
                      <p className="text-xs sm:text-sm text-foreground leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="container">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-2 sm:mb-4 font-display text-primary">
            Как это работает
          </h2>
          <p className="text-center text-foreground mb-6 sm:mb-12 max-w-2xl mx-auto text-xs sm:text-base">
            Простой и понятный процесс, который помогает вам достичь результатов
          </p>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start max-w-5xl mx-auto">
            {/* Steps */}
            <div className="space-y-4 sm:space-y-6">
              {[
                "Первичная консультация и диагностика (сдача анализов, оценка состояния)",
                "Check-up (анализы крови, оценка гормонального и метаболического статуса)",
                "Подбор индивидуальной программы похудения (капельницы + питание + режим)",
                "Прохождение процедур в клинике (мягкие кресла, чай, музыка, 30–90 минут)",
                "Посещение 1 раз в неделю",
                "Контрольные визиты, корректировка программы",
              ].map((step, idx) => (
                <div key={idx} className="flex gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0 text-xs sm:text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex items-center">
                    <p className="text-foreground text-sm sm:text-base">{step}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Clinic procedure photo */}
            <div className="rounded-xl overflow-hidden">
              <img
                src={photos.ivPatient}
                alt="Процедура в клинике Понедельник"
                className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl"
              />
            </div>
          </div>

          {/* IV Benefits */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mt-8 sm:mt-12 max-w-5xl mx-auto">
            <div className="bg-background p-4 sm:p-6 rounded-xl border border-border">
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4 font-display">Преимущества инфузионного введения</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm sm:text-base">Полезные вещества попадают сразу в кровь, минуя ЖКТ, усвоение близко к 100%</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm sm:text-base">Эффект чувствуете уже в первые минуты/часы после процедуры</span>
                </li>
              </ul>
            </div>

            <div className="bg-background p-4 sm:p-6 rounded-xl border border-border">
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4 font-display">Комфорт и безопасность</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm sm:text-base">Мягкие кресла с реклайнером</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm sm:text-base">Чай/кофе, спокойная музыка</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm sm:text-base">Процедуры под постоянным наблюдением медперсонала</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm sm:text-base">Состав и дозировки подбирает врач по анализам и анамнезу</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Comfort photos */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 sm:mt-10 max-w-5xl mx-auto">
            <div className="rounded-xl overflow-hidden">
              <img
                src={photos.recliners}
                alt="Мягкие кресла-реклайнеры для процедур"
                className="w-full h-40 sm:h-52 md:h-64 object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden">
              <img
                src={photos.ivDrip}
                alt="Инфузионная терапия в клинике"
                className="w-full h-40 sm:h-52 md:h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-10 sm:py-16 bg-background">
        <div className="container">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-2 sm:mb-4 font-display text-primary">
            Результаты пациентов
          </h2>
          <p className="text-center text-foreground mb-6 sm:mb-12 max-w-2xl mx-auto text-xs sm:text-base">
            За курс программы пациенты обычно достигают:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto mb-6 sm:mb-8">
            {[
              "Снижение веса на 6–30 кг",
              "Уменьшение объёмов",
              "Снижение аппетита",
              "Улучшение самочувствия",
            ].map((result, idx) => (
              <div key={idx} className="bg-white p-3 sm:p-5 rounded-xl border border-border text-center">
                <Check className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-2" />
                <span className="text-foreground text-xs sm:text-sm font-medium">{result}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl overflow-hidden max-w-4xl mx-auto">
            <picture>
              <source media="(max-width: 640px)" srcSet="https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/onfaxAicWJWqkGsg.jpg" />
              <source media="(max-width: 1024px)" srcSet="https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/QnzGtLmrDqkLIppq.jpg" />
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/SohOikkoRfqNVvXJ.jpg"
                alt="Результаты пациентов - до и после"
                className="w-full h-auto rounded-xl object-cover"
              />
            </picture>
          </div>
          
          <div className="rounded-xl overflow-hidden max-w-4xl mx-auto mt-6 sm:mt-8">
            <picture>
              <source media="(max-width: 640px)" srcSet="https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/ZsZiAXgFQxEWPXNa.jpg" />
              <source media="(max-width: 1024px)" srcSet="https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/uJabHgjSMXfzuZWP.jpg" />
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/rscHNCjsmILdRngU.jpg"
                alt="Результаты пациентов - до и после"
                className="w-full h-auto rounded-xl object-cover"
              />
            </picture>
          </div>

          <p className="text-center text-xs sm:text-sm text-foreground/70 mt-4 sm:mt-6 italic">
            *результаты индивидуальны
          </p>
        </div>
      </section>

      {/* Patient Testimonials Section */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-4 font-display text-primary leading-tight">
            Поговорите с человеком, который уже похудел именно на нашей программе
          </h2>
          <p className="text-center text-foreground mb-8 sm:mb-12 text-sm sm:text-base leading-relaxed">
            Оставьте контакты — мы назначим вам разговор с нашим пациентом, который прошел тот же курс, что вы рассматриваете. Бесплатно и без обязательств.
          </p>

          <div className="bg-background rounded-xl p-5 sm:p-8 shadow-md relative overflow-hidden" style={{
            backgroundImage: 'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/fEvVmzzKUNjGHVAp.png)',
            backgroundPosition: 'right bottom',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'clamp(150px, 30vw, 300px)',
            backgroundAttachment: 'local',
          }}>
            <div className="relative z-10">
            <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2">Ваше имя *</label>
                <input
                  type="text"
                  placeholder="Имя"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2">Телефон *</label>
                <input
                  type="tel"
                  placeholder="+7 (999) 999-99-99"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-2.5 sm:py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors text-sm sm:text-base"
              >
                Отправить заявку на связь
              </button>
              {submitted && (
                <p className="text-center text-primary text-xs sm:text-sm">Спасибо! Мы свяжемся с вами в ближайшее время.</p>
              )}
            </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 sm:py-16 bg-background">
        <div className="container max-w-3xl">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-2 sm:mb-4 font-display text-primary">
            Ответы на вопросы
          </h2>
          <p className="text-center text-foreground mb-6 sm:mb-12 text-xs sm:text-base">
            Всё, что вам нужно знать о программах похудения
          </p>

          <div className="space-y-3 sm:space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-background transition-colors"
                >
                  <h3 className="font-semibold text-foreground text-left text-sm sm:text-base pr-2">{item.question}</h3>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 transition-transform ${
                      expandedFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-4 sm:px-6 py-3 sm:py-4 bg-background border-t border-border">
                    <p className="text-foreground text-sm sm:text-base">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section id="consultation" className="py-10 sm:py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-2 sm:mb-4 font-display text-primary">
            Получить консультацию врача
          </h2>
          <p className="text-center text-foreground mb-6 sm:mb-12 text-xs sm:text-base">
            Оставьте контакты и выберите интересующую вас программу — врач свяжется с вами в течение часа
          </p>

          <div className="bg-background rounded-xl p-5 sm:p-8 shadow-md relative overflow-hidden" style={{
            backgroundImage: 'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/fEvVmzzKUNjGHVAp.png)',
            backgroundPosition: 'right bottom',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'clamp(150px, 30vw, 300px)',
            backgroundAttachment: 'local',
          }}>
            <div className="relative z-10">
            <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2">Ваше имя *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2">Телефон *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+7 (999) 999-99-99"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2">Интересующая программа</label>
                <select
                  name="program"
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base bg-white"
                >
                  <option>Новый понедельник</option>
                  <option>Интенсив</option>
                  <option>Стабилизация результата</option>
                </select>
              </div>
              <div className="hidden sm:block">
                <label className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2">Загрузить файл (анализы, документы)</label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-input"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                  />
                  <label
                    htmlFor="file-input"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-dashed border-primary rounded-lg cursor-pointer hover:bg-primary/5 transition-colors flex items-center gap-2 justify-center text-sm sm:text-base"
                  >
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    {uploadedFile ? (
                      <span className="text-foreground font-medium">{uploadedFile.name}</span>
                    ) : (
                      <span className="text-foreground/70">Выберите файл или перетащите сюда</span>
                    )}
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={isUploading || consultationMutation.isPending}
                className="w-full px-6 py-2.5 sm:py-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white rounded-lg font-semibold transition-colors text-sm sm:text-base"
              >
                {isUploading || consultationMutation.isPending ? "Отправка..." : "Получить консультацию"}
              </button>
              {submitted && (
                <p className="text-center text-primary text-xs sm:text-sm">Спасибо! Врач свяжется с вами в ближайшее время.</p>
              )}
            </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-10 sm:py-16 bg-background">
        <div className="container">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-6 sm:mb-12 font-display text-primary">Контакты</h2>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 font-display text-primary">Адрес клиники</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground text-sm sm:text-base">Адрес</p>
                    <p className="text-foreground text-sm sm:text-base">г. Москва, ул. Адмирала Макарова, 6А</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground text-sm sm:text-base">График работы</p>
                    <p className="text-foreground text-sm sm:text-base">Ежедневно с 10:00 до 20:00</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground text-sm sm:text-base">Телефон</p>
                    <a href="tel:+79150660553" className="text-foreground hover:text-primary transition-colors text-sm sm:text-base">
                      +7 (915) 066-05-53
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground text-sm sm:text-base">Email</p>
                    <p className="text-foreground text-sm sm:text-base">info@ponedelnik.clinic</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 font-display text-primary">Как добраться</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">Метро</p>
                  <p className="text-foreground text-sm sm:text-base">
                    Ближайшая станция: Водный стадион (7 минут пешком)
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">Парковка</p>
                  <p className="text-foreground text-sm sm:text-base">
                    Бесплатная парковка на территории клиники для пациентов
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-6 sm:py-8">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-white/20">
            <div className="flex items-center gap-3">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663096993096/lZBYIAbLnvciebLy.png"
                alt="Понедельник"
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
              />
              <div>
                <p className="font-bold text-base sm:text-lg">Понедельник</p>
                <p className="text-xs sm:text-sm opacity-75">Клиника медицинского снижения веса</p>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <a href="tel:+79150660553" className="font-semibold hover:opacity-80 transition-opacity text-sm sm:text-base">
                +7 (915) 066-05-53
              </a>
              <p className="text-xs sm:text-sm opacity-75">г. Москва, ул. Адмирала Макарова, 6А</p>
            </div>
          </div>
          <div className="text-center">
            <p className="mb-1 sm:mb-2 text-xs sm:text-sm">© 2025 Клиника медицинского снижения веса «Понедельник»</p>
            <p className="text-xs opacity-75">
              Все права защищены. Информация на сайте не является публичной офертой.
            </p>
          </div>
        </div>
      </footer>

      {/* Fixed mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border p-3 sm:hidden">
        <div className="flex gap-2">
          <a
            href="tel:+79150660553"
            className="flex-1 py-2.5 text-center border border-primary text-primary rounded-lg font-semibold text-sm"
          >
            Позвонить
          </a>
          <a
            href="#consultation"
            className="flex-1 py-2.5 text-center bg-primary text-white rounded-lg font-semibold text-sm"
          >
            Записаться
          </a>
        </div>
      </div>

      {/* Spacer for fixed mobile CTA */}
      <div className="h-16 sm:hidden"></div>
    </div>
  );
}
