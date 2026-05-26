<template>
  <section class="section integrations" id="integrations" data-screen-label="07 Integrations">
    <div class="container">
      <div class="section__head section__head--split">
        <div>
          <div class="section-eyebrow">— Integratsiyalar</div>
          <h2 class="section__title">
            Muassasangiz allaqachon ishlatadigan<br />tizimlarga ulangan.
          </h2>
        </div>
        <p class="section__lede section__lede--right">
          Birinchi darajali HEMIS amalga oshirilishi, ANTIPLAG.UZ bilan
          akademik halollik, sertifikatlangan Microsoft va Zoom integratsiyalari,
          AI ta'minotchilar shlyuzi va mintaqadagi har bir asosiy elektron
          kutubxona tizimiga adapterlar.
        </p>
      </div>

      <div class="integrations__wall">
        <!-- ============================================================
             HEMIS ⇌ LMS · labeled packet pipeline (full-width)
             ============================================================ -->
        <div class="ig ig--lg ig--hemis">
          <div class="ig__mk">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
              <rect x="2" y="3" width="20" height="18" rx="2" />
            </svg>
          </div>

          <div class="hl-stage">
            <div class="hl-endpoints">
              <!-- HEMIS endpoint -->
              <div class="ep ep--left">
                <div class="ep__logo ep__logo--hemis">HEMIS</div>
                <div>
                  <div class="ep__name">HEMIS</div>
                  <div class="ep__sub">
                    <span class="ep__dot"></span>
                    vazirlik tizimi
                  </div>
                </div>
              </div>

              <!-- LMS endpoint -->
              <div class="ep ep--right">
                <div class="ep__logo ep__logo--lms">LMS</div>
                <div>
                  <div class="ep__name">LMS.uz</div>
                  <div class="ep__sub">
                    <span class="ep__dot"></span>
                    real-time
                  </div>
                </div>
              </div>
            </div>

            <!-- Two-way labeled packet channel -->
            <div class="a-channel">
              <div class="a-track a-track--t1"></div>
              <div class="a-track a-track--t2"></div>

              <span class="a-dirlabel a-dirlabel--top">
                HEMIS<span class="a-dirlabel__ar">→</span>LMS
              </span>
              <span class="a-dirlabel a-dirlabel--bot">
                LMS<span class="a-dirlabel__ar">→</span>HEMIS
              </span>

              <!-- Right-going packets (HEMIS → LMS) -->
              <span
                v-for="(p, i) in packetsRight"
                :key="'r' + i"
                class="a-pkt"
                :class="`a-pkt--r${i + 1}`"
              >
                <span class="a-pkt__ic">{{ p.ic }}</span>{{ p.t }}
              </span>

              <!-- Left-going packets (LMS → HEMIS) -->
              <span
                v-for="(p, i) in packetsLeft"
                :key="'l' + i"
                class="a-pkt"
                :class="`a-pkt--l${i + 1}`"
              >
                <span class="a-pkt__ic">{{ p.ic }}</span>{{ p.t }}
              </span>
            </div>
          </div>

          <div class="ig__caption">
            <b>HEMIS sinxronizatsiyasi</b>
            <span>
              Mahalliy, sertifikatlangan. Talabalar, guruhlar va o'quv reja
              HEMIS'dan keladi; baholar, davomat va transkriptlar real vaqtda
              qaytariladi — tungi paket holda emas.
            </span>
          </div>
        </div>

        <!-- ============================================================
             Zoom
             ============================================================ -->
        <div class="ig">
          <div class="ig__mk">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15.5 1h-7l-1 2-3.5 1v7l3.5 1 1 2h7l1-2 3.5-1V4l-3.5-1-1-2z" />
              <circle cx="12" cy="9" r="3" />
            </svg>
          </div>
          <div class="zoom-mini">
            <div class="zoom-mini__pulse">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
                <path d="m23 7-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" />
              </svg>
            </div>
          </div>
          <div class="ig__caption">
            <b>Zoom</b>
            <span>
              Har bir mashg'ulotga avtomatik uchrashuv yaratiladi va talabalar
              uchun kirish havola beriladi.
            </span>
          </div>
        </div>

        <!-- ============================================================
             ANTIPLAG.UZ — YANGI
             ============================================================ -->
        <div class="ig">
          <div class="ig__mk">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
          <div class="ap-visual">
            <div class="ap-doc">
              <div class="ap-doc__h"></div>
              <div class="ap-doc__l ap-doc__l--w1"></div>
              <div class="ap-doc__l ap-doc__l--w2 ap-doc__l--match"></div>
              <div class="ap-doc__l ap-doc__l--w1"></div>
              <div class="ap-doc__l ap-doc__l--w3"></div>
              <div class="ap-doc__l ap-doc__l--w1 ap-doc__l--match"></div>
              <div class="ap-doc__l ap-doc__l--w2"></div>
              <div class="ap-doc__l ap-doc__l--w3"></div>
              <div class="ap-doc__l ap-doc__l--w1"></div>
            </div>
            <div class="ap-scan"></div>
            <div class="ap-result">
              <span class="ap-result__ok">✓</span>
              <span class="ap-result__pct">94%</span>
              <span>original</span>
            </div>
          </div>
          <div class="ig__caption">
            <b>ANTIPLAG.UZ</b>
            <span>
              Davlat darajasidagi plagiat tekshiruvi. Talaba ishlari avtomatik
              yuboriladi, hisobot bir necha soniyada qaytadi.
            </span>
          </div>
        </div>

        <!-- ============================================================
             E-kutubxona
             ============================================================ -->
        <div class="ig">
          <div class="ig__mk">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <div class="lib-mini">
            <div class="lib-mini__stack">
              <div class="lib-mini__bk"></div>
              <div class="lib-mini__bk"></div>
              <div class="lib-mini__bk"></div>
              <div class="lib-mini__bk"></div>
            </div>
          </div>
          <div class="ig__caption">
            <b>E-kutubxona</b>
            <span>
              EBSCO, Springer, JSTOR, ZiyoNET va boshqa elektron kutubxonalar
              bilan integratsiya.
            </span>
          </div>
        </div>

        <!-- ============================================================
             To'lovlar
             ============================================================ -->
        <div class="ig">
          <div class="ig__mk">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="4" width="22" height="16" rx="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          </div>
          <div class="pay-mini">
            <div class="pay-mini__row">
              <span class="pay-mini__card pay-mini__card--cl">CLICK</span>
              <span class="pay-mini__card pay-mini__card--pm">PAYME</span>
              <span class="pay-mini__card pay-mini__card--uz">UZCARD</span>
              <span class="pay-mini__card pay-mini__card--hm">HUMO</span>
            </div>
          </div>
          <div class="ig__caption">
            <b>To'lovlar</b>
            <span>
              Click, Payme, Uzcard, HUMO va boshqa to'lov tizimlari bilan
              integratsiya.
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const packetsRight = [
  { ic: '👥', t: "Talabalar ro'yxati" },
  { ic: '📚', t: "O'quv reja" },
  { ic: '🎓', t: 'Guruhlar' },
]

