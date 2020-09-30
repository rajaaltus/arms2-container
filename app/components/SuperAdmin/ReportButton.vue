<template>
  <div>
    <v-skeleton-loader v-if="loading" height="auto" type="avatar"></v-skeleton-loader>
    <v-btn :disabled="!available.length>0" v-else fab x-small :class="available.length > 0 ? 'green' : 'white'" @click="handleClick(department.id, selectedYear, month, userType)">
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
      aboutData: (state) => state.about.newAbout[0],
      clinicalData: (state) => state.clinical.clinicalData.result,
      emergencyData: (state) => state.emergency.emergencyData,
      diagnosticsData: (state) => state.diagnostic.diagnosticData,
      specialData: (state) => state.special.specialData,
      otservicesData: (state) => state.otservice.otservicesData,
      hrdCourses: (state) => state.hrdCourse.hrdCourses.result,
      hrdTrainings: (state) => state.hrdTraining.hrdTrainings.result,
      retaired: (state) => state.faculty.facultyData.result,
    }),
    formattedAbout() {
      if (this.aboutData) {
        return `
      <center>
      <h2>NATIONAL INSTITUTE OF MENTAL HEALTH &amp; NEUROSCIENCES</h2>
      <h3>Bengaluru – 560029</h3>
      <h2>Period of the report:1st April ${this.$store.state.selectedYear} to 31st March ${this.$store.state.selectedYear + 1}</h2>
      </center>
      <h1><b><u>Section A:</u></b></h1>
      <h3>1. ABOUT THE DEPARTMENT</h3>
      <h3>A. Introduction: Specifically indicate the recognition / contribution of the Department during the year to policies, planning and programmes at State / National and International levels.</h3>
      <p>${this.aboutData.introduction}</p>
      <h3>B. New facilities developed: New initiatives taken up by the Department(s) within NIMHANS during the year.</h3>
      <p>${this.aboutData.facilities}</p>
      `;
      } else {
        return "";
      }
    },
    formattedClinical() {
      let sum = 0;
      // console.log(this.clinicalData);
      if (this.clinicalData.length > 0) {
        return `

      <h3>2. PATIENT CARE ACTIVITIES</h3>
      <h3> A. Clinical Services</h3>
      <table>
      <thead>
      <tr>
      <th style="border: 1px solid #dddddd;">Clinical Services</th>
      <th style="border: 1px solid #dddddd;">No. of Patients / Cases</th>
      </tr>
      <thead>

      <tbody>
      <tr>
      <td style="border: 1px solid #dddddd;">Screenings</td>
      <td style="border: 1px solid #dddddd;">${this.clinicalData.reduce((sum, item) => sum + item.screenings, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">Registrations</td>
      <td style="border: 1px solid #dddddd;">${this.clinicalData.reduce((sum, item) => sum + item.registrations, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">followups</td>
      <td style="border: 1px solid #dddddd;">${this.clinicalData.reduce((sum, item) => sum + item.followups, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">Admissions</td>
      <td style="border: 1px solid #dddddd;">${this.clinicalData.reduce((sum, item) => sum + item.admissions, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">Discharges</td>
      <td style="border: 1px solid #dddddd;">${this.clinicalData.reduce((sum, item) => sum + item.discharges, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">Deaths</td>
      <td style="border: 1px solid #dddddd;">${this.clinicalData.reduce((sum, item) => sum + item.deaths, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">Emergencies</td>
      <td style="border: 1px solid #dddddd;">${this.clinicalData.reduce((sum, item) => sum + item.emergencies, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">External Reference</td>
      <td style="border: 1px solid #dddddd;">${this.clinicalData.reduce((sum, item) => sum + item.external_ref, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">Internal Reference</td>
      <td style="border: 1px solid #dddddd;">${this.clinicalData.reduce((sum, item) => sum + item.internal_ref, 0)}</td>
      </tr>
      </tbody>
      </table>
      `;
      } else {
        return "";
      }
    },
    formattedEmergency() {
      let sum = 0;
      if (this.emergencyData.length > 0) {
        return `
      <h3> B. Emergency Services</h3>
      <table>
      <tr>
      <th style="border: 1px solid #dddddd;">Emergency Services</th>
      <th style="border: 1px solid #dddddd;">No.Of Patients /Cases</th>
      </tr>

      <td style="border: 1px solid #dddddd;">Registrations</td>
      <td style="border: 1px solid #dddddd;">${this.emergencyData.reduce((sum, item) => sum + item.registrations, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">Admissions</td>
      <td style="border: 1px solid #dddddd;">${this.emergencyData.reduce((sum, item) => sum + item.admissions, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">Deaths</td>
      <td style="border: 1px solid #dddddd;">${this.emergencyData.reduce((sum, item) => sum + item.deaths, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">External Reference</td>
      <td style="border: 1px solid #dddddd;">${this.emergencyData.reduce((sum, item) => sum + item.external_ref, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">Internal Reference</td>
      <td style="border: 1px solid #dddddd;">${this.emergencyData.reduce((sum, item) => sum + item.internal_ref, 0)}</td>
      </tr>
      </table>
      `;
      } else {
        return "";
      }
    },
    formattedDiagnostics() {
      let sum = 0;
      if (this.diagnosticsData.length > 0) {
        var html = `
      <h3> C. Diagnostic Services</h3>
      <table>
      <tr>
      <th style="border: 1px solid #dddddd;">Lab Services</th>
      <th style="border: 1px solid #dddddd;">Total No.Of Samples Analyzed</th>
      </tr>`;
        for (var i = 0; i < this.diagnosticsData.length; i++) {
          let sum = 0;
          html += `<tr>
      <td style="border: 1px solid #dddddd;">${this.diagnosticsData[i].pc_diagnostic_test.test_name}</td>
      <td style="border: 1px solid #dddddd;">${this.diagnosticsData[i].samples_analyzed}</td>
      </tr>`;
        }
        html += `</table>
      `;
        return html;
      } else {
        return "";
      }
    },
    formattedSpecial() {
      if (this.specialData.length > 0) {
        var html = `
      <h3>D. Special Clinics / Services / Procedures</h3>
      <table>
      <tr>
      <th style="border: 1px solid #dddddd;">Special Services</th>
      <th style="border: 1px solid #dddddd;">New Patients</th>
      <th style="border: 1px solid #dddddd;">Follow-up Patients</th>
      <th style="border: 1px solid #dddddd;">Referrals</th>
      <th style="border: 1px solid #dddddd;">Description</th>
      </tr>`;
        for (var i = 0; i < this.specialData.length; i++) {
          let sum = 0;
          html += `<tr>
      <td style="border: 1px solid #dddddd;">${this.specialData[i].service_name}</td>
      <td style="border: 1px solid #dddddd;">${this.specialData[i].new_patients}</td>
      <td style="border: 1px solid #dddddd;">${this.specialData[i].followup_patients}</td>
      <td style="border: 1px solid #dddddd;">${this.specialData[i].referrals}</td>
      <td style="border: 1px solid #dddddd;">${this.specialData[i].description}</td>
      </tr>`;
        }
        html += `</table>
      `;
        return html;
      } else {
        return "";
      }
    },
    formattedOT() {
      if (this.otservicesData.length > 0) {
        var html = `
      <h3>E.	OT & Other Procedures</h3>
      <table>
      <tr>
      <th style="border: 1px solid #dddddd;">Procedure Name</th>
      <th style="border: 1px solid #dddddd;">Classification</th>
      <th style="border: 1px solid #dddddd;">No of Patients</th>
      <th style="border: 1px solid #dddddd;">Description</th>
      </tr>`;
        for (var i = 0; i < this.otservicesData.length; i++) {
          let sum = 0;
          html += `<tr>
      <td style="border: 1px solid #dddddd;">${this.otservicesData[i].Procedure}</td>
      <td style="border: 1px solid #dddddd;">${this.otservicesData[i].classification}</td>
      <td style="border: 1px solid #dddddd;">${this.otservicesData[i].no_of_patients}</td>
      <td style="border: 1px solid #dddddd;">${this.otservicesData[i].description}</td>
      </tr>`;
        }
        html += `</table>
      `;
        return html;
      } else {
        return "";
      }
    },
    formattedHRD() {
      if (this.hrdCourses.length > 0) {
        var html = `
      <h3>3.	HUMAN RESOURCE DEVELOPMENT </h3>
      <h3>A.	Details of Regular Courses</h3>
      <table>
      <tr>
      <th style="border: 1px solid #dddddd;">Course</th>
      <th style="border: 1px solid #dddddd;">Name of the Candidate</th>
      <th style="border: 1px solid #dddddd;">Duration</th>
      <th style="border: 1px solid #dddddd;">Status</th>
      <th style="border: 1px solid #dddddd;">Title of the thesis (If any)</th>
      <th style="border: 1px solid #dddddd;">Guide(s)(If any)</th>
      </tr>`;
        for (var i = 0; i < this.hrdCourses.length; i++) {
          let sum = 0;
          html += `<tr>
      <td style="border: 1px solid #dddddd;">${this.hrdCourses[i].course_name}</td>
      <td style="border: 1px solid #dddddd;">${this.hrdCourses[i].candidate_name}</td>
      <td style="border: 1px solid #dddddd;">${this.hrdCourses[i].durations} Years</td>
      <td style="border: 1px solid #dddddd;">${this.hrdCourses[i].remarks_status}</td>
      <td style="border: 1px solid #dddddd;">${this.hrdCourses[i].thesis_title}</td>
      <td style="border: 1px solid #dddddd;">${this.hrdCourses[i].guides}</td>
      </tr>`;
        }
        html += `</table>
      `;
        return html;
      } else {
        return "";
      }
    },
    formattedTrainings() {
      if (this.hrdTrainings.length > 0) {
        var html = `
      <h3>B.	Faculty/staff/students from other institutions trained at NIMHANS</h3>
      <table>
      <tr>
      <th style="border: 1px solid #dddddd;">Name of the course / Training</th>
      <th style="border: 1px solid #dddddd;">Institutional affiliation</th>
      <th style="border: 1px solid #dddddd;">Number of Candidates</th>
      <th style="border: 1px solid #dddddd;">From</th>
      <th style="border: 1px solid #dddddd;">To</th>
      <th style="border: 1px solid #dddddd;">Status</th>
      <th style="border: 1px solid #dddddd;">Description</th>
      </tr>`;
        for (var i = 0; i < this.hrdTrainings.length; i++) {
          let sum = 0;
          html += `<tr>
      <td style="border: 1px solid #dddddd;">${this.hrdTrainings[i].training_name}</td>
      <td style="border: 1px solid #dddddd;">${this.hrdTrainings[i].institutional_affiliation}</td>
      <td style="border: 1px solid #dddddd;">${this.hrdTrainings[i].no_of_candidates} Years</td>
      <td style="border: 1px solid #dddddd;">${this.hrdTrainings[i].from_date}</td>
      <td style="border: 1px solid #dddddd;">${this.hrdTrainings[i].to_date}</td>
      <td style="border: 1px solid #dddddd;">${this.hrdTrainings[i].remarks_status}</td>
      <td style="border: 1px solid #dddddd;">${this.hrdTrainings[i].brief_report}</td>
      </tr>`;
        }
        html += `</table>
      `;
        return html;
      } else {
        return "";
      }
    },
    formattedRetaired() {
      if (this.retaired.length > 0) {
        var html = `
      <h3>4.	DETAILS OF DEPARTMENTAL STAFF</h3>
      <h3>B.	A.	List of Faculty and staff served NIMHANS and Superannuated / Resigned / VRS</h3>
      <table>
      <tr>
      <th style="border: 1px solid #dddddd;">Superannuated / Resigned / VRS</th>
      <th style="border: 1px solid #dddddd;">Name of the Official and Designation</th>
      <th style="border: 1px solid #dddddd;">Date of Joining</th>
      <th style="border: 1px solid #dddddd;">Date of Leaving</th>
      <th style="border: 1px solid #dddddd;">Image URL</th>
      </tr>`;
        for (var i = 0; i < this.retaired.length; i++) {
          let sum = 0;
          html += `<tr>
      <td style="border: 1px solid #dddddd;">${this.retaired[i].faculty_status}</td>
      <td style="border: 1px solid #dddddd;">${this.retaired[i].faculty_name}</td>
      <td style="border: 1px solid #dddddd;"></td>
      <td style="border: 1px solid #dddddd;">${this.retaired[i].leaving_date}</td>
      <td style="border: 1px solid #dddddd;">${this.retaired[i].image ? this.retaired[i].image : ""}</td>
      </tr>`;
        }
        html += `</table>
      `;
        return html;
      } else {
        return "";
      }
    },
    downloadData() {
      return this.formattedAbout + this.formattedClinical + this.formattedEmergency + this.formattedDiagnostics + this.formattedSpecial + this.formattedOT + this.formattedHRD + this.formattedTrainings + this.formattedRetaired;
    },
  },
  async mounted() {
    await this.checkReport(this.department.id, this.month, this.selectedYear, this.userType);
  },
  methods: {
    async checkReport(id, month, selectedYear, userType, $axios) {
      this.loading = true;
      // console.log(id, month)
      this.available = await this.$axios.$get(`${this.$axios.defaults.baseURL}/saved-reports?annual_year=${selectedYear}&userType=${userType}&department.id=${id}&Month=${month}`);
      console.log(this.available.length);
      this.loading = false;
    },
    async handleClick(id, year, month, userType) {
      console.log(id, year, month, userType);
      let queryString = '';
      if (month) 
        queryString = `department.id=${id}&annual_year=${year}&Month=${month}&userType=${userType}`;
      else
        queryString = `department.id=${id}&annual_year=${year}&userType=${userType}`;
      
      await this.$axios
        .$get(`/saved-reports?${queryString}`)
        .then((resp) => {
          console.log(resp);
          this.$store.dispatch("snackbar/setSnackbar", { text: "Report Id: " + resp[0].id });
          let reportTitle = '';
          reportTitle = "Report for the month of " + this.$moment(month).format("MMMM") +", RY(" + year + " - " + `${year + 1}` + ")"
          this.exportToDoc(reportTitle, resp[0].program + resp[0].visitor + resp[0].training + resp[0].presentation + resp[0].participation + resp[0].publicEngagement + resp[0].research + resp[0].publication +resp[0].recognition +resp[0].patent + resp[0].assignment);
        })
        .catch((e) => {
          console.log(e);
        });
      // console.log('clicked')
    },
    exportToDoc(filename = "", content) {
      console.log("i came in");
      var preHtml =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
      var postHtml = "</body></html>";
      var html =
        // preHtml + document.getElementsByClassName('ProseMirror')[0].innerHTML + postHtml;
        preHtml + content + postHtml;

      var blob = new Blob(["\ufeff", html], {
        type: "application/msword",
      });

      // Specify link url
      var url = "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);

      // Specify file name
      filename = filename ? filename + ".doc" : "document.doc";

      // Create download link element
      var downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);

      if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // Create a link to the file
        downloadLink.href = url;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
      }

      document.body.removeChild(downloadLink);
    },
  },
};
</script>
