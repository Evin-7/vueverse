<template>
  <div>
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
    <v-layout style="font-family: LexendRegular" wrap pb-9>
      <v-flex xs12>
        <v-layout wrap pr-1 pt-7 justify-center>
          <v-flex xs11 sm9 lg9 text-left>
            <span style="font-size: 25px; font-weight: bolder">BLOGS</span>
          </v-flex>
          <v-flex xs11 sm2 lg2 pb-5>
            <v-btn
              v-if="userType === 'user'"
              block
              class="custombackground"
              dark
              width="160px"
              @click="addDialog = true"
              ><span
                style="
                  font-family: LexendRegular;
                  font-size: 15px;
                  color: white;
                  letter-spacing: 1px;
                  cursor: pointer;
                "
                >Add
              </span>
              <v-icon dark size="15px"> mdi-plus </v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <v-layout wrap pa-4 v-if="list.length > 0">
          <v-flex
            xs12
            sm4
            md4
            lg4
            xl3
            pt-3
            pa-2
            v-for="(item, index) in list"
            :key="index"
          >
            <v-layout wrap justify-center>
              <v-flex xs12 lg10>
                <v-card>
                  <v-layout wrap justify-center pt-3>
                    <v-flex xs11>
                      <v-layout wrap justify-start>
                        <v-flex xs12 v-if="item.topImage">
                          <v-layout wrap justify-center>
                            <v-flex xs12>
                              <v-img
                                :src="item.topImage"
                                height="100%"
                                width="100%"
                                contain
                              ></v-img>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex xs12 v-else>
                          <v-img
                            height="150px"
                            width="100%"
                            src="../src/assets/Images/noimg.png"
                          ></v-img>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 sm11 lg12>
                      <v-layout wrap justify-center fill-height>
                        <v-flex xs11 lg11 pt-3 align-self-center text-center>
                          <strong>Blog Name:</strong>
                          <span style="font-size: 14px">
                            {{ item.name }}
                          </span>
                        </v-flex>
                        <v-flex xs11 lg11 pt-3 pb-2 align-self-center>
                          <v-layout wrap justify-center>
                            <v-flex xs12>
                              <v-btn
                                block
                                outlined
                                @click="handleEditClick(item)"
                                color="#192841"
                              >
                                <span
                                  style="color: black; text-transform: none"
                                >
                                  Edit
                                </span>
                                &nbsp;
                                <v-icon size="100%" color="#192841">
                                  mdi-pencil
                                </v-icon>
                              </v-btn>
                            </v-flex>
                            <v-flex xs12 pt-3>
                              <v-btn
                                @click="
                                  (deleteDialog = true), (deleteid = item.index)
                                "
                                block
                                outlined
                                color="#192841"
                              >
                                <span
                                  style="color: black; text-transform: none"
                                >
                                  Delete
                                </span>
                                &nbsp;
                                <v-icon size="100%" color="#192841">
                                  mdi-delete
                                </v-icon>
                              </v-btn>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout wrap v-else>
          <v-flex xs12 text-center>
            <span v-if="userType === 'user'"
              >Oops! No data found. Start by adding some blogs.</span
            >
          </v-flex>
        </v-layout>
        <v-layout wrap v-if="blogs.length > 0">
          <v-flex
            xs12
            sm4
            md4
            lg4
            xl3
            pa-2
            pt-3
            v-for="(item, index) in blogs"
            :key="index"
          >
            <v-layout wrap justify-center>
              <v-flex xs12 lg10>
                <v-card>
                  <v-layout wrap justify-center pt-3>
                    <v-flex xs11 >
                      <v-layout wrap justify-start>
                        <v-flex xs12 v-if="item.topImage">
                          <v-layout wrap justify-center>
                            <v-flex xs12>
                              <v-img
                                :src="item.topImage"
                                height="100%"
                                width="100%"
                                contain
                              ></v-img>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex xs12 v-else>
                          <v-img
                            height="150px"
                            width="100%"
                            src="../src/assets/Images/noimg.png"

                          ></v-img>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 sm12 lg12>
                      <v-layout wrap justify-center fill-height>
                        <v-flex xs11 sm11 lg11 pt-3 align-self-center text-left>
                          <strong>Blog Name:</strong>
                          <span style="font-size: 14px">
                            {{ item.name }}
                          </span>
                        </v-flex>

                        <v-flex xs11 lg11 pt-3 align-self-center text-left>
                          <strong>Added by :</strong>
                          <span
                            v-if="item && item.user && item.user.email"
                            style="font-size: 14px"
                          >
                            {{ item.user.email }}
                          </span>
                        </v-flex>

                        <v-flex xs11 lg11 pt-3 align-self-center text-left>
                          <strong>Description :</strong>
                          <span style="font-size: 14px">
                            {{ item.description }}
                          </span>
                        </v-flex>

                        <v-flex xs11 lg11 pt-3 align-self-center text-left>
                          <strong>Phone number :</strong>
                          <span
                            v-if="item && item.user && item.user.phoneNumber"
                            style="font-size: 14px"
                          >
                            {{ item.user.phoneNumber }}
                          </span>
                        </v-flex>

                        <v-flex xs11 lg11 pt-3 align-self-center text-left>
                          <strong>Time :</strong>
                          <span v-if="item && item.createdAt">
                            {{ formatTime(item.createdAt) }}
                          </span>
                        </v-flex>

                        <v-flex xs11 lg11 pt-3 align-self-center text-left>
                          <strong>Date :</strong>
                          <span v-if="item && item.createdAt">
                            {{ formatDate(item.createdAt) }}
                          </span>
                        </v-flex>

                        <v-flex
                          xs11
                          pt-3
                          pb-5
                          @click="navigateToBlogDetails(item, item.user.email)"
                        >
                          <v-btn block outlined color="#192841">
                            <span>VIEW</span>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout wrap v-else>
          <v-flex xs12 text-center v-if="userType === 'admin'">
            <span>Oops! No data found.</span>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-dialog v-model="deleteDialog" max-width="400">
        <v-card style="font-family: LexendRegular">
          <v-card-title style="font-family: LexendRegular">
            <span> Delete Confirmation </span>
          </v-card-title>
          <v-card-text>
            <span style="font-family: LexendRegular">
              Are you sure you want to delete?
            </span>
          </v-card-text>
          <v-card-actions>
            <v-layout wrap justify-center>
              <v-flex xs3>
                <v-btn
                  style="text-transform: none; color: red"
                  text
                  @click="deleteBlog(index)"
                  >Yes</v-btn
                >
              </v-flex>
              <v-flex xs3>
                <v-btn
                  style="text-transform: none"
                  text
                  @click="deleteDialog = false"
                  >No</v-btn
                >
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        :retain-focus="true"
        persistent
        v-model="editdialog"
        max-width="650px"
      >
        <v-card style="font-family: LexendRegular">
          <v-layout wrap justify-center>
            <v-flex
              ><v-layout wrap justify-center pa-3>
                <v-flex xs12 text-right>
                  <v-icon
                    @click="editdialog = false"
                    color="red"
                    size="150%"
                    dark
                  >
                    mdi-close
                  </v-icon>
                </v-flex>
                <v-flex xs10>
                  <span
                    style="
                      color: black;
                      font-size: 16px;
                      font-weight: bold;
                      font-family: LexendRegular;
                    "
                    >Name</span
                  >
                  <v-form @submit.prevent="validateInput">
                    <v-text-field
                      color="black"
                      outlined
                      background-color="white"
                      dense
                      type="text"
                      v-model="curid.name"
                      hide-details
                    >
                    </v-text-field>
                  </v-form>
                </v-flex>

                <v-flex xs10 pt-4>
                  <span style="color: black; font-size: 16px; font-weight: bold"
                    >Description</span
                  >
                  <v-form @submit.prevent="validateInput">
                    <v-textarea
                      color="black"
                      outlined
                      background-color="white"
                      dense
                      type="text"
                      v-model="curid.description"
                      hide-details
                    >
                    </v-textarea>
                  </v-form>
                </v-flex>

                <v-flex xs10 pt-4>
                  <span style="color: black; font-size: 16px; font-weight: bold"
                    >Content</span
                  >

                  <vue-editor v-model="curid.content"></vue-editor>
                </v-flex>
                <v-flex
                  xs10
                  pt-6
                  style="color: black; font-size: 16px; font-weight: bold"
                >
                  <v-layout wrap>
                    <v-flex xs6>
                      <v-img
                        v-if="curid.topImage"
                        :src="curid.topImage"
                      ></v-img>
                    </v-flex>
                    <v-flex xs6 pl-10>
                      <span>Edit Image</span>
                      <ImageComp
                        @stepper="winStepper"
                        :height="'1000'"
                        :width="'1300'"
                        :heading="'Upload Image'"
                        :componentType="'topImage'"
                      />
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex xs3 text-right pt-3>
                  <v-btn
                    block
                    class="custombackground"
                    dark
                    width="100px"
                    @click="edit()"
                  >
                    <span style="color: white; font-size: 14px"> Edit </span>
                    <v-icon size="15px" color="white"> mdi-pencil </v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>

      <v-dialog
        :retain-focus="true"
        persistent
        v-model="addDialog"
        max-width="650px"
      >
        <v-card style="font-family: LexendRegular">
          <v-layout wrap justify-center>
            <v-flex
              ><v-layout wrap justify-center pa-3>
                <v-flex xs12 text-right>
                  <v-icon
                    @click="addDialog = false"
                    color="red"
                    size="150%"
                    dark
                  >
                    mdi-close
                  </v-icon>
                </v-flex>
                <v-flex xs10>
                  <span style="color: black; font-size: 16px; font-weight: bold"
                    >Title
                  </span>
                  <v-form @submit.prevent="validateInput">
                    <v-text-field
                      color="black"
                      outlined
                      background-color="white"
                      dense
                      type="text"
                      v-model="name"
                      hide-details
                    >
                    </v-text-field>
                  </v-form>
                </v-flex>

                <v-flex xs10 pt-4>
                  <span style="color: black; font-size: 16px; font-weight: bold"
                    >Description</span
                  >
                  <v-form @submit.prevent="validateInput">
                    <v-text-field
                      color="black"
                      outlined
                      background-color="white"
                      dense
                      type="text"
                      v-model="description"
                      hide-details
                    >
                    </v-text-field>
                  </v-form>
                </v-flex>

                <v-flex xs10 pt-4>
                  <span style="color: black; font-size: 16px; font-weight: bold"
                    >Content</span
                  >
                  <vue-editor v-model="content"></vue-editor>
                </v-flex>

                <v-flex
                  xs10
                  pt-6
                  style="color: black; font-size: 16px; font-weight: bold"
                >
                  <span style="color: black; font-size: 16px; font-weight: bold"
                    >Add Image</span
                  >
                  <ImageComp
                    @stepper="winStepper"
                    :height="'1000'"
                    :width="'1300'"
                    :heading="'Upload Image'"
                    :componentType="'topImage'"
                  />
                </v-flex>

                <v-flex xs3 text-right pt-3>
                  <v-btn
                    block
                    class="custombackground"
                    dark
                    width="100px"
                    @click="validateFields()"
                  >
                    <span style="color: white; font-size: 14px"> Add </span>
                    <v-icon size="15px" color="white">mdi-plus</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
  <script>
