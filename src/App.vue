<template>
    <v-app>
    <v-main>
      <v-layout style="font-family: LexendRegular;" fill-height  wrap >
        <v-flex xs12>
         <!-- <headerpage /> -->
          

<router-view>
</router-view>
        </v-flex>
      </v-layout>
     
    </v-main>
  </v-app>
</template>

<script>
import "./assets/style/fonts.css";
import "./assets/style/style.css";
// import headerpage from "./components/HeaderPage.vue"
export default {
  name: 'App',

  components: {
    // headerpage
  },

  data: () => ({
    //
  }),
};
</script>
