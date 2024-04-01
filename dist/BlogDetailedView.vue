<template>
  <div>
    <v-layout wrap justify-center>
      <v-flex xs10 pt-3>
        <v-layout wrap justify-center>
          <v-flex xs12 lg12>
            <v-card>
              <v-layout wrap justify-center pt-3>
                <v-flex xs12>
                  <v-layout wrap justify-start>
                    <v-flex xs12 v-if="blogItem && blogItem.topImage">
                      <v-layout wrap justify-center>
                        <v-flex xs12>
                          <v-img
                            :src="blogItem.topImage"
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
                <v-flex xs12 sm8 lg12>
                  <v-layout wrap justify-center fill-height>
                    <v-flex v-if="blogItem && blogItem.name" xs11 lg11 pt-3 align-self-center text-left>
                      <strong>Blog Name:</strong>
                      <span style="font-size: 14px">
                        {{ blogItem.name }}
                      </span>
                    </v-flex>

                    <v-flex xs11 lg11 pt-3 align-self-center text-left >
                      <strong>Added by :</strong>
                      <span
                        v-if="useremail"
                        style="font-size: 14px"
                      >
                        {{ useremail}}
                      </span>
                    </v-flex>

                    <v-flex  v-if="blogItem && blogItem.description" xs11 lg11 pt-3 align-self-center text-left>
                      <strong>Description :</strong>
                      <span style="font-size: 14px">
                        {{ blogItem.description }}
                      </span>
                    </v-flex>

                    <v-flex v-if="blogItem && blogItem.content" xs11 lg11 pt-3 align-self-center text-left>
                      <strong>Content :</strong>
                      <span v-html="blogItem.content" style="font-size: 14px">
                      </span>
                    </v-flex>

                    <v-flex xs11 lg11 pt-3 align-self-center text-left>
                      <strong>Phone number :</strong>
                      <span
                        v-if="
                          blogItem && blogItem.user && blogItem.user.phoneNumber
                        "
                        style="font-size: 14px"
                      >
                        {{ blogItem.user.phoneNumber }}
                      </span>
                    </v-flex>

                    <v-flex xs11 lg11 pt-3 align-self-center text-left>
                      <strong>Time :</strong>
                      <span v-if="blogItem && blogItem.createdAt">
                        {{ formatTime(blogItem.createdAt) }}
                      </span>
                    </v-flex>

                    <v-flex xs11 lg11 pt-3 align-self-center text-left>
                      <strong>Date :</strong>
                      <span v-if="blogItem && blogItem.createdAt">
                        {{ formatDate(blogItem.createdAt) }}
                      </span>
                    </v-flex>
                  </v-layout>
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
export default {
  data() {
    return {

        useremail:this.$route.query.useremail,
      blogItem: null,
    };
  },
  mounted() {
    this.fetchBlogDetails(); 
  },
  methods: {
    formatTime(timestamp) {
      const date = new Date(timestamp);
      const formattedDateTime = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
      return formattedDateTime;
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      const formattedDateTime = date.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return formattedDateTime;
    },
    fetchBlogDetails() {
      const itemString = this.$route.query.item; // Get the item string from the query parameters
      if (itemString) {
        try {
          const item = JSON.parse(itemString); // Parse the item string into an object
          // Extract the fields from the parsed item
          const {
            name,
            email,
            description,
            createdAt,
            content,
            phoneNumber,
            topImage,
          } = item;
          // Construct the blogItem object with the extracted fields
          this.blogItem = {
            name,
            user: { email, phoneNumber },
            description,
            createdAt,
            content,
            topImage,
          };
        } catch (error) {
          console.error("Error parsing blog item:", error);
        }
      } else {
        console.error("No blog item data found in query parameters.");
      }
    },
  },
};
</script>
