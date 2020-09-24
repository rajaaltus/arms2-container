<template>
  <div>
    <p style="text-align: justify; font-family: Calibri;">
      {{ index + 1 }}. {{ visitor.name }}, {{ visitor.designation }}, {{ visitor.institutional_affiliation }}, visited the Dept. of {{ deptartmentName }} and delivered a lecture on '{{ visitor.title }}' from
      {{ $moment(visitor.from_date).format("Do MMMM YYYY") }} to {{ $moment(visitor.to_date).format("Do MMMM YYYY") }}.
    </p>
  </div>
</template>

<script>
export default {
  props: ['index','visitor','deptartmentName'],
};
</script>
