<template>
  <div class="m-10">
    <div class="w-full flex justify-between item-center">
      <h3 class="text-lg font-medium">
        My task
      </h3>
      <div class="w-52">
        <formSelect name="filtre" :value="statusTask" :options="taskList" @input="statusTask = $event" />
      </div>
    </div>
    <div class="divider"></div>
    <ul class="card">
      <li v-for="task in filterTask " :key="task.id" class="">
        <div class="flex flex-row items-center justify-between w-full">
          <div class="flex flex-row items-center">
            <div class="badge" :class="task.status.value === 'TODO' ? 'todo':'done'">
              <span>{{ task.status.label }}</span>
            </div>
            <div class="title">
              {{ task.title }}
            </div>
          </div>
          <div class="flex flex-row items-center">
            <NuxtLink :to="{ name: 'edit',query: { id:task.id } }">
              <button class="edit">
                <SvgIcon name="icons/pencil" class="w-9 h-4 absolute" />
              </button>
            </NuxtLink>
            <button class="delete" @click="deleteTask(task.id)">
              <SvgIcon name="icons/trash" class="w-4 h-4 absolute" />
            </button>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row lg:items-center justify-between w-full my-2 flex-col-reverse">
          <div class="text-gray-500">
            {{ task.description }}
          </div>
          <div v-if="task.date" class="flex flex-row items-center">
            <div class="text-gray-400">
              <SvgIcon name="icons/calendar" class="w-5 h-5" />
            </div>
            <div class="text-gray-500 ml-1">
              {{ dateFormat(task.date) }}
            </div>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row lg:items-center w-full">
          <div class="text-gray-500">
            Created At {{ dateFormat(task.createdAt) }} - {{ hourFormat(task.createdAt) }}
          </div>
          <div class="lg:ml-2 text-gray-500 font-semibold">
            Updated At {{ dateFormat(task.updatedAt) }} - {{ hourFormat(task.updatedAt) }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData ({ $api, error }) {
    const [err, tasks] = await $api.tasks.findAll()

    if (err) {
      return error({
        statusCode: 404,
        message: err
      })
    }
    tasks.sort(function (a, b) {
      if (b.date) {
        a = new Date(a.date)
        b = new Date(b.date)
      } else {
        return -1
      }
      if (a < b) {
        return -1
      }
      if (a > b) {
        return 1
      }
      return 0
    })
    return {
      tasks
    }
  },
  data () {
    return {
      taskList: [{
        label: 'All',
        value: 'ALL'
      }, {
        label: 'To Do',
        value: 'TODO'
      }, {
        label: 'Done',
        value: 'DONE'
      }],
      statusTask: 'ALL'
    }
  },
  computed: {
    filterTask () {
      return this.statusTask === 'ALL' ? this.tasks : this.tasks.filter(task => task.status.value === this.statusTask)
    }
  },
  methods: {
    dateFormat (taskDate) {
      const options1 = { year: 'numeric', month: 'long', day: 'numeric' }
      const dateTimeFormat3 = new Intl.DateTimeFormat('en-US', options1)
      const date = new Date(taskDate)
      return dateTimeFormat3.format(date)
    },
    hourFormat (taskDate) {
      return taskDate.substr(11, 8)
    },
    deleteTask (id) {
      this.$api.tasks.deleteTask(id).then(() => {
        this.$router.app.refresh()
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .divider{
    margin-top: 1.1rem;
    margin-bottom: 2rem;
    background: #E5E7EB;
    width: 100%;
    height: 1px;
  }
  li{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 24px;
    border-bottom: 1px solid #E5E7EB;
    button{
      width: 1.3rem;
      height: 1.3rem;
      color:white;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    button.edit{
      background: #4F46E5;
      margin-right: 8px;
    }
    button.delete{
      background: #DC2626;
    }
    .done{
      span{
        color: #065F46;
      }
      background: #D1FAE5;
    }
    .todo{
      span{
        color: #991B1B;
      }
      background: #FEE2E2;
    }
    .badge{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 2px 10px;
      height: 20px;
      border-radius: 10px;
      flex: none;
      margin-right: 10px;
      max-width: 60px;
      span{
        position: static;
        left: 10px;
        top: 2px;
        font-weight: 500;
        font-size: 0.9rem;
        text-align: center;
      }
    }
    .title{
      font-weight: 500;
      font-size: 0.9rem;
      line-height: 20px;
      color: #4F46E5;
    }
  }
</style>
