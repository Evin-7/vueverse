<template>
  <div class="app" style="background-color: #192841">
    <v-layout
      wrap
      justify-center
      class="hidden-sm-and-down"
      style="height: 95px"
    >
      <v-flex xs12 class="fixItem">
        <v-layout wrap justify-center fill-height>
          <v-flex xs12 align-self-center>
            <v-card color="transparent" elevation="0">
              <v-layout wrap justify-center>
                <v-flex md11>
                  <v-layout wrap justify-center>
                    <v-flex
                      @click="$router.push('/')"
                      xs1
                      sm1
                      align-self-center
                    >
                      <v-img
                        style="cursor: pointer"
                        text
                        src="../src/assets/Images/mainlogovv.png"
                      ></v-img>
                    </v-flex>
                    <v-flex
                      xs5
                      align-self-center
                      pl-9
                      style="color: white; font-family: LexendRegular"
                    >
                      <span v-if="userType === 'admin'">
                        ADMIN MANAGEMENT PORTAL
                      </span>
                      <span v-else> VUEVERSE BLOGS </span>
                    </v-flex>
                    <v-flex
                      xs6
                      text-right
                      align-self-center
                      pl-9
                      style="color: white"
                    >
                      <v-btn @click="logout()" color="white" outlined>
                        <span style="color: white"> logout &nbsp; </span>
                        <v-icon>mdi-logout</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
        <!-- </v-img> -->
      </v-flex>
    </v-layout>

    <!-- For Small screen -->

    <v-layout class="hidden-md-and-up" style="background-color: #192841">
      <v-flex xs12>
        <!-- <v-img src="../../assets/Images/hd.jpg"> -->
        <v-layout wrap>
          <v-flex xs11 align-self-start>
            <!-- <router-link to="/" style="text-decoration: none"
                  > -->
            <v-layout wrap justify-center>
              <v-flex xs3 sm2 align-self-center pa-1 @click="$router.push('/')">
                <v-img
                  style="cursor: pointer"
                  text
                  src="../src/assets/Images/mainlogovv.png"

                ></v-img>
              </v-flex>
              <v-flex xs9>
                <v-layout wrap justify-end>
                  <v-flex xs1 pt-3>
                    <v-app-bar-nav-icon @click="nav = true">
                      <v-icon color="white">mdi-menu</v-icon>
                    </v-app-bar-nav-icon>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <!-- </router-link
                > -->
          </v-flex>
        </v-layout>
        <!-- </v-img> -->
      </v-flex>
    </v-layout>
    <v-navigation-drawer
      left
      v-model="nav"
      app
      fixed
      temporary
      style="background-color: #192841"
    >
      <v-layout wrap justify-center>
        <v-flex
          xs12
          style="font-family: intersemib; font-size: 17px; text-align: justify"
        >
          <v-list dense nav>
            <v-list-item
              v-for="item in category"
              :key="item.title"
              link
              :to="item.route"
            >
              <v-list-item-icon>
                <v-img height="20px" contain :src="item.src"></v-img>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title
                  ><span style="color: white" class="fnt1">{{
                    item.title
                  }}</span></v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-flex>
        <v-flex xs10 text-center align-self-center style="color: white">
          <v-btn @click="logout()" color="white" outlined>
            <span style="color: white"> logout &nbsp; </span>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/firestore";
export default {
  data() {
    return {
      nav: false,
      userType: localStorage.getItem("userType"),
      category: [
        {
          title: " DASHBOARD",
          route: "/dashboard",
          type: "link",
        },

        {
          title: " MANAGE BLOGS",
          route: "/addblog",
          type: "link",
        },

        {
          title: " MY PROFILE",
          route: "/profile",
          type: "link",
        },

        {
          title: "ABOUT US",
          route: "/aboutus",
          type: "link",
        },
      ],
    };
  },

  methods: {
    logout() {
      // Sign out the user using Firebase Authentication
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Successfully logged out
          // Clear token from local storage
          localStorage.removeItem("token");
          // Change the isLoggedIn flag to false
          localStorage.setItem("isLoggedIn", "false");

          // Redirect to the login page if the current route is not already the login page
          if (this.$route.path !== "/") {
            this.$router.push({ path: "/" }).catch(() => {});
          }
        })
        .catch((error) => {
          // Handle any errors that occur during logout
          console.error("Error logging out:", error);
        });
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
<style>
.router-link {
  text-decoration: none;
}
.navbar {
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
}
.fixItem {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 1;
  /* overflow: hidden;
      position: relative;
      height: 100%; */
}
.fnt1 {
  font-size: 13px;
  font-weight: bold;
  font-family: LexendRegular;
}

.app-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 120px;
  height: 64px; /* adjust to desired height */
  background-color: #fff; /* adjust to desired background color */
  border-bottom: 1px solid #ccc; /* adjust to desired border style */
  z-index: 999; /* adjust to desired z-index */
}

.app-content {
  margin-top: 64px; /* adjust to match app bar height */
}

.gradtop {
  /* background-image:inear-gradient(255.36deg, #7BC142 48.09%, #E95D49 127.63%) ; */
  background-image: linear-gradient(#f7f7f7, #f7f7f7);
}
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px; /* adjust height as needed */
  background-color: #fff; /* adjust background color as needed */
  border-bottom: 1px solid #ccc; /* add a border if needed */
  z-index: 999; /* adjust z-index as needed */
}
.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}
</style>
