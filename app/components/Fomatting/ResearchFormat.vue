<template>
  <div>
    <p style="text-align: justify; font-family: Calibri;">{{ index + 1 }}. {{ research.title }}. Co-Investigators: {{ research.investigator_name }}.</p>
    <p style="font-family: Calibri;">({{ research.funding_source }}, {{ research.funding_agency }})</p>
    <p style="text-align: justify; font-family: Calibri;">
      {{ research.research_abstract }}
    </p>
  </div>
</template>

<script>
export default {
  props: ['index','research']
}
</script>
