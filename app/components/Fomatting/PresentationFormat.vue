<template>
  <div>
    <p style="text-align: justify; font-family: Calibri;">{{ index + 1 }}. {{ presentation.faculty_name }}, {{ presentation.coauthors }}. {{ presentation.title }}. ({{ presentation.forum }})</p>
  </div>
</template>

<script>
export default {
  props: ['index','presentation']
}
</script>