const packetsLeft = [
  { ic: '💯', t: 'Baholar' },
  { ic: '📄', t: 'Transkriptlar' },
  { ic: '📊', t: 'Davomat' },
]
</script>

<style scoped>
/* ============================================================
   HEMIS ⇌ LMS — big card override
   ============================================================ */
.ig--hemis {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* ====== Stage ====== */
.hl-stage {
  position: relative;
  background: linear-gradient(135deg, #f8fdf5 0%, #e8f7db 100%);
  border-radius: 14px;
  padding: 28px;
  overflow: hidden;
  min-height: 240px;
}
.hl-endpoints {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  height: 100%;
  position: relative;
  z-index: 2;
}

/* Endpoint card */
.ep {
  background: #fff;
  border: 1px solid #e7e5e4;
  border-radius: 12px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  width: fit-content;
  box-shadow: 0 12px 24px -16px rgba(15, 23, 42, 0.18);
}
.ep--left { justify-self: start; }
.ep--right { justify-self: end; }

.ep__logo {
  width: 46px;
  height: 46px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 0.04em;
  color: #fff;
  flex: 0 0 auto;
}
.ep__logo--hemis {
  background: linear-gradient(135deg, #1e40af, #3b82f6);
}
.ep__logo--lms {
  background: linear-gradient(135deg, #7bc950, #9fe870);
  color: #365a1a;
}

.ep__name {
  font-weight: 700;
  font-size: 16px;
  color: #0a0a0a;
}
.ep__sub {
  font-size: 11px;
  color: #7a7872;
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 5px;
}
.ep__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #7bc950;
  animation: ep-blink 1.4s steps(1) infinite;
}
@keyframes ep-blink {
  50% { opacity: 0.3; }
}

/* ====== Channel ====== */
.a-channel {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 55%;
  height: 160px;
  z-index: 1;
}

.a-track {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: repeating-linear-gradient(
    90deg,
    #7bc950 0 6px,
    transparent 6px 12px
  );
  opacity: 0.5;
}
.a-track--t1 { top: 30%; }
.a-track--t2 { top: 70%; }

.a-dirlabel {
  position: absolute;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #365a1a;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(4px);
  padding: 3px 8px;
  border-radius: 999px;
}
.a-dirlabel--top {
  top: 8%;
  left: 50%;
  transform: translateX(-50%);
}
.a-dirlabel--bot {
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%);
}
.a-dirlabel__ar {
  display: inline-block;
  margin: 0 4px;
}

/* Packets */
.a-pkt {
  position: absolute;
  background: #fff;
  border: 1px solid #e7e5e4;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 600;
  color: #0a0a0a;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 6px 14px -8px rgba(15, 23, 42, 0.2);
  will-change: left, opacity;
}
.a-pkt__ic { font-size: 13px; }

.a-pkt--r1 { top: calc(30% - 16px); animation: pkt-move-r 4.8s linear infinite; }
.a-pkt--r2 { top: calc(30% - 16px); animation: pkt-move-r 4.8s linear 1.6s infinite; }
.a-pkt--r3 { top: calc(30% - 16px); animation: pkt-move-r 4.8s linear 3.2s infinite; }
.a-pkt--l1 { top: calc(70% - 16px); animation: pkt-move-l 4.8s linear 0.8s infinite; }
.a-pkt--l2 { top: calc(70% - 16px); animation: pkt-move-l 4.8s linear 2.4s infinite; }
.a-pkt--l3 { top: calc(70% - 16px); animation: pkt-move-l 4.8s linear 4.0s infinite; }

@keyframes pkt-move-r {
  0%   { left: -5%;  opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}
@keyframes pkt-move-l {
  0%   { left: 100%; opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { left: -30%; opacity: 0; }
}

/* ====== Caption override ====== */
.ig--hemis .ig__caption b {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 6px;
  display: block;
  color: #0a0a0a;
}
.ig--hemis .ig__caption span {
  font-size: 14px;
  color: #7a7872;
  line-height: 1.5;
}

/* ============================================================
   ANTIPLAG.UZ visual
   ============================================================ */
.ap-visual {
  height: 140px;
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  margin-top: 12px;
}
.ap-doc {
  position: relative;
  width: 84px;
  height: 108px;
  background: #fff;
  border: 1px solid #e7e5e4;
  border-radius: 6px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  box-shadow: 0 8px 16px -8px rgba(15, 23, 42, 0.15);
}
.ap-doc::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #ef4444, #9fe870 60%, #7bc950);
  border-radius: 6px 6px 0 0;
}
.ap-doc__h {
  height: 5px;
  background: #0a0a0a;
  border-radius: 2px;
  width: 60%;
  opacity: 0.85;
}
.ap-doc__l {
  height: 3.5px;
  background: #e7e5e4;
  border-radius: 2px;
}
.ap-doc__l--w1 { width: 90%; }
.ap-doc__l--w2 { width: 78%; }
.ap-doc__l--w3 { width: 50%; }
.ap-doc__l--match { background: #fee2e2; }

.ap-scan {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 24px;
  background: linear-gradient(
    180deg,
    rgba(159, 232, 112, 0) 0%,
    rgba(159, 232, 112, 0.45) 50%,
    rgba(159, 232, 112, 0) 100%
  );
  animation: ap-scan 2.4s ease-in-out infinite;
}
@keyframes ap-scan {
  0%   { top: 30%; }
  50%  { top: 70%; }
  100% { top: 30%; }
}
.ap-result {
  position: absolute;
  right: 14px;
  top: 14px;
  background: #fff;
  border: 1px solid #e7e5e4;
  border-radius: 8px;
  padding: 6px 9px;
  font-size: 11px;
  font-weight: 700;
  color: #365a1a;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 10px -4px rgba(15, 23, 42, 0.15);
}
.ap-result__ok {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #9fe870;
  display: grid;
  place-items: center;
  color: #365a1a;
  font-size: 9px;
  font-weight: 900;
}
.ap-result__pct {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 13px;
  color: #0a0a0a;
}

/* ============================================================
   Other secondary visuals (Zoom, library, payments)
   ============================================================ */
.zoom-mini {
  height: 120px;
  display: grid;
  place-items: center;
  position: relative;
  margin-top: 12px;
}
.zoom-mini__pulse {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  background: #2563eb;
  display: grid;
  place-items: center;
  color: #fff;
  position: relative;
}
.zoom-mini__pulse::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background: #2563eb;
  animation: zoom-pulse 2.2s ease-out infinite;
  opacity: 0;
}
@keyframes zoom-pulse {
  0%   { transform: scale(1); opacity: 0.45; }
  100% { transform: scale(1.55); opacity: 0; }
}

.lib-mini {
  height: 120px;
  display: grid;
  place-items: center;
  position: relative;
  margin-top: 12px;
}
.lib-mini__stack {
  display: flex;
}
.lib-mini__bk {
  width: 28px;
  height: 80px;
  border-radius: 3px 6px 6px 3px;
  margin-left: -2px;
  border: 1px solid #e7e5e4;
}
.lib-mini__bk:nth-child(1) { background: #fef3c7; }
.lib-mini__bk:nth-child(2) { background: #bfdbfe; }
.lib-mini__bk:nth-child(3) { background: #fecaca; }
.lib-mini__bk:nth-child(4) { background: #d9f99d; }

.pay-mini {
  height: 120px;
  display: grid;
  place-items: center;
  position: relative;
  margin-top: 12px;
}
.pay-mini__row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}
.pay-mini__card {
  width: 54px;
  height: 34px;
  border-radius: 6px;
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.04em;
}
.pay-mini__card--cl { background: #0a85ff; }
.pay-mini__card--pm { background: #1ec0ff; }
.pay-mini__card--uz { background: #005abf; }
.pay-mini__card--hm { background: #10b981; }

/* ============================================================
   Wall layout — make HEMIS card span full row
   ============================================================ */
.integrations__wall {
  /* Inherits 2-col grid from styles.css; we just override the HEMIS span */
}
.ig--hemis {
  grid-column: span 2;
}

/* ============================================================
   Responsive
   ============================================================ */
@media (max-width: 1024px) {
  .ig--hemis { grid-column: span 1; }
  .a-channel { width: 70%; height: 130px; }
  .ep { padding: 12px 14px; gap: 10px; }
  .ep__logo { width: 40px; height: 40px; font-size: 12px; }
  .ep__name { font-size: 14px; }
}

@media (max-width: 720px) {
  .hl-stage { padding: 20px; min-height: 220px; }
  .a-channel { width: 80%; }
  .a-pkt { font-size: 11px; padding: 5px 8px; }
}

/* ============================================================
   Reduced motion
   ============================================================ */
@media (prefers-reduced-motion: reduce) {
  .a-pkt,
  .ep__dot,
  .ap-scan,
  .zoom-mini__pulse::after {
    animation: none;
  }
  /* Pin packets to visible positions so the static state still reads */
  .a-pkt--r1, .a-pkt--r2, .a-pkt--r3 { left: 30%; opacity: 1; }
  .a-pkt--l1, .a-pkt--l2, .a-pkt--l3 { left: 50%; opacity: 1; }
}
</style>
