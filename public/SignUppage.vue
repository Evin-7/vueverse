<template>
  <div>
    <v-snackbar v-model="showSnackBar" color="white" right :timeout="timeout">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: #192841">
            {{ msg }}
          </span>
        </v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackBar = false">
            <v-icon style="color: #192841">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap>
      <v-flex xs12>
        <v-img
          style="height: 100vh"
          text
          src="../src/assets/Images/mainbackground.jpg"
        >
          <v-layout wrap fill-height justify-center align-self-center>
            <v-flex xs10 sm5 md4 lg3 xl2 align-self-center>
              <v-card class="grey-gradient">
                <v-layout wrap justify-center>
                  <v-flex xs5 pt-4>
                    <v-img
                      style="cursor: pointer"
                      text
                      src="../src/assets/Images/mainlogovv.png"
                    ></v-img>
                  </v-flex>

                  <v-flex xs10 text-center pt-5>
                    <span style="font-size: 15px; font-family: LexendRegular">
                      "Discover, Create, Share - Your VueVerse Journey Begins
                      Here!"</span
                    >
                  </v-flex>

                  <v-flex xs10 pt-5>
                    <v-text-field
                      label="Email"
                      dense
                      v-model="email"
                      outlined
                      color="#192841"
                      :rules="[
                        (v) => !!v || 'Email is required',
                        (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
                      ]"
                    >
                    </v-text-field>
                  </v-flex>
                  <v-flex xs10>
                    <v-text-field
                      label="Phone Number"
                      dense
                      v-model="phoneNumber"
                      outlined
                      color="#192841"
                      :rules="[
                        (v) => !!v || 'Phone number is required',
                        (v) =>
                          /^\d{10}$/.test(v) ||
                          'Phone number must be 10 digits',
                      ]"
                    >
                    </v-text-field>
                  </v-flex>
                  <v-flex xs10>
                    <v-text-field
                      hide-details="true"
                      v-model="confirmpassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      color="#192841"
                      label="Confirm Password"
                      outlined
                      dense
                      :append-icon="
                        showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      @click:append="toggleConfirmPasswordVisibility"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs10 pt-7>
                    <v-text-field
                      hide-details="true"
                      v-model="password"
                      :type="showPassword ? 'text' : 'password'"
                      color="#192841"
                      label="Password"
                      outlined
                      dense
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="togglePasswordVisibility"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs10 py-3 @click="loginPage()" class="signup-section">
                    Already have an account?
                    <span class="login-link">Login here!</span>
                  </v-flex>

                  <v-flex xs10 py-4>
                    <v-btn @click="validateInput()" color="#192841" block>
                      <span style="color: white; text-transform: none"
                        >Sign up</span
                      >
                      <v-icon color="white">mdi-arrow-right-box</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-img>
      </v-flex>
    </v-layout>
  </div>
</template>
  
  
  <script>
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  name: "FirebaseTest",

  data() {
    return {
      password: "",
      msg: null,
      timeout: 5000,
      showSnackBar: false,
      email: "",
      showPassword: false,
      phoneNumber: "",
      confirmpassword: "",
      showConfirmPassword: false,
    };
  },
  methods: {
    validateInput() {
      // Regular expression pattern for email validation
      const emailPattern = /.+@.+\..+/;

      // Regular expression pattern for phone number validation (10 digits)
      const phoneNumberPattern = /^\d{10}$/;

      if (!this.email) {
        this.msg = "Please provide an email";
        this.showSnackBar = true;
        return;
      } else if (!emailPattern.test(this.email)) {
        this.msg = "Please provide a valid email";
        this.showSnackBar = true;
        return;
      } else if (!this.phoneNumber) {
        this.msg = "Please provide a phone number";
        this.showSnackBar = true;
        return;
      } else if (!phoneNumberPattern.test(this.phoneNumber)) {
        this.msg = "Please provide a valid phone number (10 digits)";
        this.showSnackBar = true;
        return;
      } else if (!this.password) {
        this.msg = "Please provide a password";
        this.showSnackBar = true;
        return;
      } else if (!this.confirmpassword) {
        this.msg = "Please confirm the password";
        this.showSnackBar = true;
        return;
      } else if (this.password !== this.confirmpassword) {
        this.msg = "Passwords do not match";
        this.showSnackBar = true;
        return;
      } else {
        this.msg = "User  Registered successfully";
        this.showSnackBar = true;
        this.signUp();
      }
    },
   
    signUp() {
  // Check if both email, password, and phone number are provided
  if (!this.email || !this.password || !this.phoneNumber) {
    // Provide feedback to the user about missing information
    console.error("Please enter email, password, and phone number");
    // Optionally, show a snackbar or alert message to the user
    return;
  }

  // Create a new user with email, password, and phone number
  firebase
    .auth()
    .createUserWithEmailAndPassword(this.email, this.password)
    .then((userCredential) => {
      // User creation successful, get the user's unique ID
      const userId = userCredential.user.uid;
      // Initialize Firestore database
      const db = firebase.firestore();
      // Store additional user data in a 'users' collection
      db.collection("users")
        .doc(userId)
        .set({
          email: this.email,
          phoneNumber: this.phoneNumber,
          // You can add more user data fields here if needed
        })
        .then(() => {
          // User data stored successfully
          console.log("User data stored in Firestore");

          // Optionally, you can clear the form fields after signup
          this.email = "";
          this.phoneNumber = "";
          this.password = "";
          this.confirmpassword = "";
          // Redirect the user to the login page
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          // Handle any errors that occur during Firestore operation
          console.error("Error storing user data:", error);
          // Optionally, provide feedback to the user about the error
        });
    })
    .catch((error) => {
      // Handle errors that occur during user creation
      console.error("Error creating user:", error);
      // Optionally, provide feedback to the user about the error
    });
},



loginPage() {
      this.$router.push({ path: "/" });
    },


    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
  },
};
</script>
  <style scoped>
.grey-gradient {
  background: linear-gradient(to bottom right, #f5f5f5, #ffffff);
}

.signup-link {
  color: #007bff; /* Change the color to match your design */
  cursor: pointer;
  text-decoration: underline;
}

.login-link {
  color: #007bff; /* Change the color to match your design */
  cursor: pointer;
  text-decoration: underline;
}
</style>
  