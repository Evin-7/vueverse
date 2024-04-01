<template>
  <div>
    <headerpage />
    <v-layout wrap justify-center>
      <v-flex xs12 sm12 md2 lg2 xl2 hidden-sm-and-down>
        <v-navigation-drawer
          class="fixedSidebar"
          v-model="sideNav"
          height="100vh"
          width="100%"
          permanent
          fixed
          clipped
          color="white"
        >
          <v-layout wrap>
            <v-flex xs12>
              <v-list>
                <v-list v-for="main in menus3" :key="main._id">
                  <template v-if="main.subMenu">
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-list-group no-action :value.sync="main.open">
                          <template v-slot:activator>
                            <v-layout wrap justify-center>
                              <v-flex
                                xs12
                                text-center
                                :class="{
                                  mainbg6:
                                    $route.path === main.name &&
                                    $route.path === sub.route,
                                }"
                              >
                                <v-layout wrap justify-center>
                                  <v-flex xs2>
                                    <v-img contain :src="main.src"></v-img>
                                  </v-flex>
                                  <v-flex xs9 pt-1 pl-5 text-left>
                                    <v-list-item-title
                                      style="
                                        font-size: 16px;
                                        color: black;
                                        cursor: pointer;
                                        font-family: LexendRegular;
                                      "
                                    >
                                      {{ main.name }}
                                    </v-list-item-title>
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </template>
                          <template v-for="sub in main.subMenu">
                            <v-flex
                              xs12
                              text-right
                              :key="sub._id"
                              style="text-decoration: none"
                              :class="{ mainbg6: $route.path === sub.route }"
                            >
                              <v-layout wrap justify-center>
                                <v-flex xs6 pa-2 text-left>
                                  <router-link
                                    :to="sub.route"
                                    style="text-decoration: none"
                                  >
                                    <span
                                      :style="{
                                        'font-family': 'LexendRegular',
                                        'font-size': ' 14px',
                                      }"
                                      style="
                                        font-size: 15px;
                                        color: black;
                                        cursor: pointer;
                                        font-family: LexendRegular;
                                      "
                                    >
                                      {{ sub.name }}
                                    </span>
                                  </router-link>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </template>
                        </v-list-group>
                      </v-flex>
                    </v-layout>
                  </template>
                  <v-layout wrap justify-end v-else pa-1>
                    <v-flex
                      xs12
                      :class="{ mainbg5: $route.path === main.route }"
                    >
                      <v-list-item-group active-class="activated">
                        <router-link
                          :to="main.route"
                          style="text-decoration: none"
                        >
                          <v-layout wrap class="content" justify-center>
                            <v-flex xs12 sm2 pr-4 align-self-center text-center>
                              <v-img
                                height="30px"
                                contain
                                :src="main.src"
                              ></v-img>
                            </v-flex>
                            <v-flex xs12 sm8 pt-1 align-self-center text-left>
                              <span
                                :style="{
                                  'font-family': 'LexendRegular',
                                  'font-size': '16px',
                                  color:
                                    $route.path === main.route
                                      ? 'black'
                                      : 'black',
                                }"
                                style="
                                  font-size: 18px;
                                  cursor: pointer;
                                  font-family: LexendRegular;
                                "
                              >
                                {{ main.name }}
                              </span>
                            </v-flex>
                          </v-layout>
                        </router-link>
                      </v-list-item-group>
                    </v-flex>
                  </v-layout>
                </v-list>
              </v-list>
            </v-flex>
          </v-layout>
        </v-navigation-drawer>
      </v-flex>
      <v-flex xs12 sm12 md10 lg10 xl10 pt-lg-0>
        <v-layout
          fill-height
          wrap
          justify-center
          :style="$route.name == 'Dashboard'"
        >
          <v-flex xs12>
            <v-card
              :color="$route.name == 'Dashboard' ? 'transparent' : 'white'"
              :flat="$route.name == 'Dashboard' ? true : true"
            >
              <v-layout class="mainbg4" wrap justify-center>
                <v-flex xs12>
                  <router-view></router-view>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
  <script>

import headerpage from "../public/HeaderPage.vue";
export default {
  components: {
    headerpage,
  },
  data() {
    return {
      sideNav: true,
      admin: "",
      list: {},

      menus3: [
        {
          name: " DASHBOARD",
          route: "/dashboard",
          src: require("../src/assets/Images/sideicon1.png"),
          open: false,
        },

        {
          name: " MANAGE BLOGS",
          route: "/addblog",
          src: require("../src/assets/Images/blog.png"),
          open: false,
        },

        {
          name: "  PROFILE",
          route: "/profile",
          src: require("../src/assets/Images/users1.png"),
          open: false,
        },

        {
          name: "ABOUT US",
          route: "/aboutus",
          src: require("../src/assets/Images/aboutus.png"),
        },
      ],
    };
  },
  computed: {},

  methods: {
   
  },
};
</script>
  <style>
/* .activated { */
.activated {
  color: white !important;
  /* font-size:40px  !important; */
}

.demo-bg {
  opacity: 0.6;
}

.mainbg2 {
  background-image: linear-gradient(269.6deg, #e7f1f0 -31.66%, #e7f1f0);
}

.item-text {
  display: flex;
  align-items: center;
  font-size: 18px;
  color: black;
  cursor: pointer;
  font-family: LexendRegular;
  margin-left: 8px;
  /* Adjust the margin as needed */
}

.fixedSidebar {
  /* position: fixed; */

  position: -webkit-sticky;
  /* Safari */
  position: sticky;
  top: 50;
}

@media only screen and (min-device-width: 360px) and (max-device-width: 640px) {
  .fixedSidebar {
    display: none !important;
  }
}

.
  @media
  only
  screen
  and
  (min-device-width: 360px)
  and
  (max-device-width: 640px) {
  .fixedSidebar {
    display: none !important;
  }
}

.content {
  /* Other styles */
  height: 40%;
  /* Set the height to 100% of the parent container */
}


.mainbg5 {
  background-image: linear-gradient(269.6deg, #e7f1f0 -31.66%, #e7f1f0);
  padding: 5px;
}

.mainbg6 {
  background-image: linear-gradient(269.6deg, #e7f1f0 -31.66%, #e7f1f0);
  padding: 5px;
}

.activated .content {
  background-color: #f5f5f5;
}

.activated .mainbg6 {
  background-color: #eeeeee;
}
</style>