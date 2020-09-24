<template>
  <div>
    <h1>Generate Quick Reports</h1>
    <v-row>
      <v-col cols="12" lg="4" class="mt-5">
        <v-select
          outlined
          dense
          v-model="selectedDepartment"
          ref="year"
          :items="departments"
          item-value="id"
          item-text="name"
          label="Department"
          placeholder="Pick Department"
          color="success"
          @input="fetchUsers"
        ></v-select>
      </v-col>
    </v-row>
    <super-query
      :reportYears="reportYears"
      :userTypes="userTypes"
      @go="loader"
      @resetFilters="dataLoaded = false"
    />
    <div class="preview">
      <v-sheet width="100%" height="210vh" v-if="dataLoaded">
        <v-toolbar color="blue-grey darken-3" dark>
          <v-toolbar-title class="white--text"
            >{{reportTitle}}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip left color="blue-grey darken-3">
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon @click="exportToDoc(`${formattedFileName}`)"
                  >mdi-download</v-icon
                >
              </v-btn>
            </template>
            <span>Download Report</span>
          </v-tooltip>
        </v-toolbar>
        <div id="download" elevation="6" class="mx-auto pa-4 doc" width="100%">
          <h2 style="text-align:center; font-family: Calibri; font-style: normal; line-height:25px;">National Institute of Mental Health and Neurosciences</h2>
          <h3 style="text-align:center; font-family: Calibri; font-style: normal;">Department of {{ getDepartmentName(selectedDepartment).name }}</h3>
          <h4 style="text-align:center; font-family: Calibri; font-style: normal;"> {{ reportTitle }}</h4>
          <h6 style="text-align:right; font-family: Calibri; font-style: normal; color:gray;"> Generated On: {{ $moment().format('Do MMMM YYYY, h:mm:ss a') }}</h6>

          <h2 style="font-family: Calibri; font-style: normal;">
            <b><u>Section B:</u></b>
          </h2>
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>1. CONFERENCES / WORKSHOPS / SEMINARS /SYMPOSIUM / SCIENTIFIC PROGRAMMES</b>
          </h4>
          <!-- Program -->
          <div v-for="(program, index) in programmes" :key="program.id">
            <p style="text-align:justify; font-family: Calibri;">
              {{ index + 1 }}. {{ program.coordinators }}. {{ program.type }}, {{ program.name }}, {{ program.location }}, {{ $moment(program.from_date).format('Do MMMM YYYY') }} to {{ $moment(program.to_date).format('Do MMMM YYYY') }}. {{ program.participants_count }} members participated. ({{ program.forum}})
            </p>
            <!-- <u>Brief Report:</u></b> {{ program.brief_report }} -->
            <!-- <p>
              <img
                :src="
                  program.image
                    ? $axios.defaults.baseURL + program.image.url
                    : '/image_placeholder.png'
                "
                alt="program"
                width="400"
              />
            </p> -->
          </div>
          <!-- Visitor -->
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>2. VISITORS TO THE DEPARTMENT</b>
          </h4>
          <div v-for="(visitor, index) in visitors" :key="visitor.id">
            <p style="text-align:justify; font-family: Calibri;">
              {{ index + 1 }}. {{ visitor.name }}, {{ visitor.designation }}, {{ visitor.institutional_affiliation }}, visited the Dept. of {{ getDepartmentName(selectedDepartment).name }}  and delivered a lecture on '{{ visitor.title }}' from {{ $moment(visitor.from_date).format('Do MMMM YYYY') }} to {{ $moment(visitor.to_date).format('Do MMMM YYYY') }}.  
            </p>
            <!-- <p>
              <b><u>Brief Report:</u></b> {{ visitor.brief_report }}
            </p> -->
          </div>

          <!-- Training -->
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>3. SPECIFIC TRAINING UNDERWENT BY THE FACULTY /STAFF /STUDENTS OUTSIDE NIMHANS</b>
          </h4>
          <div v-for="(training, index) in trainings" :key="training.id">
            <p style="text-align:justify; font-family: Calibri;">
              {{ index + 1 }}. {{ training.faculty_name }}. {{ training.program_name }}, {{ training.institutional_affiliation }} from {{ $moment(training.from_date).format('Do MMMM YYYY') }} to {{ $moment(training.to_date).format('Do MMMM YYYY') }}. 
            </p> 
            <!-- {{ training.funded_by }}
            {{ training.brief_report }} -->
          </div>

          <!-- Presentation -->
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>4. CONTRIBUTION TO SCIENTIFIC DELIBERATIONS</b>
          </h4>
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>A. PRESENTATIONS/ POSTERS</b>
          </h4>
          <div v-for="(presentation, index) in presentations" :key="presentation.id">
            <p style="text-align:justify; font-family: Calibri;">
              {{ index + 1 }}. {{ presentation.faculty_name }}, {{ presentation.coauthors }}. {{ presentation.title }}. ({{ presentation.forum}}) 
            </p>    
          </div>

          <!-- Participation -->
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>B. PARTICIPATION</b>
          </h4>
          <div
            v-for="(participation, index) in participations"
            :key="participation.id"
          >
           <p style="text-align:justify; font-family: Calibri;">
              {{ index + 1 }}. {{ participation.faculty_name }}, {{ participation.designation }}. {{ participation.program_name }} from {{ $moment(participation.from_date).format('Do MMMM YYYY') }} to {{ $moment(participation.to_date).format('Do MMMM YYYY') }}. ({{ participation.forum }})
           </p>
          </div>

          <!-- Public Engagement -->
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>5. PUBLIC ENGAGEMENT &amp; OUTREACH ACTIVITIES</b>
          </h4>
          <div v-for="(publicE, index) in publics" :key="publicE.id">
            <p style="text-align:justify; font-family: Calibri;">
                {{ index + 1 }}. {{ publicE.faculty_name }}. {{ publicE.title }}, {{ publicE.program_name }}, {{ publicE.place }}, {{ $moment(publicE.date).format('Do MMMM YYYY') }}. Target Group: {{ publicE.target_audience }}.
            </p>

          </div>

          <!-- Research Activities -->
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>6. RESEARCH ACTIVITIES</b>
          </h4>
          <div v-for="(research, index) in researchData" :key="research.id">
            <p style="text-align:justify; font-family: Calibri;">
                {{ index + 1 }}. {{ research.title }}. Co-Investigators: {{ research.investigator_name }}.
            </p>
            <p style="font-family: Calibri;">
                ({{ research.funding_source }}, {{ research.funding_agency }})
            </p>
            <p style="text-align:justify; font-family: Calibri;">
                {{ research.research_abstract }}
            </p>
            <!-- {{ research.total_funds }}
            {{ research.funding_on_review_period }} -->
          </div>

          
          <!-- Publications -->
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>7. PUBLICATIONS</b>
          </h4>
          <div v-for="(item, index) in publications" :key="item.id">
            <p style="text-align:justify; font-family: Calibri;">
              {{ index + 1 }}. {{ item.reference }}
            </p>
          </div>

          <!-- Recognition -->
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>8. RECOGNITION OF NIMHANS CONTRIBUTION</b>
          </h4>
           <h4 style="font-family: Calibri; font-style: normal;">
            <b>A. AWARDS AND HONORS</b>
          </h4>
          <div
            v-for="(recognition, index) in recognitions"
            :key="recognition.id"
          >
          <p style="text-align:justify; font-family: Calibri;">
              {{ index + 1 }}. {{ recognition.faculty_name }}, {{ recognition.organization }}. {{ recognition.award_title }}, {{ recognition.place }}, {{ $moment(recognition.date).format('Do MMMM YYYY') }}.
            </p>
          </div>

          <!-- Patents -->
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>B. PATENTS</b>
          </h4>
          <div v-for="(patent, index) in patents" :key="patent.id">
            <p style="text-align:justify; font-family: Calibri;">
            {{ index + 1 }}. {{ patent.registration_no }}: {{ patent.title }}<br>
            {{ patent.brief_report }}
            </p>
          </div>

          <!-- Key Assignments -->
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>C. KEY ASSIGNMENTS </b>
          </h4>
          <div v-for="(assignment, index) in assignments" :key="assignment.id">
          <p style="font-family: Calibri;">
            {{ index + 1 }}. {{ assignment.faculty_name }}, {{ assignment.designation }}. {{ assignment.roles }}
          </p>
          <p style="text-align:justify; font-family: Calibri; font-style: normal;">
            {{ assignment.brief_report }}
          </p>
          </div>
          
          
          
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: "super",
  data() {
    return {
      selectedDepartmentName:'',
      reportTitle: '',
      formattedFileName: '',
      selectedDepartment: 0,
      selectedRange: '',
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
    reportYears() {
      return this.$store.state.reportYears;
    },
    departments() {
      return this.$store.state.department.departments;
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
  },
  async fetch({ store }) {
    await store.dispatch("department/getDepartments");
  },
  methods: {
    getDepartmentName(id) {
      return this.departments.find(dept => dept.id==id)
    },
    async fetchUsers() {
      let queryString1 = "";
      queryString1 = `department.id=${this.selectedDepartment}&blocked_ne=true`;
      await this.$store.dispatch("user/setActiveUsersList", {
        qs: queryString1,
      });
    },
    async loader(selectedQuery, selectedYear, range) {
      console.log(range);
      if(range && range.start) {
        this.reportTitle = 'Report for the period of ' + this.$moment(range.start).format('Do MMMM YYYY') + ' to ' + this.$moment(range.end).format('Do MMMM YYYY') + ', RY ('+ selectedYear + ' - '+ `${selectedYear+1}` + ')';
        
        this.formattedFileName = this.getDepartmentName(this.selectedDepartment).name+'_Report_for_the_period_of_' + this.$moment(range.start).format('Do_MMMM_YYYY') + ' to ' + this.$moment(range.end).format('Do_MMMM_YYYY') + ',_RY('+ selectedYear + ' - '+ `${selectedYear+1}` + ')';
      }
        
      else {
        this.reportTitle = 'Report for the period of RY ('+ selectedYear + ' - '+ `${selectedYear+1}` + ')';
        this.formattedFileName = this.getDepartmentName(this.selectedDepartment).name+'_Report_for_the_period_of_RY ('+ selectedYear + ' - '+ `${selectedYear+1}` + ')';
      }
        

      this.selectedRange = range;
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
        `&department.id=${this.selectedDepartment}&deleted_ne=true`;

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
      this.loading = false;
      this.dataLoaded = true;
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
