<template>
  <section class="demo-shell">
    <article class="demo-shell__card">
      <p>Open this file in the IDE to see Stylelint diagnostics.</p>
    </article>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.demo-shell {
  padding: 20px;
}

.demo-shell__card {
  border: 1px solid #ddd;
}

/* stylelint-disable selector-class-pattern, comment-empty-line-before */
/* should report: Tailwind utility selector */
.text-center {
  text-align: center;
}

/* should report: Tailwind utility selector */
.sm\:hidden {
  display: none;
}
/* stylelint-enable selector-class-pattern, comment-empty-line-before */
</style>

<style lang="scss" scoped>
.demo-stack {
  gap: 12px;
}

/* stylelint-disable selector-class-pattern, comment-empty-line-before */
/* should report: Tailwind utility selector */
.justify-between {
  justify-content: space-between;
}

/* should report: Tailwind utility selector */
.lg\:grid {
  display: grid;
}
/* stylelint-enable selector-class-pattern, comment-empty-line-before */
</style>
