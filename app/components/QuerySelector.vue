<template>
  <div>
    <v-row class="px-5">
      <v-col cols="12" lg="2" class="mt-5">
        <v-select
          outlined
          dense
          v-model="selectedYear"
          ref="year"
          :items="reportYears"
          item-value="id"
          item-text="val"
          label="Reporting Year"
          placeholder="Pick Year"
          color="success"
        ></v-select>
      </v-col>
      <!-- <v-col cols="12" lg="3" class="mt-5">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="mon"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="mon"
                  placeholder="Pick Month"
                  label="Month"
                  readonly
                  outlined
                  dense
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="mon" type="month" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(mon)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col> -->
      <v-col cols="12" lg="3">
        <v-label><small>Months Range</small></v-label>
        <vc-date-picker mode="range" v-model="range" ref="range" />
      </v-col>
      <v-col
        cols="12"
        lg="2"
        class="mt-5"
        v-if="$auth.user.userType === 'DEPARTMENT'"
      >
        <v-select
          outlined
          dense
          ref="user-type"
          v-model="userType"
          label="User Type"
          placeholder="I am a"
          :items="userTypes"
          color="success"
        ></v-select>
      </v-col>

      <v-col
        cols="12"
        lg="3"
        class="mt-5"
        v-if="$auth.user.userType === 'DEPARTMENT'"
      >
        <v-autocomplete
          outlined
          dense
          v-model="selectedUser"
          ref="user"
          :items="assignedPeople"
          color="blue-grey lighten-2"
          label="Faculty / Staff / Student"
          placeholder="My Name is"
          item-text="fullname"
          item-value="id"
        >
          <template v-slot:selection="data">
            {{ data.item.fullname }}
          </template>
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
              <v-list-item-avatar>
                <img
                  :src="
                    data.item.avatar !== null
                      ? $axios.defaults.baseURL + data.item.avatar.url
                      : '/avatar-default-icon.png'
                  "
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  v-html="data.item.fullname"
                ></v-list-item-title>
                <v-list-item-subtitle
                  v-html="data.item.userType"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
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
  </div>
</template>
