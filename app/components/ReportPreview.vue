<template>
  <div>
    <v-card tile>
      <v-card-text class="px-0 py-0">
        <QuerySelector :reportYears="reportYears" :userTypes="userTypes" @go="loader" @resetFilters="dataLoaded = false" />
        <div class="preview">
          <v-sheet width="100%" height="210vh" v-if="dataLoaded">
            <v-toolbar color="blue-grey darken-3" dark>
              <v-toolbar-title class="white--text"
                >Consolidated Report for the Year - {{ this.selectedYear }} -
                {{ this.selectedYear + 1 }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip left color="blue-grey darken-3">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon @click="exportToDoc(`Preview-${$auth.user.id}`)"
                      >mdi-download</v-icon
                    >
                  </v-btn>
                </template>
                <span>Download Report</span>
              </v-tooltip>
            </v-toolbar>
            <div
              id="download"
              elevation="6"
              class="mx-auto pa-4 doc"
              width="100%"
            >
              <h1>
                <b><u>Section B:</u></b>
              </h1>
              <h3>
                <b
                  >1. CONFERENCES / WORKSHOPS / SEMINARS /SYMPOSIUM / SCIENTIFIC
                  PROGRAMMES</b
                >
              </h3>
              <!-- Program -->
              <div v-for="(program, index) in programmes" :key="program.id">
                <p>
                  <b
                    >{{ index + 1 }}. {{ program.forum.toUpperCase() }}
                    {{ program.type.toUpperCase() }} on "{{ program.name }}" at
                    {{ program.location }}</b
                  >
                  from {{ program.from_date }} to {{ program.to_date }},
                  Coordinated by {{ program.coordinators }}.
                </p>
                <p>
                  Collaboration: {{ program.colloborations }}, Total
                  Participants: {{ program.participants_count }}
                </p>
                <p>
                  <img
                    :src="
                      program.image
                        ? $axios.defaults.baseURL + program.image.url
                        : '/image_placeholder.png'
                    "
                    alt="program"
                    width="400"
                  />
                </p>
                <p>
                  <b><u>Brief Report:</u></b> {{ program.brief_report }}
                </p>
              </div>

              <!-- Visitor -->
              <div v-for="(visitor, index) in visitors" :key="visitor.id">
                <p>
                  <b
                    >{{ index + 1 }}. {{ visitor.name }},
                    {{ visitor.designation }}</b
                  >
                  from {{ visitor.institutional_affiliation }} visited to our
                  department during {{ visitor.from_date }} -
                  {{ visitor.to_date }}. He / She had given a lecture titled "{{
                    visitor.title
                  }}"
                </p>
                <p>
                  <img
                    :src="
                      visitor.image
                        ? $axios.defaults.baseURL + visitor.image.url
                        : '/image_placeholder.png'
                    "
                    alt="Visitor"
                    width="400"
                  />
                </p>
                <p>
                  <b><u>Brief Report:</u></b> {{ visitor.brief_report }}
                </p>
              </div>
              <!-- Training -->
              <div v-for="(training, index) in trainings" :key="training.id">
                <p>
                  <b>{{ index + 1 }}. {{ training.faculty_name }}</b> has
                  attended a training programme on "{{ training.program_name }}"
                  at {{ training.institutional_affiliation }} from
                  {{ training.from_date }} to {{ training.to_date }}, funded by
                  {{ training.funded_by }}.
                </p>
                <p>
                  <img
                    :src="
                      training.image
                        ? $axios.defaults.baseURL + training.image.url
                        : '/image_placeholder.png'
                    "
                    alt="Training"
                    width="400"
                  />
                </p>
                <p>
                  <b><u>Brief Report:</u></b> {{ training.brief_report }}
                </p>
              </div>

              <h3><b>4. CONTRIBUTION TO SCIENTIFIC DELIBERATIONS</b></h3>
              <h3><b>A. PRESENTATIONS/ POSTERS</b></h3>
              <!-- Presentation -->
              <div
                v-for="(presentation, index) in presentations"
                :key="presentation.id"
              >
                <p>
                  <b
                    >{{ index + 1 }}. {{ presentation.forum.toUpperCase() }}
                    {{ presentation.type.toUpperCase() }}</b
                  >
                  on "{{ presentation.title }}" by
                  {{ presentation.faculty_name }}. Co-authors:
                  {{ presentation.coauthors }}
                </p>
                <img
                  :src="
                    presentation.image
                      ? $axios.defaults.baseURL + presentation.image.url
                      : '/image_placeholder.png'
                  "
                  alt="Presentation"
                  width="400"
                />
                <p>
                  <b><u>Reference:</u></b> {{ presentation.reference }}
                </p>
              </div>

              <!-- Participation -->
              <div
                v-for="(participation, index) in participations"
                :key="participation.id"
              >
                <p>
                  <b
                    >{{ index + 1 }}. {{ participation.faculty_name }},
                    {{ participation.designation }}</b
                  >
                  participated in {{ participation.forum }} programme titled "{{
                    participation.program_name
                  }}", from {{ participation.from_date }} to
                  {{ participation.to_date }} at {{ participation.place }}.
                </p>
                <img
                  :src="
                    participation.image
                      ? $axios.defaults.baseURL + participation.image.url
                      : '/image_placeholder.png'
                  "
                  alt="Participation"
                  width="400"
                />
              </div>
              <h3><b>5. PUBLIC ENGAGEMENT &amp; OUTREACH ACTIVITIES</b></h3>
              <!-- Public -->
              <div v-for="(publicE, index) in publics" :key="publicE.id">
                <p>
                  <b>{{ index + 1 }}. {{ publicE.type.toUpperCase() }}</b>
                  titled "{{ publicE.title }}" given by
                  {{ publicE.faculty_name }} on {{ publicE.date }} at
                  {{ publicE.place }}.
                </p>
                <p>
                  <b>Program Name: </b>{{ publicE.program_name }},
                  <b>Target Audience: </b>{{ publicE.target_audience }}
                </p>
                <p>
                  <img
                    :src="
                      publicE.image
                        ? $axios.defaults.baseURL + publicE.image.url
                        : '/image_placeholder.png'
                    "
                    alt="Public Engagements"
                    width="400"
                  />
                </p>
              </div>
              <h3><b>6. RESEARCH ACTIVITIES</b></h3>
              <!-- Research -->
              <div v-for="(research, index) in researchData" :key="research.id">
                <p>
                  <b
                    >{{ index + 1 }}.
                    {{ research.research_status.toUpperCase() }}:
                    {{ research.title }}</b
                  >
                </p>
                <p>
                  {{ research.investigator_type }}:
                  {{ research.investigator_name }}, Total Duration(in months):
                  {{ research.total_durations }}
                </p>
                <p>
                  Source of Funding: {{ research.funding_source }}, Funding
                  agency : {{ research.funding_agency }}, Total funding:
                  {{ research.total_funds }}, Funding during the review
                  period/year: {{ research.funding_on_review_period }}
                </p>
                <p>
                  <b><u>Brief Report/Abstract: </u></b>
                  {{ research.research_abstract }}
                </p>
                <p>
                  <img
                    :src="
                      research.image
                        ? $axios.defaults.baseURL + research.image.url
                        : '/image_placeholder.png'
                    "
                    alt="Research"
                    width="400"
                  />
                </p>
              </div>
              <h3><b>5. PUBLICATIONS</b></h3>
              <!-- Publications -->
              <div v-for="(item, index) in publications" :key="item.id">
                <p>
                  <b
                    >{{ index + 1 }}. {{ item.classification.toUpperCase() }},
                    {{ item.publication_type.toUpperCase() }}</b
                  >
                </p>
                <p>{{ item.reference }}</p>
                <img
                  :src="
                    item.image
                      ? $axios.defaults.baseURL + item.image.url
                      : '/image_placeholder.png'
                  "
                  alt="Publication"
                  width="400"
                />
              </div>
              <h3><b>5. RECOGNITION OF NIMHANS CONTRIBUTION </b></h3>
              <h3><b>A. AWARDS AND HONORS </b></h3>
              <!-- Recognition -->
              <div
                v-for="(recognition, index) in recognitions"
                :key="recognition.id"
              >
                <p>
                  <b>{{ index + 1 }}. {{ recognition.faculty_name }}</b> has
                  been awarded as "{{ recognition.award_title }}" by
                  {{ recognition.organization }},{{ recognition.place }} on
                  {{ recognition.date }}.
                </p>
                <img
                  :src="
                    recognition.image
                      ? $axios.defaults.baseURL + recognition.image.url
                      : '/image_placeholder.png'
                  "
                  alt="Recognition"
                  width="400"
                />
              </div>
              <!-- Patent -->
              <div v-if="(patent, index) in patents" :key="patent.id">
                <p>
                  <b>{{ index + 1 }}. {{ patent.registration_no }}:</b>
                  {{ patent.title }}
                </p>
                <img
                  :src="
                    patent.image
                      ? $axios.defaults.baseURL + patent.image.url
                      : '/image_placeholder.png'
                  "
                  alt="Patents"
                  width="400"
                />
                <p>
                  <b><u>Brief Report: </u></b> {{ patent.brief_report }}
                </p>
              </div>
              <!-- Key Assignments -->
              <div
                v-for="(assignment, index) in assignments"
                :key="assignment.id"
              >
                <p>
                  <b
                    >{{ index + 1 }}.
                    {{ assignment.classification.toUpperCase() }}:</b
                  >
                  {{ assignment.faculty_name }}, {{ assignment.designation }},
                  {{ assignment.roles }}
                </p>
                <img
                  :src="
                    assignment.image
                      ? $axios.defaults.baseURL + assignment.image.url
                      : '/image_placeholder.png'
                  "
                  alt="Key Assignments"
                  width="400"
                />
                <p>
                  <b><u>Brief Report: </u></b> {{ assignment.brief_report }}
                </p>
              </div>
            </div>
          </v-sheet>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";
