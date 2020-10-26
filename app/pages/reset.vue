<template>
  <v-app class="full-page">
    <div class="container">
      <h1 class="black--text">Password Reset</h1>
      Reset Key: {{ resetKey }}
      <div class="content">
        <v-form ref="resetForm">
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="userData.newPassword" required dense outlined placeholder="Enter new password" label="New Password"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="userData.confirmPassword" required dense outlined placeholder="Re-Type password" label="Re-Type Password"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-spacer></v-spacer>
              <v-btn small class="success">Update Password</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: "login",
  auth: false,
  data() {
    return {
      userData: {
        newPassword: "",
        confirmPassword: "",
      },
      resetKey: "",
    };
  },
  mounted() {
    this.resetKey = this.$route.query.code;
  },
};
</script>

<style scoped>
.full-page {
  margin: 0;
  height: 100vh;
  width: 100vw;
  background-color: bisque;
  color: aliceblue;
}
.content {
  flex-grow: 1;
  display: flex;
  align-items: center;
  align-self: center;
  color: darkgray;
}
.h1 {
  align-self: center;
}
</style>
