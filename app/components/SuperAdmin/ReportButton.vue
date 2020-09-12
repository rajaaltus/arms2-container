<template>
  <div>
    <v-skeleton-loader v-if="loading" height="auto" type="avatar"></v-skeleton-loader>
    <v-btn v-else fab x-small :class="available.length > 0 ? 'green' : 'white'" @click="handleClick(department.id, selectedYear, month, userType)">
      <v-icon :color="available.length > 0 ? 'white' : 'grey'">mdi-file-word</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["department", "month", "selectedYear", "userType"],
  data() {
    return { available: 0, loading: false };
  },
  computed: {
    ...mapState({
      availableReports: (state) => state.report.availableReports,
    }),
  },
  async mounted() {
    await this.checkReport(this.department.id, this.month, this.selectedYear, this.userType);
  },
  methods: {
    async checkReport(id, month, selectedYear, userType, $axios) {
      this.loading = true;
      // console.log(id, month)
      this.available = await this.$axios.$get(
        `${this.$axios.defaults.baseURL}/saved-reports?annual_year=${selectedYear}&userType=${userType}&department.id=${id}&Month=${month}`
      );
      console.log(this.available.length);
      this.loading = false;
    },
    handleClick(id, year, month, userType){
      console.log(id, year, month, userType);
      // console.log('clicked')
    },
  },
};
</script>