export default {
  head() {
    return {
      title: "Annual Report",
    };
  },
  data() {
    return {
      range: {
        start: null,
        end: null,
      },
      previewData: [],
      dataLoaded: false,
      loading: false,
      selectedYear: 0,
      userTypes: [
        {
          text: "Department",
          value: "DEPARTMENT",
        },
        {
          text: "Faculty",
          value: "FACULTY",
        },
        {
          text: "Student",
          value: "STUDENT",
        },
      ],
    };
  },
  computed: {
    // reportId() {
    //   return this.$store.state.report.reportId;
    // },
    
    reportYears() {
      return this.$store.state.reportYears;
    },
    people() {
      return this.$store.state.user.activeUsersList.result;
    },
    faculties() {
      return this.people.filter((item) => item.userType === "FACULTY");
    },
    students() {
      return this.people.filter((item) => item.userType === "STUDENT");
    },
    ...mapState({
      aboutData: (state) => state.about.newAbout,
      programmes: (state) => state.program.programmesData.result,
      visitors: (state) => state.visitor.visitorsData.result,
      trainings: (state) => state.training.trainingsData.result,
      presentations: (state) => state.presentation.presentationsData.result,
      participations: (state) => state.participation.participationsData.result,
      publics: (state) => state.public.publicData.result,
      researchData: (state) => state.research.researchData.result,
      publications: (state) => state.publication.publicationsData.result,
      recognitions: (state) => state.recognition.recognitionsData.result,
      patents: (state) => state.patent.patentsData.result,
      assignments: (state) => state.assignment.assignmentsData.result,
      theses: (state) => state.theses.thesesData.result,
      savedReport: (state) => state.report.savedReports,
      availableReports: (state) => state.report.availableReports,
    }),
    // formattedAbout() {
    //   return this.aboutData
    // },
    formattedProgrammes() {
      return this.programmes
        .map(
          (program, index) =>
            `
            <p><b>${
              index + 1
            }. ${program.forum.toUpperCase()} ${program.type.toUpperCase()} on "${
              program.name
            }" at ${program.location}</b> from ${program.from_date} to ${
              program.to_date
            }, Coordinated by ${program.coordinators}.</p>
            <p>Collaboration: ${program.colloborations}, Total Participants: ${
              program.participants_count
            }</p>
           <p><img src="/image_placeholder.png" alt="program" width="300" height="auto"/></p>
            <p><b><u>Brief Report:</u></b> ${program.brief_report}</p>`
        )
        .join("");
    },
    formattedVisitors() {
      return this.visitors
        .map(
          (visitor, index) =>
            `
            <p><b>${index + 1}. ${visitor.name}, ${
              visitor.designation
            }</b> from ${
              visitor.institutional_affiliation
            } visited to our department during ${visitor.from_date} - ${
              visitor.to_date
            }. He / She had given a lecture titled "${visitor.title}"</p>
            <p><b><u>Brief Report:</u></b> ${visitor.brief_report}</p>
            `
        )
        .join("");
    },
    formattedTrainings() {
      return this.trainings
        .map(
          (training, index) =>
            `
            <p><b>${index + 1}. ${
              training.faculty_name
            }</b> has attended a training programme on "${
              training.program_name
            }" at ${training.institutional_affiliation} from ${
              training.from_date
            } to ${training.to_date}, funded by ${training.funded_by}.</p>
            <p><b><u>Brief Report:</u></b> ${training.brief_report}</p>
            `
        )
        .join("");
    },
    formattedPresentations() {
      return this.presentations
        .map(
          (presentation, index) =>
            `
            <p><b>${
              index + 1
            }. ${presentation.forum.toUpperCase()} ${presentation.type.toUpperCase()}</b> on "${
              presentation.title
            }" by ${presentation.faculty_name}. Co-authors: ${
              presentation.coauthors
            }</p>
            <p><b><u>Reference:</u></b> ${presentation.reference}</p>
            `
        )
        .join("");
    },
    formattedParticipations() {
      return this.participations
        .map(
          (participation, index) =>
            `
            <p><b>${index + 1}. ${participation.faculty_name}, ${
              participation.designation
            }</b> participated in ${participation.forum} programme titled "${
              participation.program_name
            }", from ${participation.from_date} to ${
              participation.to_date
            } at ${participation.place}.</p>
            `
        )
        .join("");
    },
    formattedPublics() {
      return this.publics
        .map(
          (item, index) =>
            `
            <p><b>${index + 1}. ${item.type.toUpperCase()}</b> titled "${
              item.title
            }" given by ${item.faculty_name} on ${item.date} at ${
              item.place
            }.</p>
            <p><b>Program Name: </b>${
              item.program_name
            }, <b>Target Audience: </b>${item.target_audience}</p>
            `
        )
        .join("");
    },
    formattedResearch() {
      return this.researchData
        .map(
          (research, index) =>
            `
            <p><b>${index + 1}. ${research.research_status.toUpperCase()}: ${
              research.title
            }</b></p>
            <p>${research.investigator_type}: ${
              research.investigator_name
            }, Total Duration(in months): ${research.total_durations}</p>
            <p>Source of Funding: ${
              research.funding_source
            }, Funding agency : ${research.funding_agency}, Total funding: ${
              research.total_funds
            }, Funding during the review period/year: ${
              research.funding_on_review_period
            }</p>
            <p><b><u>Brief Report/Abstract: </u></b> ${
              research.research_abstract
            }</p>
            `
        )
        .join("");
    },
    formattedPublications() {
      return this.publications
        .map(
          (publication, index) =>
            `
            <p><b>${
              index + 1
            }. ${publication.classification.toUpperCase()}, ${publication.publication_type.toUpperCase()}</b></p>
            <p>${publication.reference}</p>
            `
        )
        .join("");
    },
    formattedRecognitions() {
      return this.recognitions
        .map(
          (recognition, index) =>
            `
            <p><b>${index + 1}. ${
              recognition.faculty_name
            }</b> has been awarded as "${recognition.award_title}" by ${
              recognition.organization
            },${recognition.place} on ${recognition.date}.</p>
            `
        )
        .join("");
    },
    formattedPatents() {
      return this.patents
        .map(
          (patent, index) =>
            `
            <p><b>${index + 1}. ${patent.registration_no}:</b> ${
              patent.title
            }</p>
            <p><b><u>Brief Report: </u></b> ${patent.brief_report}</p>
            `
        )
        .join("");
    },
    formattedAssignments() {
      return this.assignments
        .map(
          (assignment, index) =>
            `
            <p><b>${
              index + 1
            }. ${assignment.classification.toUpperCase()}:</b> ${
              assignment.faculty_name
            }, ${assignment.designation}, ${assignment.roles}</p>
            <p><b><u>Brief Report: </u></b> ${assignment.brief_report}</p>
            `
        )
        .join("");
    },

    step1Data() {
      var html = "";
      if (this.formattedProgrammes.length > 0) {
        html =
          `<h1><b><u>Section B:</u></b></h1>` +
          `<h3><b>1. CONFERENCES / WORKSHOPS / SEMINARS /SYMPOSIUM / SCIENTIFIC PROGRAMMES</b></h3>` +
          this.formattedProgrammes;
      }
      if (this.formattedVisitors.length > 0) {
        html +=
          `<hr><h3><b>2. VISITORS TO THE DEPARTMENT</b></h3>` +
          this.formattedVisitors;
      }
      if (this.formattedTrainings) {
        html +=
          `<hr><h3><b>3. SPECIFIC TRAINING UNDERWENT BY THE FACULTY / STAFF / STUDENTS OUTSIDE NIMHANS</b></h3>` +
          this.formattedTrainings;
      }
      return html;
    },
    step2Data() {
      var html = "";
      if (this.formattedPresentations.length > 0) {
        html =
          `<h3><b>4. CONTRIBUTION TO SCIENTIFIC DELIBERATIONS</b></h3>` +
          `<h3><b>A. PRESENTATIONS/ POSTERS</b></h3>` +
          this.formattedPresentations;
      }
      if (this.formattedParticipations.length > 0) {
        html +=
          `<hr><h3><b>B. PARTICIPATIONS</b></h3>` +
          this.formattedParticipations;
      }
      return html;
    },
    step3Data() {
      var html = "";
      if (this.formattedPublics.length > 0) {
        html =
          `<h3><b>5. PUBLIC ENGAGEMENT & OUTREACH ACTIVITIES</b></h3>` +
          this.formattedPublics;
      }
      return html;
    },
    step4Data() {
      var html = "";
      if (this.formattedResearch.length > 0) {
        html =
          `<h3><b>6. RESEARCH ACTIVITIES</b></h3>` + this.formattedResearch;
      }
      return html;
    },
    step5Data() {
      var html = "";
      if (this.formattedPublications.length > 0) {
        html = `<h3><b>5. PUBLICATIONS</b></h3>` + this.formattedPublications;
      }
      return html;
    },
    step6Data() {
      var html = "";
      if (this.formattedRecognitions.length > 0) {
        html =
          `<h3><b>5. RECOGNITION OF NIMHANS CONTRIBUTION </b></h3>` +
          `<h3><b>A. AWARDS AND HONORS </b></h3>` +
          this.formattedRecognitions;
      }
      if (this.formattedPatents.length > 0) {
        html += `<hr><h3><b>B. PATENTS </b></h3>` + this.formattedPatents;
      }
      if (this.formattedAssignments.length > 0) {
        html +=
          `<hr><h3><b>C. KEY ASSIGNMENTS </b></h3>` + this.formattedAssignments;
      }
      return html;
    },
  },
  methods: {
    async loader(selectedQuery, selectedYear) {
      this.selectedYear = selectedYear
      this.loading = true;
      if (
        this.$auth.user.userType === "FACULTY" ||
        this.$auth.user.userType === "STUDENT"
      )
        selectedQuery += `&user.id=${this.$auth.user.id}`;

      let queryString = "";
      queryString =
        selectedQuery +
        `&department.id=${this.$auth.user.department}&deleted_ne=true`;

      await this.$store.dispatch("program/setProgrammesData", {
        qs: queryString,
      });
      await this.$store.dispatch("visitor/setVisitorsData", {
        qs: queryString,
      });
      await this.$store.dispatch("training/setTrainingsData", {
        qs: queryString,
      });
      await this.$store.dispatch("presentation/setPresentationsData", {
        qs: queryString,
      });
      await this.$store.dispatch("participation/setParticipationsData", {
        qs: queryString,
      });
      await this.$store.dispatch("public/setPublicData", { qs: queryString });
      await this.$store.dispatch("research/setResearchData", {
        qs: queryString,
      });
      await this.$store.dispatch("publication/setPublicationsData", {
        qs: queryString,
      });
      await this.$store.dispatch("recognition/setRecognitionsData", {
        qs: queryString,
      });
      await this.$store.dispatch("patent/setPatentsData", { qs: queryString });
      await this.$store.dispatch("assignment/setAssignmentsData", {
        qs: queryString,
      });
      // this.previewData =
      //   this.step1Data +
      //   this.step2Data +
      //   this.step3Data +
      //   this.step4Data +
      //   this.step5Data +
      //   this.step6Data;
      this.loading = false;
      this.dataLoaded = true;
    },
    
    async changeReportingYear() {
      await this.$store.dispatch("setReportingYear", this.selectedYear);
    },
    async setReportingYear() {
      await this.$store.dispatch("setReportingYear", this.selectedYear);
    },
    save() {
      console.log("Save Clicked!");
    },
    handleNext(step) {
      this.report = step + 1;
    },
    handlePrevious(step) {
      this.report = step - 1;
    },
    exportToDoc(filename = "") {
      var preHtml =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
      var postHtml = "</body></html>";
      var html =
        // preHtml + document.getElementsByClassName('ProseMirror')[0].innerHTML + postHtml;
        preHtml + document.getElementById("download").innerHTML + postHtml;

      var blob = new Blob(["\ufeff", html], {
        type: "application/msword",
      });

      // Specify link url
      var url =
        "data:application/vnd.ms-word;charset=utf-8," +
        encodeURIComponent(html);

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

<style scoped>
.preview {
  max-width: 100%;
}
.doc {
  overflow: scroll;
}
</style>
