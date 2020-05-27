<template>
  <div class="back">
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <v-icon small class="pr-1" color="black">mdi-lightbulb-on</v-icon>
            <span class="font-weight-normal black--text text-uppercase"
              >Profile ID: {{ userProfile.employee_id }}</span
            >
          </v-col>
          <v-col cols="12" md="4">
            <v-icon small class="pr-1" color="black">mdi-account-edit</v-icon>
            <span class="font-weight-normal black--text text-uppercase"
              ><nuxt-link to="/user_profile">Edit Profile</nuxt-link></span
            >
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>

<script>
export default {
  props: ['userProfile']
}
</script>

<style scoped>
.back {
  background-color: #f4bd2d;
  height: auto;
}
</style>>
  
