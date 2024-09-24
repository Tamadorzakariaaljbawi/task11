<template>
  <v-app id="login" >





      <v-container fluid class="pa-0 ma-0">
        <v-row>
          <v-col class="d-none d-sm-flex
">
            <div>
              <img src="@/assets/1698143983387.jpg" class="h-100">
            </div>

          </v-col>
          <v-col>
            <v-row justify="center" align="center" style="height: 100vh;">
              <v-col cols="12" md="6">
                <div class="center-div">

                  <v-form ref="form"   v-model="form"    @submit.prevent="validate">
                    <h3 > email </h3>


                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      :readonly="loading"
                      required
                      input-class="text-right"
                      variant="underlined"
                      clearable
                    ></v-text-field>


                    <h3 >password </h3>
                    <v-text-field
                      v-model="password"

                      :rules="passwordRules"
                      variant="underlined"
                      required
                      :readonly="loading"
                      clearable
                      type="password"
                    ></v-text-field>




                    <div class="d-flex flex-column">
                      <v-btn
                        color="#FBB52E"
                        class="mt-4 w-25 text-white"
                        block
                        type="submit"
                        :disabled="!form"
                        :loading="loading"
                      >
                        login

                      </v-btn>

                    </div>
                  </v-form>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>



  </v-app>
</template>

<!--<script setup>
import { ref } from 'vue'
const drawer = ref(null)
</script>-->
<script>
import { toast } from 'vue3-toastify';
import axios from 'axios'
import APP_URL from "@/init/gc";
import router from "@/router";

export default {
  data: () => ({
    form: false,
    loading: false,
    drawer: null,
    email:'',
    password:null,
    emailRules:[  v => !!v || 'الايميل مطلوب',
      v => /.+@.+/.test(v) || 'تأكد من كتابة الايميل '],
    passwordRules:[v => !!v || 'كلمة السر مطلوبة ',  v => (v && v.length >= 8) || 'كلمة السر لابد أن تكون 8 محارف على الاقل ',],

  }),

  methods: {
    async validate () {
      const { valid } = await this.$refs.form.validate()
      let data = new FormData()
      data.append('email',this.email)
      data.append('password',this.password)
      data.append('device_token',this.password)

      if (valid) {
        this.loading = true
        axios.post(APP_URL+'admin-login',data).then((res)=>
        {


          setTimeout(() => (this.loading = false), 2000)
          console.log(res.data.token)
          router.push('/home')
          localStorage.setItem('token',res.data.token)

        })

      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
  },
}
</script>
<style>
.triangle {
  border-top: 20vw solid transparent;
  border-right: 51vw   solid transparent;
  border-bottom: 40vw solid ;
  /*border-left: 20vw solid white;*/
  margin: 0 auto;

}
</style>
