<template>
  <div>
    <p style="text-align: justify; font-family: Calibri;">
      {{ index + 1 }}. {{ coordinators }}. {{ type.toUpperCase() }}, {{ name.toUpperCase() }}, {{ location }}, {{ $moment(from_date).format("Do MMMM YYYY") }} to {{ $moment(to_date).format("Do MMMM YYYY") }}.
      {{ participants_count }} members participated. ({{ forum }})
    </p>
    <!-- <p><u>Brief Report:</u></b> {{ program.brief_report }}<p> -->
    <p><img :src="image?$axios.defaults.baseURL + image.url : ''" alt="program" width="350" height="350" /></p>
  </div>
</template>

<script>
export default {
  props: ["index", "forum", "type", "name", "location", "from_date", "to_date", "coordinators", "colloborations", "participants_count","image","brief_report"],
};
</script>


