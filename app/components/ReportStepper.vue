<template>
  <div>
    <QuerySelectorStepper
      :reportYears="reportYears"
      :userTypes="userTypes"
      @goStepper="loader"
      @resetFilters="dataLoaded = false"
    />
    <v-stepper
      v-if="dataLoaded && $auth.user.userType === 'DEPARTMENT'"
      v-model="report"
      style="border-radius: 0;"
    >
      <v-stepper-header>
        <v-stepper-step :complete="report > 1" step="1"
          >Programmes / Events</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="report > 2" step="2"
          >Contribution To Scientific Deliberations</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="report > 3" step="3"
          >Public Engagement</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="report > 4" step="4"
          >Research Activities</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="report > 5" step="5"
          >Publications</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step step="6">Recogntions</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1" style="padding: 0px;">
          <Editor
            :content="step1Data"
            :step="1"
            @next="handleNext(1)"
            :available="showAvailableReports"
            :selectedYear="selectedYear"
            :selectedMonth="selectedMonth"
            :from="from"
            :to="to"
            :selectedUserType="userType"
          />
        </v-stepper-content>

        <v-stepper-content step="2" style="padding: 0px;">
          <Editor
            :content="step2Data"
            :step="2"
            @next="handleNext(2)"
            :available="showAvailableReports"
            :selectedYear="selectedYear"
            :selectedUserType="userType"
          />
        </v-stepper-content>

        <v-stepper-content step="3" style="padding: 0px;">
          <Editor
            :content="step3Data"
            :step="3"
            @next="handleNext(3)"
            :available="showAvailableReports"
            :selectedYear="selectedYear"
            :selectedUserType="userType"
          />
        </v-stepper-content>

        <v-stepper-content step="4" style="padding: 0px;">
          <Editor
            :content="step4Data"
            :step="4"
            @next="handleNext(4)"
            :available="showAvailableReports"
            :selectedYear="selectedYear"
            :selectedUserType="userType"
          />
        </v-stepper-content>

        <v-stepper-content step="5" style="padding: 0px;">
          <Editor
            :content="step5Data"
            :step="5"
            @next="handleNext(5)"
            :available="showAvailableReports"
            :selectedYear="selectedYear"
            :selectedUserType="userType"
          />
        </v-stepper-content>

        <v-stepper-content step="6" style="padding: 0px;">
          <Editor
            :content="step6Data"
            :step="6"
            @next="handleNext(6)"
            :available="showAvailableReports"
            :selectedYear="selectedYear"
            :selectedUserType="userType"
          />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <AvailableReports :availableReports="availableReports" v-if="sheet" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      sheet: false,
      report: 1,
      dataLoaded: false,
      showAvailableReports: false,
      previewData: [],
      selectedYear: 0,
      selectedMonth: 0,
      from: '',
      to: '',
      userType: "",
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
    reportStepper: {
      get() {
        return this.$store.state.reportStepper;
      },
      set(report) {
        this.$store.dispatch("updateStepper", report);
      },
    },
    ...mapState({
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
  watch: {
    report(val) {
      this.reportStepper = val;
    },
  },

  methods: {
    async loader(selectedQuery, altQuery, selectedYear, userType, month, from, to) {
      console.log("selectedQuery: ", selectedQuery);
      this.selectedYear = selectedYear;
      this.userType = userType;
      this.selectedMonth = month.substr(-2);
      this.from= from;
      this.to=to;
      this.sheet = false;
      this.$store.dispatch("report/initializeReportId", 0);

      let findQuery = "";
      findQuery =
        selectedQuery +
        `&department.id=${this.$store.state.auth.user.department}`;

      await this.$store.dispatch("report/setAvailableReports", {
        qs: findQuery,
      });
      if (this.availableReports.length > 0) {
        this.sheet = true;
      } else this.sheet = false;

      let queryString = "";
      queryString =
        altQuery +
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
    save() {
      console.log("Save Clicked!");
    },
    handleNext(step) {
      this.report = step + 1;
    },
    handlePrevious(step) {
      this.report = step - 1;
    },
  },
};
</script>
