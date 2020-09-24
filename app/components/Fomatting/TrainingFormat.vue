<template>
  <div>
    <p style="text-align: justify; font-family: Calibri;">
      {{ index + 1 }}. {{ training.faculty_name }}. {{ training.program_name }}, {{ training.institutional_affiliation }} from {{ $moment(training.from_date).format("Do MMMM YYYY") }} to
      {{ $moment(training.to_date).format("Do MMMM YYYY") }}.
    </p>
  </div>
</template>

<script>
export default {
  props: ['index','training']
}
</script>
