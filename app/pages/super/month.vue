<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" lg="3">
          <v-select
            label="Reporting Year"
            placeholder="Pick Reporting Year"
            color="success"
          ></v-select>
        </v-col>
        <v-col cols="12" lg="3">
          <v-select :items="items" label="User Type" placeholder="Select"
            color="success"></v-select>
        </v-col>
        <v-col cols="auto" lg="auto">
        <v-row>
          <v-layout align-start justify-start>
            <v-btn
              v-if="selectedYear"
              :loading="loading"
              :disabled="loading"
              color="green"
              x-small
              class="mt-6 mr-1 white--text"
              fab
              @click="loader()"
            >
              Go
            </v-btn>
            <v-tooltip right color="blue-grey darken-2">
              <template v-slot:activator="{ on }">
                <v-btn
                  color="blue-grey"
                  fab
                  x-small
                  class="mt-6 white--text"
                  dark
                  @click="resetFilter"
                  v-on="on"
                >
                  <v-icon>mdi-reload</v-icon>
                </v-btn>
              </template>
              <span>Reset Filter</span>
            </v-tooltip>
          </v-layout>
        </v-row>
      </v-col>
      </v-row>
      <v-simple-table fixed-header="fixedHeader" height="auto">
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
            <tr>
              <td>Biophysics</td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-download</v-icon>
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Biostatistics</td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-download</v-icon>
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Clinical Neurosciences</td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="white" disabled>
                  <v-icon color="success">mdi-download</v-icon>
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Clinical Psychology</td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="success" dark>
                  <v-icon color="white">mdi-file-word</v-icon>
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn fab x-small color="error">
                  <v-icon color="white">mdi-download</v-icon>
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Epidemiology</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Human Genetics</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Mental Health Education</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
    height: 300,
    items: ["Faculty", "Student"],
  }),
};
</script>

<style scoped>
tr {
  height: 60px;
}
</style>
