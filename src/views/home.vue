<template>
  <div class="xl:w-[1000px] xl:h-[600px] xl:bg-white xl:p-3 xl:flex xl:items-center xl:rounded-xl xl:shadow-xl">
    <aside
      class="xl:h-full xl:w-1/3 xl:rounded-xl xl:p-10 bg-primary-purplish pt-10 pb-32 aside-bg bg-no-repeat bg-center bg-cover -mb-24 xl:mb-0">
      <ul class=" w-3/5 xl:w-full mx-auto flex items-center justify-between xl:block">
        <li class="uppercase flex items-center xl:mb-8" v-for="(step, index) in stepsHeader">
          <p
            :class="{ 'bg-primary-light text-primary-purplish': step.activeCount.includes(stepsCount) }"
            class="border border-primary-light text-primary-light text-2xl text-center w-9 rounded-full xl:mr-5"
          >{{ index + 1 }}</p>
          <div class=" hidden xl:block">
            <p class=" text-neutral-cool">step {{ index + 1 }}</p>
            <p class=" text-white">{{ step.title }}</p>
          </div>
        </li>
      </ul>
    </aside>
    <div class="min-mobile flex flex-col justify-between xl:min-h-0 h-full xl:w-2/3">
      <div class="rounded-xl p-6 bg-white w-5/6 mx-auto shadow-xl mb-4 xl:shadow-none xl:mb-0">
        <template v-if="stepsCount === 1">
          <StepperTitle>Personal info</StepperTitle>
          <StepperDescribe>Please provide your name, email address, and phone number.</StepperDescribe>
          <label class="block mb-4">
            <h3 class="text-lg leading-loose flex items-center justify-between">
              <span>Name</span>
              <span v-show="fieldsErr.nameErr" class="text-sm text-primary-strawberry">The field is incorrect.</span>
              <span v-show="fieldsErr.nameEmpty" class="text-sm text-primary-strawberry">The field is required.</span>
            </h3>
            <input
              v-model.trim="form.name"
              minlength="1"
              :class="{
                'ring-primary-strawberry': fieldsErr.nameErr
              }"
              class="hover:ring-primary-purplish ring-primary-purplish  placeholder-shown:ring-neutral-light p-3 outline-none appearance-none w-full ring-2 rounded"
              type="text"
              placeholder="e.g. Stephen King"
              @focus="fieldsErr.nameEmpty = false"
              @change="validator({
                testInput: form.name,
                regex: `^[A-Za-z]+([ \-'][A-Za-z]+)*$`,
                fieldName: 'nameErr'
              })"
            >
          </label>
          <label class="block mb-4">
            <h3 class="text-lg leading-loose flex items-center justify-between">
              <span>Email Address</span>
              <span v-show="fieldsErr.emailErr" class="text-sm text-primary-strawberry">The field is incorrect.</span>
              <span v-show="fieldsErr.emailEmpty" class="text-sm text-primary-strawberry">The field is required.</span>
            </h3>
            <input
              v-model.trim="form.email"
              minlength="3"
              :class="{
                'ring-primary-strawberry': fieldsErr.emailErr
              }"
              class="hover:ring-primary-purplish ring-primary-purplish placeholder-shown:ring-neutral-light p-3 outline-none appearance-none w-full ring-2 rounded"
              type="email"
              @focus="fieldsErr.emailEmpty = false"
              placeholder="e.g. stephenking@lorem.com"
              @change="validator({
                testInput: form.email,
                regex: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`,
                fieldName: 'emailErr'
              })"
            >
          </label>
          <label class="block mb-4">
            <h3 class="text-lg leading-loose flex items-center justify-between">
              <span>Phone Number</span>
              <span v-show="fieldsErr.phoneEmpty" class="text-sm text-primary-strawberry">The field is required.</span>
            </h3>
            <input
              v-model.trim="form.phone"
              maxlength="10"
              @focus="fieldsErr.phoneEmpty = false"
              class="hover:ring-primary-purplish ring-primary-purplish placeholder-shown:ring-neutral-light p-3 outline-none appearance-none w-full ring-2 rounded"
              type="tel"
              placeholder="e.g. +1 234 567 890"
            >
          </label>
        </template>


        <template v-if="stepsCount === 2">
          <StepperTitle>Select your plan</StepperTitle>
          <StepperDescribe>You have the option of monthly or yearly billing.</StepperDescribe>
          <div class=" xl:flex items-center justify-between xl:mb-8 xl:space-x-4">
            <label v-for="option in plansOptions" :class="{
              'ring-primary-purplish bg-neutral-magnolia': form.plans === option.id
            }"
              class="p-6 xl:p-4 py-4 mb-4 cursor-pointer rounded-2xl block hover:ring-primary-purplish ring-2 ring-neutral-light xl:mb-0 xl:w-1/3">
              <input v-model="form.plans" class="absolute opacity-0 -z-10" type="radio" name="plan" :value="option.id">
              <div class=" flex items-center xl:block">
                <img class=" mr-4 xl:mr-0 xl:mb-10" :src="`./icon/${option.icon}.svg`" alt="icon">
                <div>
                  <h3 class="text-xl font-bold">{{ option.title }}</h3>
                  <p class="text-neutral-cool">${{ form.isYearPlan ? option.yearPrice : option.monthPrice }}/{{
                    form.isYearPlan ? 'yr' : 'mo' }}</p>
                  <p v-show="form.isYearPlan" class=" font-medium">2 months free</p>
                </div>
              </div>
            </label>
          </div>
          <div class=" flex items-center justify-evenly bg-neutral-magnolia rounded-2xl py-5 text-lg font-bold">
            <p :class="{ 'text-neutral-cool': form.isYearPlan }">Monthly</p>
            <button type="button" @click="form.isYearPlan = !form.isYearPlan"
              class=" bg-primary-marine p-1 rounded-3xl w-12">
              <span :class="{ 'ml-auto': form.isYearPlan }" class=" bg-white w-4 h-4 block rounded-full"></span>
            </button>
            <p :class="{ 'text-neutral-cool': !form.isYearPlan }">Yearly</p>
          </div>


        </template>
        <template v-if="stepsCount === 3">
          <StepperTitle>Pick add-ons</StepperTitle>
          <StepperDescribe>Add-ons help enhance your gaming experience.</StepperDescribe>
          <template v-for="option in addOnsOptions">
            <input type="checkbox" v-model="form.addOns" :value="option.id" :id="option.id"
              class="absolute opacity-0 -z-10">
            <label :for="option.id" :class="{
              'bg-neutral-magnolia ring-primary-purplish': form.addOns.includes(option.id)
            }"
              class="p-6 py-4 mb-6 flex items-center cursor-pointer rounded-2xl hover:ring-primary-purplish ring-2 ring-neutral-light">
              <div class="w-6 h-6 rounded-lg ring-2 ring-neutral-light mr-2 shrink-0" :class="{
                'bg-primary-purplish ring-primary-purplish': form.addOns.includes(option.id)
              }">
                <img v-show="form.addOns.includes(option.id)" class="mx-auto w-4 h-6 object-contain"
                  src="../assets/icon/checkmark.svg" alt="checked icon">
              </div>
              <div class=" select-none">
                <h3 class="text-xl font-bold">{{ option.title }}</h3>
                <p class="text-neutral-cool">{{ option.description }}</p>
              </div>
              <div class="ml-auto text-primary-purplish shrink-0">+${{ form.isYearPlan ? option.yearPrice :
                option.monthPrice }}/{{ form.isYearPlan ? 'yr' : 'mo' }}</div>
            </label>
          </template>

        </template>
        <template v-if="stepsCount === 4">
          <StepperTitle>Finishing up</StepperTitle>
          <StepperDescribe>Double-check everything looks OK before confirming.</StepperDescribe>
          <ul class="bg-neutral-magnolia p-4 rounded-lg mb-6">
            <li class=" flex justify-between items-center mb-3">
              <div>
                <h3 class="font-bold">{{ planFinder.title }} ({{ form.isYearPlan ? 'Yearly' : 'Monthly' }})</h3>
                <button
                  @click="stepsCount = 1"
                  class="font-medium text-neutral-cool underline hover:text-primary-purplish"
                  type="button">Change</button>
              </div>
              <p class=" font-bold">${{ form.isYearPlan ? planFinder.yearPrice : planFinder.monthPrice }}/{{
                form.isYearPlan ? 'yr' : 'mo' }}</p>
            </li>
            <div v-if="addOnFilter.length > 0" class="border-t border-neutral-light pt-3">
              <li v-for="add in addOnFilter" :key="add.id" class=" flex justify-between items-center mb-3">
                <h3 class=" text-neutral-cool">{{ add.title }}</h3>
                <p class=" font-medium">+${{ form.isYearPlan ? add.yearPrice : add.monthPrice }}/{{ form.isYearPlan ? 'yr' :
                'mo' }}</p>
              </li>
            </div>
          </ul>

          <div class=" px-3 flex justify-between items-center">
            <p class=" text-neutral-cool">Total (per {{ form.isYearPlan ? 'year' : 'month' }})</p>
            <p class=" text-xl text-primary-purplish font-bold">${{ totalPrice }}/{{ form.isYearPlan ? 'yr' : 'mo' }}</p>
          </div>
        </template>
        <template v-if="stepsCount === 5">
          <div class=" py-10">
            <figure class="mb-6">
              <img class=" mx-auto w-16" src="../assets/icon/thank-you.svg" alt="thank-you">
            </figure>
            <h2 class="text-2xl text-center font-bold leading-loose">Thank you!</h2>
            <p class="mb-6 text-center text-neutral-cool text-xl">Thanks for confirming your subscription! We hope you
              have fun using our platform. If you ever need support, please feel free to email us at
              support@loremgaming.com.</p>
          </div>
        </template>
      </div>

      <div class="bg-white p-4 flex items-center justify-end xl:w-5/6 xl:mx-auto" v-if="stepsCount <= 4">
        <button class="hover:opacity-80 transition-opacity mr-auto" v-show="stepsCount !== 1" :disabled="stepsCount <= 1"
          @click="stepsCount -= 1" type="button">Go Back</button>
        <button :disabled="stepsCount >= 5" @click="checkToNext" :class="{
          'bg-primary-purplish': stepsCount === 4
        }" class=" bg-primary-marine text-neutral-light rounded-xl px-7 py-3 hover:opacity-80 transition-opacity"
          type="button">{{ stepsCount === 4 ? 'Confirm' : 'Next Step' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import StepperTitle from '../components/stepperTitle.vue'
import StepperDescribe from '../components/stepperDescribe.vue'
import { useFormStore } from '../store/index'
import { computed } from '@vue/reactivity'

const { plansOptions, addOnsOptions } = useFormStore()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  plans: 'arcade',
  isYearPlan: false,
  addOns: []
})

const validator = ({testInput, regex, fieldName}) => {
  const regexExp = new RegExp(regex)
  const res = regexExp.test(testInput)
  if (!res) {
    fieldsErr[fieldName] = true
  }
}

const fieldsErr = reactive({
  nameEmpty: false,
  nameErr : false,
  emailEmpty: false,
  emailErr: false,
  phoneEmpty: false,
})

const stepsHeader = [
  {
    title: 'your info',
    activeCount: [1]
  },
  {
    title: 'select plan',
    activeCount: [2]
  },
  {
    title: 'add-ons',
    activeCount: [3]
  },
  {
    title: 'Summary',
    activeCount: [4, 5]
  }
]



const planFinder = computed(() => {
  return plansOptions.find(item => item.id === form.plans)
})

const addOnFilter = computed(() => {
  return addOnsOptions.filter(item => form.addOns.includes(item.id))
})

const totalPrice = computed(() => {
  if (form.isYearPlan) {
    const addOnTotalPrice = addOnFilter.value.reduce((sum, item) => {
      return sum + item.yearPrice
    }, 0)
    return addOnTotalPrice + planFinder.value.yearPrice
  } else {
    const addOnTotalPrice = addOnFilter.value.reduce((sum, item) => {
      return sum + item.monthPrice
    }, 0)
    return addOnTotalPrice + planFinder.value.monthPrice
  }
})

const stepsCount = ref(1)

const emptyChecker = () => {
  if (form.email !== '' && form.phone !== '' && form.name !== '') {
    return false
  }
  if (form.email === '') {
    fieldsErr.emailErr = false
    fieldsErr.emailEmpty = true
  }
  if (form.name === '') {
    fieldsErr.nameErr = false
    fieldsErr.nameEmpty = true
  }
  if (form.phone === '') {
    fieldsErr.phoneEmpty = true
  }
  return true
}

const checkToNext = () => {
  if (stepsCount.value === 1) {
    if (fieldsErr.emailErr || fieldsErr.nameErr) {
      return
    }
    if (emptyChecker()) {
      return
    }
  }
  stepsCount.value++
}
</script>