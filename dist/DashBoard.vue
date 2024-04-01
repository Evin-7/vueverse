
<template>
  <div>
    <v-layout wrap justify-center>
      <vue-element-loading
        :active="appLoading"
        :is-full-screen="true"
        background-color="#FFFFFF"
        color="#192841"
        spinner="line-scale"
      />
      <v-flex xs11>
        <v-layout wrap justify-center>
          <v-flex xs12 text-left py-4>
            <span style="font-size: 25px; font-weight: bolder">DASHBOARD</span>
          </v-flex>
        </v-layout>
        <v-layout justify-center wrap v-if="userType === 'admin'">
          <v-flex v-if="userType === 'admin'" xs12 pt-6>
            <v-layout wrap justify-center style="color: white">
              <!-- Total Blogs -->
              <v-flex xs12 sm6 lg6 pa-3>
                <v-card class="gradient-card">
                  <v-card-text>
                    <v-icon color="white">mdi-post-outline</v-icon>
                    <div style="color: white; font-size: 20px">
                      TOTAL BLOGS
                      <p v-if="userType === 'user'">{{ yourBlogsCount }}</p>
                      <p v-else>{{ totalBlogs }}</p>
                    </div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <!-- Published Blogs -->
              <v-flex xs12 sm6 lg6 pa-3>
                <v-card class="gradient-card2">
                  <v-card-text>
                    <v-icon color="white">mdi-publish</v-icon>

                    <div style="color: white; font-size: 20px">
                      <h3>PUBLISHED BLOGS</h3>
                      <p>{{ totalBlogs }}</p>
                    </div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <!-- Total Users -->
              <v-flex xs12 sm6 lg6 pa-3 v-if="userType === 'admin'">
                <v-card class="gradient-card5">
                  <v-card-text>
                    <v-icon color="white">mdi-account-group </v-icon>
                    <div style="color: white; font-size: 20px">
                      <h3>TOTAL USERS</h3>

                      <p>{{ totalUsers }}</p>
                    </div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <!-- New User Registrations -->
              <v-flex xs12  sm6 lg6 pa-3 v-if="userType === 'admin'">
                <v-card class="gradient-card6">
                  <v-card-text>
                    <v-icon color="white">mdi-account-badge-outline </v-icon>
                    <br />
                    <div style="color: white; font-size: 20px">
                      <h3>NEW USER REGISTRATIONS</h3>
                      <p>{{ totalUsers }}</p>
                    </div>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 v-if="userType === 'admin'">
            <DashboardChart
              :totalBlogs="totalBlogs"
              :publishedBlogs="totalBlogs"
              :totalUsers="totalUsers"
              :newUserRegistrations="totalUsers"
            />
          </v-flex>
        </v-layout>
        <v-layout wrap justify-center v-else>
          <v-flex xs12 sm5 lg6 pa-3>
            <v-card class="gradient-card">
              <v-card-text>
                <v-icon color="white">mdi-post-outline</v-icon>
                <div style="color: white; font-size: 20px">
                  TOTAL BLOGS
                  <p v-if="userType === 'user'">{{ yourBlogsCount }}</p>
                  
                </div>
              </v-card-text>
            </v-card>
          </v-flex>

          <!-- Published Blogs -->
          <v-flex xs12 sm5 lg6 pa-3>
            <v-card class="gradient-card2">
              <v-card-text>
                <v-icon color="white">mdi-publish</v-icon>

                <div style="color: white; font-size: 20px">
                  <h3>PUBLISHED BLOGS</h3>
                  <p>{{ yourBlogsCount }}</p>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 v-if="userType === 'user'">
            <DashboardChartuser
              :totalBlogs="yourBlogsCount"
              :publishedBlogs="yourBlogsCount"
             
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>


<script>
import firebase from "firebase/app";
import "firebase/firestore";
import DashboardChart from "./DashboardChart.vue"; 
import DashboardChartuser from "./DashboardChartuser.vue"; // Adjust the path as needed
// Adjust the path as needed

export default {
  components: {
    DashboardChart,
    DashboardChartuser,
    // Other components...
  },
  data() {
    return {
      tot: "",
      appLoading: false,
      totalBlogs: 0, // Initialize the totalBlogs data property
      yourBlogsCount: 0,
      totalUsers: 0, // Initialize the yourBlogsCount data property
      userType: localStorage.getItem("userType"), // Retrieve userType from localStorage
    };
  },
  mounted() {
    // Call the method to fetch counts based on userType
    if (this.userType === "admin") {
      this.fetchTotalBlogs();
      this.fetchTotalUsers();
    } else if (this.userType === "user") {
      this.fetchUserBlogsCount();
    }
  },
  methods: {
    fetchTotalUsers() {
      this.appLoading = true;
      // Get a reference to the Firestore database
      const db = firebase.firestore();
      // Query the users collection and get the total count of documents
      db.collection("users")
        .get()
        .then((querySnapshot) => {
          // Set the totalUsers data property to the count of documents
          this.totalUsers = querySnapshot.size;
          this.tot = this.totalUsers;
          console.log("tot is", this.tot);
          this.appLoading = false;
        })
        .catch((error) => {
          // Handle any errors that occur during the Firestore operation
          console.error("Error fetching total users:", error);
          // Optionally, provide feedback to the user about the error
        });
    },
    fetchTotalBlogs() {
      this.appLoading = true;

      // Get a reference to the Firestore database
      const db = firebase.firestore();

      // Query the blogs collection and get the total count of documents
      db.collection("blogs")
        .get()
        .then((querySnapshot) => {
          // Set the totalBlogs data property to the count of documents
          this.totalBlogs = querySnapshot.size;
          this.appLoading = false;
        })
        .catch((error) => {
          // Handle any errors that occur during the Firestore operation
          console.error("Error fetching total blogs:", error);
          // Optionally, provide feedback to the user about the error
        });
    },
    fetchUserBlogsCount() {
      this.appLoading = true;

      // Get the current user's ID
      const userId = firebase.auth().currentUser.uid;

      // Get a reference to the Firestore database
      const db = firebase.firestore();

      // Query the blogs collection and filter by the current user's ID
      db.collection("blogs")
        .where("userId", "==", userId) // Replace "userId" with the field name that represents the user ID in your blogs collection
        .get()
        .then((querySnapshot) => {
          // Set the yourBlogsCount data property to the count of documents
          this.yourBlogsCount = querySnapshot.size;
          this.appLoading = false;
        })
        .catch((error) => {
          // Handle any errors that occur during the Firestore operation
          console.error("Error fetching user blogs count:", error);
          // Optionally, provide feedback to the user about the error
          this.appLoading = false;
        });
    },
  },
};
</script>

<style>
/* Your styles */
</style>


<style>
.gradient-card {
  background: linear-gradient(to right, #aa4b6b, #6b6b83, #3b8d99);
}

.gradient-card2 {
  background: linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4);
}

.gradient-card3 {
  background: linear-gradient(to right, #659999, #f4791f);
}

.gradient-card4 {
  background: linear-gradient(to right, #009fff, #ec2f4b);
}

.gradient-card5 {
  background: linear-gradient(to right, #59c173, #a17fe0, #5d26c1);
}

.gradient-card6 {
  background: linear-gradient(to right, #bdc3c7, #2c3e50);
}
</style>