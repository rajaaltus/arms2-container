<template>
  <div>
    <v-stepper
          v-if=" dataLoaded && $auth.user.userType === 'DEPARTMENT' && userType"
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
                :selectedUserType="userType"
              />
            </v-stepper-content>

            <v-stepper-content step="2" style="padding: 0px;">
              <Editor
                :content="step2Data"
                :step="2"
                @next="handleNext(2)"
                :available="showAvailableReports"
              />
            </v-stepper-content>

            <v-stepper-content step="3" style="padding: 0px;">
              <Editor
                :content="step3Data"
                :step="3"
                @next="handleNext(3)"
                :available="showAvailableReports"
              />
            </v-stepper-content>

            <v-stepper-content step="4" style="padding: 0px;">
              <Editor
                :content="step4Data"
                :step="4"
                @next="handleNext(4)"
                :available="showAvailableReports"
              />
            </v-stepper-content>

            <v-stepper-content step="5" style="padding: 0px;">
              <Editor
                :content="step5Data"
                :step="5"
                @next="handleNext(5)"
                :available="showAvailableReports"
              />
            </v-stepper-content>

            <v-stepper-content step="6" style="padding: 0px;">
              <Editor
                :content="step6Data"
                :step="6"
                @next="handleNext(6)"
                :available="showAvailableReports"
              />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
  </div>
</template>

<script>
export default {
  
}
</script>