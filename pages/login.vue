<template>
    <div class="login-body">
        <div class="login-container">
            <h2 v-if="toggleAuth">Login</h2>
            <h2 v-else>Register</h2>
            <form @submit.prevent="login" class="login-form" v-if="toggleAuth">
                <input type="email" class="login-input" v-model="email" required>
                <input type="password" class="login-input" v-model="password" required>
                <p>{{ errMsg.value }}</p>
                <p>{{ successMsg ? 'Check your email to confirm your account!' : '' }}</p>
                <button class="bg-[#D9A56F] rounded-full text-white hover:text-black my-2 py-2 w-2/3"
                    type="submit">Login</button>
            </form>
            <form @submit.prevent="register" class="login-form" v-else>
                <input type="email" class="login-input" v-model="email" required>
                <input type="password" class="login-input" v-model="password" required>
                <p>{{ errMsg.value }}</p>
                <p>{{ successMsg ? 'Check your email to confirm your account!' : '' }}</p>
                <button class="bg-[#D9A56F] rounded-full text-white hover:text-black my-2 py-2 w-2/3"
                    type="submit">Register</button>
            </form>
            <button @click="toggleAuthFnc">{{ toggleAuth ? "Don't" : 'Already' }} have an account ?</button>
        </div>
    </div>
</template>
<script setup>
const supabase = useSupabaseClient()
const router = useRouter()
const email = ref('')
const password = ref('')
const errMsg = ref('')
const successMsg = ref(false)
const toggleAuth = ref(true)

async function register() {
    try {
        console.log(email.value, password.value);
        const { data, error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value
        })
        if (error) throw error
        successMsg.value = true
    } catch (error) {
        errMsg.value = error.message
    }
}
async function login() {
    try {
        console.log(email.value, password.value);
        const { error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value
        })
        if (error) throw error
        router.push('/')
    } catch (error) {
        errMsg.value = error.message
    }
}
function toggleAuthFnc() {
    toggleAuth.value = !toggleAuth.value
    email.value = ''
    password.value = ''
    console.log(toggleAuth.value);
}
</script>
<style>
.login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    margin: 0;
    width: 100%;
    right: 0;
    top: 0;
    left: 0;
    bottom: 0;
}

.login-container {
    background-color: #D9A56F;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    width: 300px;
}

.login-container h2 {
    text-align: center;
    color: #fff;
}

.login-form {
    display: flex;
    flex-direction: column;
}

.login-input {
    margin: 10px 0;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
}

.login-button {
    background-color: #D9A56F;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
}

.login-button:hover {
    background-color: #FFC885;
}
</style>