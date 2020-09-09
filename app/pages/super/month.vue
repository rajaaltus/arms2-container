<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" lg="3">
          <v-select label="Reporting Year" v-model="selectedYear" placeholder="Pick Reporting Year" :items="reportYears" item-text="val" item-value="id" color="success"></v-select>
        </v-col>
        <v-col cols="12" lg="3">
          <v-select :items="items" label="User Type" placeholder="Select" color="success"></v-select>
        </v-col>
        <v-col cols="auto" lg="auto">
          <v-row>
            <v-layout align-start justify-start>
              <v-btn v-if="selectedYear" :loading="loading" :disabled="loading" color="green" x-small class="mt-6 mr-1 white--text" fab @click="loader()">
                Go
              </v-btn>
              <v-tooltip right color="blue-grey darken-2">
                <template v-slot:activator="{ on }">
                  <v-btn color="blue-grey" fab x-small class="mt-6 white--text" dark @click="resetFilter" v-on="on">
                    <v-icon>mdi-reload</v-icon>
                  </v-btn>
                </template>
                <span>Reset Filter</span>
              </v-tooltip>
            </v-layout>
          </v-row>
        </v-col>
      </v-row>
      <v-simple-table fixed-header height="auto">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">DEPARTMENTS</th>
              <th class="text-center">APR</th>
              <th class="text-center">MAY</th>
              <th class="text-center">JUN</th>
              <th class="text-center">JUL</th>
              <th class="text-center">AUG</th>
              <th class="text-center">SEP</th>
              <th class="text-center">OCT</th>
              <th class="text-center">NOV</th>
              <th class="text-center">DEC</th>
              <th class="text-center">JAN</th>
              <th class="text-center">FEB</th>
              <th class="text-center">MAR</th>
              <th class="text-center">ANNUAL REPORT</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="department in departments" :key="department.id">
              <td>{{department.name}}</td>
              <td class="text-center">
                <v-btn fab x-small color="{selectedYear?'success':'white'}">
                  <v-icon>mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="{selectedYear?'success':'white'}">
                  <v-icon>mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="{selectedYear?'success':'white'}">
                  <v-icon>mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="{selectedYear?'success':'white'}">
                  <v-icon>mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="{selectedYear?'success':'white'}">
                  <v-icon>mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small>
                  <v-icon color="{selectedYear?'success':'white'}">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small>
                  <v-icon color="{selectedYear?'success':'white'}">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small>
                  <v-icon color="{selectedYear?'success':'white'}">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small>
                  <v-icon color="{selectedYear?'success':'white'}">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small>
                  <v-icon color="{selectedYear?'success':'white'}">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small>
                  <v-icon color="{selectedYear?'success':'white'}">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small>
                  <v-icon color="{selectedYear?'success':'white'}">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small>
                  <v-icon color="{selectedYear?'success':'white'}">mdi-download</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>
</template>
<script>
export default {
  layout: "super",
  data: () => ({
    dense: false,
    fixedHeader: false,
    selectedYear: 0,
    loading: false,
    height: 300,
    items: ["Faculty", "Student"],
  }),
  computed: {
    reportYears() {
      return this.$store.state.reportYears;
    },
    departments() {
     return this.$store.state.department.departments; 
    }
  },
  async fetch({store}) {
    await store.dispatch('department/getDepartments')
  },
  methods: {
    loader() {
      console.log("This is loader");
    },
    resetFilter() {
      console.log('This is reset Filter')
    }
  },
};
</script>

<style scoped>
tr {
  height: 60px;
}
</style>
