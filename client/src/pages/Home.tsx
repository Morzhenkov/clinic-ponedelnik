import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Design Philosophy: Medical Minimalism with Warm Humanity
 * - Dark Forest Green (#1B5E3F): stability, medical authority
 * - Warm Beige (#F5F1ED): welcoming, intimate atmosphere
 * - Soft Gold (#D4A574): warmth, care, human touch
 * - Typography: Playfair Display (headlines), Inter (body)
 * - Spacing: Generous whitespace, breathing room between sections
 * - Animations: Smooth fade-in, unhurried transitions
 */

const HERO_IMAGE = "https://private-us-east-1.manuscdn.com/sessionFile/fKNQTjMYd592QJUtYjDbou/sandbox/Bfwpt8JRAXT72yUsWL2VoA-img-1_1772021284000_na1fn_aGVyby1jbGluaWMtcmVjZXB0aW9u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZktOUVRqTVlkNTkyUUpVdFlqRGJvdS9zYW5kYm94L0Jmd3B0OEpSQVhUNzJ5VXNXTDJWb0EtaW1nLTFfMTc3MjAyMTI4NDAwMF9uYTFmbl9hR1Z5YnkxamJHbHVhV010Y21WalpYQjBhVzl1LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=n-OmuWFZoHRPtAgbSxqDkYsonkDTCb6BDj1IPs6NrGOHGbSeWcNOtRgj5-hLt~H94wM6iGbcdCUpar0RRBqHmWVvhiGF-6r85PPt4qd3UDcMdiiCYUKVzT1PKhPOgtqSTYeNn-T6-gKUCJDoQ9TNJ1HHGa85YlA2v7fNvqc7Hl1S3iSES5OUsZVByASWAxIcbEIuW4Fe3l9J0Xq89aWIJieOb6NAdksJhopd6uG3ys5s7LmfzNGbNqqqZ1ciFX6cn4dNOP378oMFI25035yX5RI7my3gi9cchfil7Pz-XdaFXP4JRbCvtKcuqktRgiZ4O9oPUvSIibaoQ6lpZ2PmFg__";
const CONSULTATION_IMAGE = "https://private-us-east-1.manuscdn.com/sessionFile/fKNQTjMYd592QJUtYjDbou/sandbox/Bfwpt8JRAXT72yUsWL2VoA-img-2_1772021294000_na1fn_Y29uc3VsdGF0aW9uLXJvb20tY2FsbQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZktOUVRqTVlkNTkyUUpVdFlqRGJvdS9zYW5kYm94L0Jmd3B0OEpSQVhUNzJ5VXNXTDJWb0EtaW1nLTJfMTc3MjAyMTI5NDAwMF9uYTFmbl9ZMjl1YzNWc2RHRjBhVzl1TFhKdmIyMHRZMkZzYlEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=VS13JNHpr0cvNd2~3tnYQ4S2R1cUU8Zmpgd1Tw14As9Na1UFhtCFmDYC3BPFdydsT0mNwH-vqD~G-zOcZjFlMbmAQS~QLQ8Ff~9wkNmdJ2jQx~HacWhwa1jisSZz38wXMPnqb1sJoJbZS~EYTJJKzaooPordv7RJJwGboC5JwUfyDHh7G7XYlZ6v208vqniTJLcKMJndid3Q2suP2maiRP6YIPuR8bkamRykAdoRQvvDSqBZKTE3EpKrRzkBHfFlUVqyalbZSmlkgJ-Bpa~KQzOcyp4p2k8e-ZNO~Urp7WhqikLQaTD-FD3bPBhth-hlEO59Bh02KkuA6wchcy42~A__";
const WAITING_IMAGE = "https://private-us-east-1.manuscdn.com/sessionFile/fKNQTjMYd592QJUtYjDbou/sandbox/Bfwpt8JRAXT72yUsWL2VoA-img-3_1772021285000_na1fn_d2FpdGluZy1hcmVhLXdlbGxuZXNz.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZktOUVRqTVlkNTkyUUpVdFlqRGJvdS9zYW5kYm94L0Jmd3B0OEpSQVhUNzJ5VXNXTDJWb0EtaW1nLTNfMTc3MjAyMTI4NTAwMF9uYTFmbl9kMkZwZEdsdVp5MWhjbVZoTFhkbGJHeHVaWE56LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=QBqtRtYe9hMymf0ItMLahiKskbNg1-VZ5alfy5pPH2PUnNReY9cIQ1CBivMDwqb8cz1mv0c5EHhkMZiADTtWwLT9ty3BUjJxjACFo4FyIVfnHWjo3ApEGZY-aWFfuXFZ17YQF0j-1nvI0QLCuZPa6MtiG~2YSXVopkuwjRkCYY8ErkXdVgO8GwDaljct1OozZxbCazTdKxPjgZiKahiRtVMwolkHKgs5cHxjlNmvdlwmEfmQUqkuhFyY93gs6QLkASpMYCSsSYKnZsCswgQRhdNt3PYMVixkalo6V~MvWyq5TCWLE-w1i7ojWizAtGEDVLgZPYKvR7Fb-57OSkFBug__";

interface FAQItem {
  question: string;
  answer: string;
}

interface StoryItem {
  title: string;
  description: string;
}

interface TrustMarker {
  text: string;
}

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });

  const faqItems: FAQItem[] = [
    {
      question: "Я уже всё пробовал",
      answer: "Мы начинаем с диагностики причин, а не с очередной диеты. Это совсем другой подход.",
    },
    {
      question: "А если снова откатит",
      answer: "Этап анти-откат 3–6 месяцев — это часть программы. Мы не уходим после первых результатов.",
    },
    {
      question: "Я боюсь лекарств",
      answer: "Лекарства — только если нужны. Сначала мы разбираемся с причинами. Всё обсуждается.",
    },
    {
      question: "Меня будут стыдить",
      answer: "Нет. Это медицинский процесс. Никакого осуждения, только помощь.",
    },
    {
      question: "Можно онлайн",
      answer: "Да, первая консультация может быть онлайн. Обсудим подробнее при встрече.",
    },
    {
      question: "Это дорого",
      answer: "Цена зависит от программы. Первая консультация — это разговор о возможностях.",
    },
    {
      question: "Сколько длится",
      answer: "Обычно 3–6 месяцев. Зависит от ваших целей и особенностей организма.",
    },
    {
      question: "Будут жёсткие диеты",
      answer: "Нет. План строится под вашу реальную жизнь, без режима «всё или ничего».",
    },
    {
      question: "Если сорвусь",
      answer: "Это нормально. Мы корректируем план и продолжаем. Без осуждения.",
    },
    {
      question: "Это про красоту или здоровье",
      answer: "Про здоровье. Красота — это следствие.",
    },
  ];

  const stories: StoryItem[] = [
    {
      title: "«Устала от циклов»",
      description:
        "Минус 15 кг, потом плюс 20. Оказалось, нужна была не диета, а понимание своего метаболизма.",
    },
    {
      title: "«Боялась врачей»",
      description:
        "Первый раз без стыда поговорила о весе. Оказалось, это просто медицинская задача.",
    },
    {
      title: "«Не верила в результат»",
      description:
        "Результат держится уже 8 месяцев. Потому что мы работали с причинами, не с симптомами.",
    },
  ];

  const trustMarkers: TrustMarker[] = [
    { text: "Мы начинаем с диагностики" },
    { text: "Нет универсальной схемы" },
    { text: "Есть мониторинг" },
    { text: "Есть корректировки" },
    { text: "Есть этап закрепления" },
    { text: "Нет стыда" },
    { text: "Медицинский подход" },
    { text: "Поддержка на каждом этапе" },
    { text: "Результат, который держится" },
    { text: "Без марафонов" },
    { text: "Без давления" },
    { text: "Только честный разговор" },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Section 1: Hero */}
      <section
        className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-white mb-6 leading-tight">
            Вы не слабовольный.
            <br />
            Лишний вес — это метаболическая задача.
          </h1>
          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            Мы начинаем с диагностики причин и ведём до устойчивого результата — с этапом
            анти-откат 3–6 месяцев.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="bg-white/20 border-white text-white hover:bg-white/30"
            >
              Хочу понять причины
            </Button>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Записаться на консультацию
            </Button>
          </div>
        </div>
      </section>

      {/* Section 2: Positioning */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-primary mb-6">Это не «похудение». Это медицинский процесс.</h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-8">
              Вы не «ленивый» и не «слабовольный». Чаще всего лишний вес — это гормональные,
              метаболические и поведенческие механизмы. Мы работаем с причинами, а не с запретами.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Диагностика причин",
              "План под вашу реальную жизнь",
              "Контроль безопасности",
              "Анти-откат 3–6 месяцев",
            ].map((marker, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="font-medium text-foreground">{marker}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-primary mb-16">Как работает метод</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {[
              {
                step: "1",
                title: "Понимаем причины",
                description: "Диагностика метаболических и гормональных факторов.",
              },
              {
                step: "2",
                title: "Строим персональный план",
                description: 'Без режима "всё или ничего".',
              },
              {
                step: "3",
                title: "Закрепляем результат",
                description: "Сопровождение 3–6 месяцев.",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Получить план действий
            </Button>
          </div>
        </div>
      </section>

      {/* Section 4: Why Relapse Happens */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-primary mb-8 text-center">Почему откатывает</h2>
            <div className="bg-white p-8 rounded-lg border border-border">
              <p className="text-foreground/80 leading-relaxed mb-4">
                Если вес возвращался — это не слабость.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Организм защищает привычный метаболический режим.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Поэтому удержание — отдельный этап лечения.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: What We're Not */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center text-primary mb-12">Чем мы не являемся</h2>
            <div className="space-y-4 mb-8">
              {[
                "Мы не марафон.",
                "Мы не диета на силе воли.",
                "Мы не быстрый минус любой ценой.",
                "Мы не оставляем после первых результатов.",
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-lg">
                  <div className="text-primary font-bold text-xl">✕</div>
                  <p className="text-foreground/80">{text}</p>
                </div>
              ))}
            </div>
            <div className="bg-primary text-primary-foreground p-6 rounded-lg text-center">
              <p className="text-lg font-medium">Мы лечим причины и ведём до устойчивости.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Trust */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-primary mb-8">Почему нам можно доверять</h2>
              <div className="grid grid-cols-2 gap-4">
                {trustMarkers.map((marker, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    </div>
                    <p className="text-foreground/80 text-sm">{marker.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg overflow-hidden h-96">
              <img
                src={CONSULTATION_IMAGE}
                alt="Consultation room"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Who It's For */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-primary mb-12">Кому подойдёт / не подойдёт</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-6">Подойдёт:</h3>
              <ul className="space-y-3">
                {["Устали начинать заново", "Хотите удержать результат", "Нужна система"].map(
                  (item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-6">Не подойдёт:</h3>
              <ul className="space-y-3">
                {[
                  "Ищете быстро любой ценой",
                  "Нужен волшебный способ",
                  "Не готовы к наблюдению",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-destructive font-bold">✕</span>
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Stories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-primary mb-12">Истории узнавания</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {stories.map((story, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border border-border">
                <h3 className="text-foreground font-semibold mb-3">{story.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{story.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: FAQ */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-primary mb-12">Часто задаваемые вопросы</h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqItems.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/20 transition-colors"
                >
                  <span className="font-medium text-foreground text-left">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform ${
                      openFAQ === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFAQ === idx && (
                  <div className="px-6 py-4 bg-secondary/10 border-t border-border">
                    <p className="text-foreground/70">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: Anti-Relapse */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="rounded-lg overflow-hidden h-96">
              <img src={WAITING_IMAGE} alt="Waiting area" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-primary mb-6">Главное начинается после первых результатов.</h2>
              <p className="text-foreground/80 leading-relaxed mb-6">
                Мы сопровождаем 3–6 месяцев, чтобы вес не возвращался. Мониторинг, корректировки,
                поддержка в риск-точках.
              </p>
              <p className="text-foreground/70 text-sm italic">
                Это не просто программа похудения. Это переход на новый уровень здоровья.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 11: Final CTA + Form */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-primary mb-6">
                Если вы устали бороться — вам не нужно снова доказывать себе, что вы «можете».
              </h2>
              <p className="text-foreground/80 text-lg">
                Нужно понять причины и получить медицинский план.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="bg-white p-8 rounded-lg border border-border">
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Имя
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Телефон
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 999-99-99"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="bg-secondary/20 p-4 rounded-lg mb-6 text-sm text-foreground/70">
                <p className="mb-3">
                  <strong>Мы не будем «продавать».</strong>
                </p>
                <p>Сначала разберём причины и возможные решения.</p>
              </div>

              <div className="space-y-2 mb-6 text-sm text-foreground/70">
                <p>
                  <strong>Это обязательство?</strong> Нет.
                </p>
                <p>
                  <strong>Меня будут оценивать?</strong> Нет.
                </p>
                <p>
                  <strong>Можно онлайн?</strong> Да.
                </p>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Получить консультацию
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-90">
            © 2024 Клиника медицинского снижения веса «Понедельник». Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}
