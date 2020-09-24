<template>
  <div>
    <p style="text-align: justify; font-family: Calibri;">
      {{ index + 1 }}. {{ participation.faculty_name }}, {{ participation.designation }}. {{ participation.program_name }} from {{ $moment(participation.from_date).format("Do MMMM YYYY") }} to
      {{ $moment(participation.to_date).format("Do MMMM YYYY") }}. ({{ participation.forum }})
    </p>
  </div>
</template>

<script>
export default {
  props: ['index', 'participation']
}
</script>
