<template>
  <div>
    <p style="text-align: justify; font-family: Calibri;">
      {{ index + 1 }}. {{ patent.registration_no }}: {{ patent.title }}<br />
      {{ patent.brief_report }}
    </p>
  </div>
</template>

<script>
export default {
  props: ['index','patent']
}
</script>
