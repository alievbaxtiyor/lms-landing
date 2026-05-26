<template>
  <section class="section ai-content" id="ai-content" data-screen-label="04 AI Content">
    <div class="container">
      <div class="ai-content__grid">
        <!-- LEFT: copy + checklist + supported source formats -->
        <div class="ai-content__copy">
          <span class="section-eyebrow">Nexta AI · Kontent generatsiya</span>
          <h2 class="section__title">
            AI kontent <em>yaratish</em>
          </h2>
          <p class="section__lede">
            O'z materiallaringizdan test savollari, mashqlar, rubrikalar va
            qo'shimcha tushuntirish kontentini avtomatik yarating — ochiq
            internetdan emas.
          </p>

          <ul class="ai-content__bullets">
            <li v-for="(b, i) in bullets" :key="i">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#9fe870" />
                <path
                  d="M8 12.5l2.5 2.5L16 9.5"
                  stroke="#365a1a"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>{{ b }}</span>
            </li>
          </ul>

          <div class="ai-content__sources">
            <div class="ai-content__sources-label">
              Qo'llab-quvvatlanadigan manbalar
            </div>
            <div class="ai-content__fmts">
              <span class="fmt fmt--pdf"><span class="fmt__ext">PDF</span>Hujjat</span>
              <span class="fmt fmt--docx"><span class="fmt__ext">DOCX</span>Matn</span>
              <span class="fmt fmt--pptx"><span class="fmt__ext">PPTX</span>Slayd</span>
              <span class="fmt fmt--video"><span class="fmt__ext">MP4</span>Video</span>
              <span class="fmt fmt--url"><span class="fmt__ext">URL</span>Havola</span>
            </div>
          </div>

          <div class="ai-content__stats">
            <div class="stat">
              <div class="stat__num">
                ~3<span class="stat__unit">daq</span>
              </div>
              <div class="stat__lbl">o'rtacha generatsiya vaqti</div>
            </div>
            <div class="stat">
              <div class="stat__num">
                4<span class="stat__unit">×</span>
              </div>
              <div class="stat__lbl">tezroq qo'lda yaratishdan</div>
            </div>
            <div class="stat">
              <div class="stat__num">
                100<span class="stat__unit">%</span>
              </div>
              <div class="stat__lbl">mahalliy ma'lumotlar muhofazasi</div>
            </div>
          </div>
        </div>

        <!-- RIGHT: live quiz generation card -->
        <div class="ai-content__card" ref="cardRef">
          <div class="card__head">
            <div class="card__head-left">
              <div class="card__badge">N</div>
              <div class="card__ttl">
                Algoritmlar.pdf
                <span class="card__sub">120 sahifa · tahlil qilindi</span>
              </div>
            </div>
            <span class="card__live">JONLI</span>
          </div>

          <div
            v-for="(q, i) in questions"
            :key="q.n"
            class="quiz"
            :class="{ 'is-in': visibleCount > i }"
          >
            <div class="quiz__num">SAVOL {{ q.n }}</div>
            <div class="quiz__q">{{ q.q }}</div>
            <div class="quiz__opts">
              <div
                v-for="(op, j) in q.opts"
                :key="j"
                class="quiz__op"
                :class="{ 'is-correct': j === q.correctIdx }"
              >
                <span class="quiz__op-k">
                  {{ j === q.correctIdx ? "✓" : letter(j) }}
                </span>
                {{ op }}
              </div>
            </div>
          </div>

          <span class="card__typing">
            <span class="card__typing-d"></span>
            <span class="card__typing-d"></span>
            <span class="card__typing-d"></span>
            Nexta AI generatsiya qilmoqda…
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const bullets = [
  "Test savollari, mashqlar va rubrikalar",
  "Materialdan to'g'ridan-to'g'ri, internetdan emas",
  "O'qituvchi sifat tekshiruvi bilan",
]

const questions = [
  {
    n: "01",
    q: "Big-O notatsiyasi nimani ifodalaydi?",
    opts: ["Xotira hajmi", "Vaqt murakkabligi", "Kod uzunligi", "Sintaksis"],
    correctIdx: 1,
  },
  {
    n: "02",
    q: "Quicksort eng yomon holatda qancha vaqt oladi?",
    opts: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correctIdx: 2,
  },
  {
    n: "03",
    q: "BFS qanday ma'lumot tuzilmasidan foydalanadi?",
    opts: ["Stack", "Queue", "Heap", "Set"],
    correctIdx: 1,
  },
]

const letter = (j) => String.fromCharCode(65 + j) // A, B, C, D

const cardRef = ref(null)
const visibleCount = ref(0)

let timers = []
const clearTimers = () => {
  timers.forEach(clearTimeout)
  timers = []
}

const runCycle = () => {
  clearTimers()
  visibleCount.value = 0
  // reveal each question with ~700ms delay
  questions.forEach((_, i) => {
    timers.push(
      setTimeout(() => {
        visibleCount.value = i + 1
      }, 400 + i * 700)
    )
  })
  // restart loop after a pause
  timers.push(
    setTimeout(runCycle, 400 + questions.length * 700 + 3500)
  )
}

onMounted(() => {
  // Only animate when section is visible (respects perf + reduced motion)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    visibleCount.value = questions.length
    return
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          runCycle()
        } else {
          clearTimers()
        }
      })
    },
    { threshold: 0.25 }
  )
  if (cardRef.value) obs.observe(cardRef.value)
  onBeforeUnmount(() => {
    obs.disconnect()
    clearTimers()
  })
})
</script>

<style scoped>
.ai-content {
  /* uses existing .section spacing from styles.css */
}

