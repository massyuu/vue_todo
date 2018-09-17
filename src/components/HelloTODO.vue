<template>
  <div class="todo">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>コメント</th>
          <th>状態</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in todos" v-bind:key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.comment }}</td>
          <td><button>{{ item.state }}</button></td>
          <td><button>削除</button></td>
        </tr>
      </tbody>
    </table>
    <h2>TODOを追加する</h2>
    <form class="add-form" v-on:submit.prevent="add">
      コメント <input type="text" ref="comment">
      <button type="submit">追加</button>
    </form>
  </div>
</template>

<script>
// use localstrage
// https://jp.vuejs.org/v2/examples/todomvc.html
var KEY = 'vue_todo_sample'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(KEY, JSON.stringify(todos))
  }
}

export default {
  name: 'HelloTODO',
  data() {
    return{
      todos: []
    }
  },
  methods: {
    add: function(e, val){
      var comment = this.$refs.comment
      if (!comment.value.length) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      })
      comment.value = ''
    }
  },
  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos)
      },
      // deepオプション：ネストデータの監視
      deep: true
    }
  },
  created() {
    this.todos = todoStorage.fetch()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
table {
  margin: 0 auto;
  width: 90%;
}

</style>
