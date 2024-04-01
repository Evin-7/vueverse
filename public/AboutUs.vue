<template>
  <v-layout wrap justify-center>
    <v-snackbar v-model="showSnackBar" color="black">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackBar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>

    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="#192841"
      spinner="line-scale"
    />
    <v-flex xs11 pt-5>
      <span style="font-size: 25px; font-weight: bolder">ABOUT US</span>
    </v-flex>
    <v-flex v-if="userType === 'admin'" xs11 pt-4>
      <v-card class="pa-6" style="font-family: LexendRegular">
        <v-layout wrap justify-center>
          <v-flex xs12 pt-4>
            <v-text-field
              label="Heading"
              outlined
              color="#192841"
              dense
              v-model="name"
              type="text"
            ></v-text-field>
            <v-flex pt-4>
              <vue-editor v-model="content"></vue-editor>
            </v-flex>
          </v-flex>
          <v-flex text-center pt-10 pb-6>
            <v-btn color="#192841" @click="saveOrUpdate()">
              <span>
                <span style="color: white"> SAVE </span>
              </span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs11 pt-4>
      <v-card class="pa-3">
        <v-layout wrap>
          <v-flex>
            <span v-html="content"></span>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>
  
  <script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      userType: localStorage.getItem("userType"),

      appLoading: false,
      name: "",
      content: "",
      showSnackBar: false,
      msg: "",
    };
  },
  methods: {
    fetchContent() {
      this.appLoading = true;

      const db = firebase.firestore();
      const aboutUsRef = db.collection("aboutUs").doc("aboutUsDocument");

      aboutUsRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            this.name = data.name;
            this.content = data.content;
            this.appLoading = false;
          } else {
            console.error("About us document not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching about us document:", error);
        });
    },

    saveOrUpdate() {
      const db = firebase.firestore();
      const aboutUsRef = db.collection("aboutUs").doc("aboutUsDocument");

      aboutUsRef
        .set(
          {
            name: this.name,
            content: this.content,
          },
          { merge: true }
        )
        .then(() => {
          this.showSnackBar = true;
          this.msg = "About us content updated successfully";
          this.fetchContent();
        })
        .catch((error) => {
          console.error("Error saving about us content:", error);
          this.showSnackBar = true;
          this.msg = "Error saving about us content. Please try again later.";
        });
    },
  },

  mounted() {
    this.fetchContent();
  },
};
</script>

  