.ai-content__grid {
  display: grid;
  grid-template-columns: 1fr 560px;
  gap: 64px;
  align-items: start;
}

/* ---------- LEFT column ---------- */
.ai-content__copy {
  max-width: 480px;
}

.section-eyebrow {
  font-family: var(--f-mono);
  font-size: 12px;
  color: var(--accent);
  letter-spacing: .02em;
  display: block;
  margin-bottom: 12px;
}

.section__title {
  font-size: clamp(34px, 4vw, 52px);
  font-weight: 500;
  letter-spacing: -.025em;
  line-height: 1.05;
  margin: 12px 0 20px;
  text-wrap: balance;
  color: #0a0a0a;
}
.section__title em {
  font-style: normal;
  background: linear-gradient(180deg, transparent 62%, #9fe870 62%);
  padding: 0 4px;
}

.section__lede {
  font-size: 16px;
  line-height: 1.55;
  color: #7a7872;
  margin: 0;
}

.ai-content__bullets {
  list-style: none;
  padding: 0;
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.ai-content__bullets li {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  color: #0a0a0a;
  font-size: 15px;
}
.ai-content__bullets li svg {
  flex: 0 0 auto;
  margin-top: 3px;
}

/* supported source formats */
.ai-content__sources {
  margin-top: 4px;
}
.ai-content__sources-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #7a7872;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.ai-content__fmts {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.fmt {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #e7e5e4;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  color: #0a0a0a;
}
.fmt__ext {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 3px 6px;
  border-radius: 5px;
  color: #fff;
}
.fmt--pdf   .fmt__ext { background: #ef4444; }
.fmt--docx  .fmt__ext { background: #2b5fb5; }
.fmt--pptx  .fmt__ext { background: #d97706; }
.fmt--video .fmt__ext { background: #0a0a0a; }
.fmt--url   .fmt__ext { background: #9fe870; color: #365a1a; }

/* quick stats row */
.ai-content__stats {
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid #e7e5e4;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.stat {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.stat__num {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #0a0a0a;
  line-height: 1;
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.stat__unit {
  font-size: 16px;
  font-weight: 600;
  color: #365a1a;
  background: #e8f7db;
  padding: 2px 6px;
  border-radius: 5px;
  margin-left: 2px;
}
.stat__lbl {
  font-size: 12px;
  color: #7a7872;
  line-height: 1.4;
  max-width: 130px;
}

/* ---------- RIGHT column (card) ---------- */
.ai-content__card {
  background: linear-gradient(180deg, #fff 0%, #f8fdf5 100%);
  border: 1px solid #e7e5e4;
  border-radius: 18px;
  padding: 24px;
  box-shadow: 0 30px 60px -28px rgba(15, 23, 42, 0.25);
  position: relative;
  overflow: hidden;
}

.card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.card__head-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.card__badge {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: #9fe870;
  display: grid;
  place-items: center;
  color: #365a1a;
  font-weight: 800;
  font-size: 14px;
}
.card__ttl {
  font-weight: 700;
  font-size: 15px;
  color: #0a0a0a;
}
.card__sub {
  font-size: 11px;
  color: #7a7872;
  font-weight: 500;
  display: block;
  margin-top: 1px;
}
.card__live {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #365a1a;
  background: #e8f7db;
  padding: 5px 9px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.card__live::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #7bc950;
  animation: blink 1s steps(1) infinite;
}
@keyframes blink { 50% { opacity: 0.3; } }

/* quiz cards */
.quiz {
  background: #fff;
  border: 1px solid #e7e5e4;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.45s ease-out, transform 0.45s ease-out;
}
.quiz.is-in {
  opacity: 1;
  transform: translateY(0);
}
.quiz__num {
  font-size: 11px;
  font-weight: 700;
  color: #365a1a;
  letter-spacing: 0.06em;
}
.quiz__q {
  font-size: 14px;
  font-weight: 600;
  color: #0a0a0a;
  margin: 4px 0 12px;
  line-height: 1.4;
}
.quiz__opts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}
.quiz__op {
  border: 1px solid #e7e5e4;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 12px;
  color: #0a0a0a;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
}
.quiz__op-k {
  width: 18px;
  height: 18px;
  border-radius: 5px;
  background: #f5f5f4;
  display: grid;
  place-items: center;
  font-size: 10px;
  font-weight: 700;
  color: #7a7872;
  flex: 0 0 auto;
}
.quiz__op.is-correct {
  border-color: #7bc950;
  background: #f8fdf5;
}
.quiz__op.is-correct .quiz__op-k {
  background: #9fe870;
  color: #365a1a;
}

/* typing indicator */
.card__typing {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #7a7872;
  background: #f5f5f4;
  border-radius: 999px;
  padding: 6px 12px;
  margin-top: 4px;
}
.card__typing-d {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #7a7872;
  animation: dots 1.2s infinite;
}
.card__typing-d:nth-child(2) { animation-delay: 0.15s; }
.card__typing-d:nth-child(3) { animation-delay: 0.3s; }
@keyframes dots {
  0%, 80%, 100% { opacity: 0.3; transform: scale(0.7); }
  40% { opacity: 1; transform: scale(1); }
}

/* ---------- Responsive ---------- */
@media (max-width: 1024px) {
  .ai-content__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .ai-content__copy {
    max-width: 100%;
  }
  .section__title {
    font-size: 36px;
  }
}

@media (max-width: 640px) {
  .quiz__opts {
    grid-template-columns: 1fr;
  }
  .ai-content__card {
    padding: 18px;
  }
}

/* respect user motion preference */
@media (prefers-reduced-motion: reduce) {
  .quiz {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .card__live::before,
  .card__typing-d {
    animation: none;
  }
}
</style>
