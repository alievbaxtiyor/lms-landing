<script setup lang="ts">
// Integrations — bento grid. Cards are intentionally empty for now.
// Layout (4 cols x 2 rows, 268px cells, 16px gap):
//   row 1: [big horizontal (2)] [small] [vertical (rows 1-2)]
//   row 2: [small]              [big horizontal (2)]  ^continues
</script>

<template>
  <section class="bg-white text-[#0B0E04]">
    <div class="mx-auto max-w-330 px-8 py-20">
      <!-- Header -->
      <div class="max-w-185.25">
        <h2 class="font-sf text-[48px] font-semibold leading-14 tracking-[0.01em] text-[#0B0E04]">
          Muassasangiz ishlatadigan<br />
          tizimlarga allaqachon ulangan
        </h2>
        <p
          class="mt-4 font-sf text-[16px] font-normal leading-5.5 tracking-[0.02em] text-[#333333]"
        >
          Birinchi darajali HEMIS amalga oshirilishi, ANTIPLAG.UZ bilan akademik halollik, sertifikatlangan<br />
          Microsoft va Zoom integratsiyalari.
        </p>
      </div>

      <!-- Bento grid -->
      <div
        class="mt-16 grid auto-rows-[268px] grid-cols-[repeat(4,minmax(0,268px))] justify-start gap-4"
      >
        <!-- row 1: big horizontal -->
        <div class="col-span-2 rounded-3xl bg-[#F4F4F4]"></div>
        <!-- row 1: small -->
        <div class="rounded-3xl bg-[#F4F4F4]"></div>
        <!-- col 4: big vertical (spans both rows) -->
        <div class="row-span-2 rounded-3xl bg-[#F4F4F4]"></div>
        <!-- row 2: small -->
        <div class="rounded-3xl bg-[#F4F4F4]"></div>
        <!-- row 2: big horizontal -->
        <div class="col-span-2 rounded-3xl bg-[#F4F4F4]"></div>
      </div>
    </div>
  </section>
</template>