import ImageComp from "../public/singleImage.vue";
import { VueEditor } from "vue2-editor";

import firebase from "firebase/app";
import "firebase/firestore";

export default {
  name: "FirebaseTest",

  components: {
    ImageComp,
    VueEditor,
  },
  data() {
    return {
      userType: localStorage.getItem("userType"),
      showSnackBar: false,
      deletedialog: false,
      content: "",
      description: "",
      sub: false,
      ServerError: false,
      deleteDialog: false,
      timeout: 5000,
      prev: null,
      msg: null,
      curid: [],
      dialog: false,
      editdialog: false,
      name: "",
      appLoading: false,
      dialogDelete: false,
      search: "",
      itemname: "",
      addcat: false,
      list: [],
      coverImageFile: null,
      selectedFiles: [],
      image: null,
      role: null,
      coverImageArray: [],
      formDataCover: new FormData(),
      flagg: true,
      subname: null,
      menu: false,
      menu1: false,
      deleteid: "",
      menu2: false,
      menu22: false,
      formData2: new FormData(),
      empList2: null,
      toDate: null,
      fromDate: null,
      formData: new FormData(),
      formData3: new FormData(),

      empList3: null,
      search1: null,
      search2: null,
      search3: null,
      search11: null,
      id: "",
      search22: null,
      topImage: null,
      blogs: [],
      searchInput: null,
      search33: null,
      keysearch: null,
      ffprojectList: null,
      addDialog: false,
    };
  },

  mounted() {
    if (this.userType === "admin") {
      this.getAllBlogs();
    } else if (this.userType === "user") {
      this.getBlogs();
    }
    // Fetch locations data when the component mounts
  },

  methods: {
    getAllBlogs() {
      console.log("Fetching all blogs...");
      this.appLoading = true;

      // Get a reference to the Firestore database
      const db = firebase.firestore();

      // Fetch all blogs
      db.collection("blogs")
        .get()
        .then(async (querySnapshot) => {
          // Iterate through the documents and fetch user data for each blog
          const promises = querySnapshot.docs.map(async (doc) => {
            const blogData = doc.data();
            const userId = blogData.userId;

            // Fetch user data for the current blog
            const userDoc = await db.collection("users").doc(userId).get();
            const userData = userDoc.data();

            // Populate the user property of the blog with user data
            blogData.user = userData;

            return blogData;
          });

          // Resolve all promises
          const blogs = await Promise.all(promises);

          // Update the blogs array with the fetched data
          this.blogs = blogs;
          this.appLoading = false;
        })
        .catch((error) => {
          // Handle any errors that occur during the Firestore operation
          console.error("Error fetching all blogs:", error);
          // Optionally, provide feedback to the user about the error
          this.appLoading = false;
        });
    },

    deleteBlog(index) {
      // Remove the blog at the specified index from the list
      this.list.splice(index, 1);

      // Update the blogs data in Local Storage
      localStorage.setItem("blogs", JSON.stringify(this.list));
      this.deleteDialog = false;
      this.msg = "Blog deleted successfully";
      this.showSnackBar = true;
      this.editdialog = false;
      this.getBlogs();
    },
    navigateToBlogDetails(item, useremail) {
      const itemToSend = {
        name: item.name,
        description: item.description,
        createdAt: item.createdAt,
        content: item.content,
        phoneNumber: item.user ? item.user.phoneNumber : null,
        topImage: item.topImage,
      };

      this.$router.push({
        name: "BlogDetails",
        query: {
          item: JSON.stringify(itemToSend),
          useremail: useremail,
        },
      });
    },

    getBlogs() {
      this.appLoading = true;
      // Get the current user
      const currentUser = firebase.auth().currentUser;

      if (!currentUser) {
        // User is not authenticated, handle this case if needed
        console.error("User is not authenticated.");
        return;
      }

      // Get a reference to the Firestore database
      const db = firebase.firestore();

      // Query the "blogs" collection to fetch blogs associated with the current user
      db.collection("blogs")
        .where("userId", "==", currentUser.uid)
        .get()
        .then((querySnapshot) => {
          const storedLocations = [];
          querySnapshot.forEach((doc) => {
            // For each document in the collection, push it to the storedLocations array
            storedLocations.push({ id: doc.id, ...doc.data() });
          });
          // Set the list data to the fetched locations
          this.list = storedLocations;
          this.appLoading = false;
        })
        .catch((error) => {
          // Handle any errors that occur during the Firestore operation
          console.error("Error fetching locations: ", error);
          // Optionally, provide feedback to the user about the error
        });
    },

    validateFields() {
      if (!this.name) {
        this.msg = "Please enter Blog title";
        this.showSnackBar = true;
        return;
      } else if (!this.description) {
        this.msg = "Please enter Blog description";
        this.showSnackBar = true;
        return;
      } else if (!this.content) {
        this.msg = "Please enter Blog content";
        this.showSnackBar = true;
        return;
      } else if (!this.topImage) {
        this.msg = "Please enter Blog image";
        this.showSnackBar = true;
        return;
      } else {
        this.add();
      }
    },

    add() {
      const reader = new FileReader();
      reader.readAsDataURL(this.topImage);
      reader.onload = () => {
        // Get the current user
        const currentUser = firebase.auth().currentUser;

        if (!currentUser) {
          // User is not authenticated, handle this case if needed
          console.error("User is not authenticated.");
          return;
        }

        // Get the current date and time
        const currentDate = new Date();
        const dateTimeString = currentDate.toISOString(); // Convert to ISO string format

        let newBlog = {
          name: this.name,
          description: this.description,
          content: this.content,
          topImage: reader.result,
          userId: currentUser.uid, // Store the user's UID along with the blog data
          createdAt: dateTimeString, // Store the current date and time
        };

        // Get a reference to the Firestore database
        const db = firebase.firestore();

        // Add the new blog to the "blogs" collection in Firestore
        db.collection("blogs")
          .add(newBlog)
          .then(() => {
            this.msg = "Blog added successfully";
            this.showSnackBar = true;
            // Reset the form fields
            this.name = "";
            this.description = "";
            this.content = "";
            this.topImage = null;
            this.addDialog = false;
            this.getBlogs();
          })
          .catch((error) => {
            // Handle any errors that occur during the Firestore operation
            console.error("Error adding blog: ", error);
            // Provide feedback to the user about the error
            this.$emit(
              "snackbar",
              "Error adding blog. Please try again later."
            );
          });
      };
    },

    edit() {
      // Get a reference to the Firestore database
      const db = firebase.firestore();

      // Find the document to edit based on its ID
      db.collection("blogs")
        .doc(this.curid.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            // Check if a new image has been selected
            if (this.topImage instanceof File) {
              // Convert the new image to Base64 format
              const reader = new FileReader();
              reader.readAsDataURL(this.topImage);
              reader.onload = () => {
                // Update the blog document in Firestore with the edited values
                db.collection("blogs")
                  .doc(this.curid.id)
                  .update({
                    name: this.curid.name,
                    description: this.curid.description,
                    content: this.curid.content,
                    topImage: reader.result, // Assign the Base64 image data
                  })
                  .then(() => {
                    // Provide feedback to the user that the blog was edited successfully
                    this.msg = "Blog edited successfully";
                    this.showSnackBar = true;
                    this.editdialog = false;
                    this.getBlogs();
                  })
                  .catch((error) => {
                    // Handle any errors that occur during the Firestore operation
                    console.error("Error editing blog:", error);
                    // Optionally, provide feedback to the user about the error
                  });
              };
            } else {
              // Update the blog document in Firestore with the edited values
              db.collection("blogs")
                .doc(this.curid.id)
                .update({
                  name: this.curid.name,
                  description: this.curid.description,
                  content: this.curid.content,
                  // Keep the existing image if no new image is selected
                })
                .then(() => {
                  // Provide feedback to the user that the blog was edited successfully
                  this.msg = "Blog edited successfully";
                  this.showSnackBar = true;
                  this.editdialog = false;
                  this.getBlogs();
                })
                .catch((error) => {
                  // Handle any errors that occur during the Firestore operation
                  console.error("Error editing blog:", error);
                  // Optionally, provide feedback to the user about the error
                });
            }
          } else {
            // Blog not found, provide feedback to the user
            this.$emit("snackbar", "Blog not found");
          }
        })
        .catch((error) => {
          // Handle any errors that occur during the Firestore operation
          console.error("Error retrieving blog for editing:", error);
          // Optionally, provide feedback to the user about the error
        });

      // Close the edit dialog
      this.editdialog = false;
    },

    formatTime(timestamp) {
      const date = new Date(timestamp);
      // Format the date and time as per your requirement
      const formattedDateTime = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
      return formattedDateTime;
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      // Format the date and time as per your requirement
      const formattedDateTime = date.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return formattedDateTime;
    },
    handleEditClick(item) {
      this.curid = item;
      console.log("data is", this.curid);
      this.topImage = this.curid.topImage;
      console.log("photo", this.topImage);
      this.editdialog = true;
    },

    winStepper(window_data) {
      if (window_data.type == "topImage") {
        this.topImage = window_data.selectedFiles;
      } else if (window_data.type == "image") {
        this.imageArray = window_data.imageArray;
        this.imageFiles.push(window_data.selectedFiles);
      } else if (window_data.type == "imageRemoval") {
        var values = this.formData.getAll("photos");
        values.splice(window_data.removalItem, 1);
        this.formData.set("photos", values);
        this.imageArray = window_data.imageArray;
      }
    },
  },
};
</script>
  <style >
.buttongrad {
  background: linear-gradient(to right, black, black);
}

.justified-text {
  text-align: justify;
}

.cus {
  background-color: #13736f;
}

.no-uppercase {
  text-transform: none !important;
}

.cus2 {
  background: var(
    --grend,
    linear-gradient(
      252deg,
      #e4ecee 0%,
      #9bc2c2 0%,
      #6ca6a5 28%,
      #157470 88%,
      #13736f 100%
    )
  );
}
</style>