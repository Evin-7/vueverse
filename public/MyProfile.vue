<template>
  <div>

    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="#192841"
      spinner="line-scale"
    />
    <v-layout v-if="userType === 'user'" wrap justify-center py-5 >
      <v-flex xs10 pt-3 v-if="userData"> 
        <v-card>
          <v-card-title>
            <v-icon color="#192841">mdi-account</v-icon>
            <span style="font-size: 25px; font-weight: bolder">MY PROFILE</span>
          </v-card-title>
          <v-card-text>
            <span style="font-size: 18px">Email: {{ userData.email }}</span>
            <br />
            <br />
            <span style="font-size: 18px">Phone Number: {{ userData.phoneNumber }}</span>
            <!-- Add more profile fields as needed -->
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else justify-center wrap>
      <v-flex xs10 pt-3>
        <span style="font-size: 25px; font-weight: bolder">USERS ({{ allUsers.length }})</span>

      </v-flex>
      <v-flex xs10 pt-3 pb-3  v-for="(user, index) in allUsers" :key="index"> 
        <v-card  >
          <v-card-title>
            <v-icon color="#192841">mdi-account</v-icon>
            <span style="font-size: 18px; font-weight: bolder">USER </span>
          </v-card-title>
          <v-card-text>
            <span style="font-size: 18px">Email: {{ user.email }}</span>
            <br />
            <br />
            <span style="font-size: 18px">Phone Number: {{ user.phoneNumber }}</span>
            <!-- Add more user profile fields as needed -->
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // Import Firestore

export default {
  data() {
    return {
      userData: null,
      appLoading: false,

      allUsers: [], // Initialize array to store all users for admin
      userType: localStorage.getItem('userType'),
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (this.userType === 'user') {
          this.fetchUserProfile(user);
        } else if (this.userType === 'admin') {
          this.fetchAllUsers();
        }
      } else {
        this.userData = null;
        this.allUsers = [];
      }
    });
  },
  methods: {
    fetchUserProfile(user) {
      this.appLoading = true;

      const db = firebase.firestore();
      const userProfileRef = db.collection("users").doc(user.uid);
      userProfileRef.get().then((doc) => {
        if (doc.exists) {
          this.userData = doc.data();
      this.appLoading = false;

        } else {
          console.error("User profile document not found");
        }
      }).catch((error) => {
        console.error("Error fetching user profile:", error);
      });
    },
    fetchAllUsers() {
      this.appLoading = true;

      const db = firebase.firestore();
      db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.allUsers.push(doc.data());
      this.appLoading = false;

        });
      }).catch((error) => {
        console.error("Error fetching all users:", error);
      });
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
