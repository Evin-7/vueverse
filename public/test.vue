
<template>
  <div>
    <v-layout wrap>
      <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="#192841"
      spinner="line-scale"
    />
      <v-flex xs12>

        <v-flex v-if="userType === 'admin'" xs11 pt-6>
    <v-layout wrap justify-center style="color: white;">
      <!-- Total Blogs -->
      <v-flex xs6 pa-3>
        <v-card class="gradient-card">
          <v-card-text>
              <v-icon color="white">mdi-post-outline</v-icon>
            <div style="color: white;font-size: 20px;">

              TOTAL BLOGS
              <p  v-if="userType === 'user'">{{ yourBlogsCount }}</p>
              <p  v-else>{{ totalBlogs }}</p>

            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      
      <!-- Published Blogs -->
      <v-flex xs6 pa-3>
        <v-card class="gradient-card2">
          <v-card-text>
              <v-icon color="white">mdi-publish</v-icon>

            <div style="color: white;font-size: 20px;">
              <h3 >PUBLISHED BLOGS</h3>
              <p >{{ totalBlogs }}</p>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      
      
    
      <!-- Total Users -->
      <v-flex xs6 pa-3 v-if="userType === 'admin'">
        <v-card class="gradient-card5">
          <v-card-text>
              <v-icon color="white">mdi-account-group
              </v-icon>
            <div  style="color: white;font-size: 20px;">
              <h3 >TOTAL USERS</h3>
            
              <p >{{ totalUsers }}</p>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      
      <!-- New User Registrations -->
      <v-flex xs6 pa-3 v-if="userType === 'admin'">
        <v-card class="gradient-card6">
          <v-card-text>
              <v-icon color="white">mdi-account-badge-outline
              </v-icon>
              <br />
            <div  style="color: white;font-size: 20px;">
              <h3 >NEW USER REGISTRATIONS</h3>
              <p >{{ totalUsers }}</p>

            </div>
          </v-card-text>
        </v-card>
      </v-flex>
     

 
    </v-layout>
  
  </v-flex>


  <v-flex xs12 v-if="userType === 'admin'">
        <DashboardChart :totalBlogs="totalBlogs" :publishedBlogs="totalBlogs" :totalUsers="totalUsers" :newUserRegistrations="totalUsers" />



      </v-flex>


      </v-flex>
    </v-layout>
  </div>
</template>