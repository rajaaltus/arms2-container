<template>
  <div>
    <p style="text-align: justify; font-family: Calibri;">
      {{ index + 1 }}. {{ publicE.faculty_name }}. {{ publicE.title }}, {{ publicE.program_name }}, {{ publicE.place }}, {{ $moment(publicE.date).format("Do MMMM YYYY") }}. Target Group: {{ publicE.target_audience }}.
    </p>
  </div>
</template>

<script>
export default {
  props: ['index', 'publicE']
}
</script>
