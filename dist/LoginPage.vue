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

                  <v-flex xs10 text-center pt-7>
                    <span style="font-size: 15px;font-family: LexendRegular;">
                      "Discover, Create, Share - Your VueVerse Journey Begins
                      Here!"</span
                    >
                  </v-flex>

                  <v-flex xs10 pt-7>
                    <v-text-field
                      label="E-mail"
                      dense
                      v-model="phoneNumber"
                      outlined
                      hide-details="true"
                      color="#192841"
                    >
                    </v-text-field>
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

                  <v-flex xs10 py-3 @click="signUp()">
  New here? <span class="signup-link">Sign up now!</span>
</v-flex>


                  <v-flex xs10 py-4>
                    <v-btn @click="validateInput()" color="#192841" block>
                      <span style="color: white; text-transform: none"
                        >Login</span
                      >
                      <v-icon color="white">mdi-login</v-icon>
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
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  name: 'FirebaseTest',

  data() {
    return {
      password: "",
      msg: null,
      timeout: 5000,
      showSnackBar: false,

      showPassword: false,
      phoneNumber:"",

    };
  },
  methods: {
    validateInput() {
  // Check if the username (email or phone number) and password are both provided
  if (!this.phoneNumber && !this.password) {
    this.msg = "Please enter your email and password";
    this.showSnackBar = true;
    return;
  } else if (!this.phoneNumber) {
    this.msg = "Please enter your email";
    this.showSnackBar = true;
    return;
  } else if (!this.password) {
    this.msg = "Please enter your password";
    this.showSnackBar = true;
    return;
  }

  
    // Authenticate user using Firebase Authentication
    firebase.auth().signInWithEmailAndPassword(this.phoneNumber, this.password)
      .then((userCredential) => {
        // User authentication successful
        const user = userCredential.user;

        // Optionally, you can clear the form fields after successful login
        this.phoneNumber = '';
        this.password = '';

        // Set user type as regular user
    localStorage.setItem('userType', 'user');
      

        // Redirect regular users to another page after successful login
        // window.location.href = '/dashboard'; // Redirect to dashboard page
        this.msg = "Login successful"; // Provide feedback to regular users
        this.showSnackBar = true;
        this.login(); // Perform login operation

        // Do something with the 'user' variable if needed
        console.log("Authenticated user:", user);
      })
      .catch((error) => {
        // Handle errors that occur during user authentication
        this.msg = "Incorrect username or password"; // Provide error message
        this.showSnackBar = true;
        console.error("Error signing in:", error);
      });
  
},




login() {
  // Get the currently authenticated user
  const currentUser = firebase.auth().currentUser;

  // Check if there's a user
  if (currentUser) {
    // Check if the user's email matches the admin email
    if (currentUser.email === "admin@vueverse.com") {
      // Set userType as admin
      localStorage.setItem('userType', 'admin');
    } else {
      // Set userType as regular user
      localStorage.setItem('userType', 'user');
    }

    // Retrieve the user's authentication token
    currentUser.getIdToken(/* forceRefresh */ true)
      .then(token => {
        // Store the authentication token in localStorage
        localStorage.setItem('token', token);
        
        // Set isLoggedIn flag to true in local storage
        localStorage.setItem('isLoggedIn', true);

        // Check if the current route is not already the dashboard route
        if (this.$route.path !== '/dashboard') {
          // Redirect the user to the dashboard page
          this.$router.push({ path: "/dashboard" });
        }
      })
      .catch(error => {
        console.error("Error retrieving user token:", error);
        // Handle error if unable to retrieve token
      });
  } else {
    console.error("No user is currently authenticated.");
  }
},


signUp(){

  this.$router.push({ path: "/signup" });

},
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
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

</style>
