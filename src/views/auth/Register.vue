<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { AuthService } from "@/services";
import ProgressSpinner from "primevue/progressspinner";

const authService = new AuthService();

const router = useRouter();

const check = ref(false);
const loading = ref(false);

const user = reactive({
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phone: "",
});

const err = reactive({
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phone: "",
});

const checkEmail = async () => {
  loading.value = true;
  try {
    await authService.checkEmail({ email: user.email });
    check.value = true;
  } catch (error) {
    err.email = error.response?.data.errors[0].msg;
  } finally {
    loading.value = false;
  }
};

const resetErr = (e) => {
  err[e.target.id] = "";
};

const handleRegister = async () => {
  loading.value = true;
  try {
    await authService.register(user);
    router.push("/auth/login");
  } catch (error) {
    const errors = error.response?.data.errors;
    console.log({ errors });
    if (errors) {
      for (let e of errors) {
        console.log(e.param);
        err[e.param] = e.msg;
      }
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="p-7 border rounded-md shadow-md bg-white">
    <h2 class="text-[30px] font-bold text-center mb-4">Register Now!</h2>
    <div>
      <div v-if="!check" class="px-[10px]">
        <div class="p-float-label">
          <InputText
            id="email"
            :type="'email'"
            v-model="user.email"
            class="w-full"
            @keydown="err.email = ''"
          />

          <label for="email">Email</label>
        </div>

        <span class="error-msg block mb-2">{{ err.email }}</span>

        <Button
          @click="checkEmail"
          class="w-full mt-5 flex items-center justify-center"
          size="small"
          :disabled="loading"
          ><ProgressSpinner
            v-if="loading"
            style="width: 20px; height: 20px"
            strokeWidth="6"
          />
          <span v-else>Next</span>
        </Button>
      </div>

      <div v-else class="px-[10px]">
        <div class="flex justify-between">
          <div class="w-[48%]">
            <div class="p-float-label">
              <InputText
                id="firstName"
                :type="'text'"
                v-model="user.firstName"
                class="w-full"
                @input="resetErr"
              />
              <label for="firstName">First Name </label>
            </div>
            <span class="error-msg">{{ err.firstName }}</span>
          </div>

          <div class="w-[48%]">
            <div class="p-float-label">
              <InputText
                id="lastName"
                :type="'text'"
                v-model="user.lastName"
                class="w-full"
                @input="resetErr"
              />
              <label for="lastName">Last Name </label>
            </div>
            <span class="error-msg">{{ err.lastName }}</span>
          </div>
        </div>
        <div class="mt-7">
          <div class="p-float-label">
            <InputText
              id="phone"
              type="text"
              v-model="user.phone"
              class="w-full"
              @input="resetErr"
            />
            <label for="phone">Phone</label>
          </div>
          <span class="error-msg">{{ err.phone }}</span>
        </div>

        <div class="my-7">
          <div class="p-float-label">
            <InputText
              id="password"
              :type="'password'"
              v-model="user.password"
              class="w-full"
              @input="resetErr"
            />
            <label for="password">Password</label>
          </div>
          <span class="error-msg">{{ err.password }}</span>
        </div>

        <Button
          @click="handleRegister"
          label="Sign up"
          size="small"
          class="w-full flex items-center justify-center"
          :disabled="loading"
          ><ProgressSpinner
            v-if="loading"
            style="width: 20px; height: 20px"
            strokeWidth="6"
          />
          <span v-else>Next</span></Button
        >
      </div>
    </div>

    <RouterLink
      class="text-blue-500 mt-3 text-sm text-center block font-semibold hover:opacity-80"
      to="/auth/login"
      >Already have an account ? Go back to sign in.</RouterLink
    >
  </div>
</template>

<style scoped>
.p-button {
  margin-top: 10px;
}
</style>
