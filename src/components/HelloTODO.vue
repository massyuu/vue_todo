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
        <tr v-for="item in computedTodos" v-bind:key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.comment }}</td>
          <td><vs-switch vs-color="dark" v-model="item.stateBool">
                <span slot="on">Done</span>
                <span slot="off">Yet</span>
              </vs-switch>
          </td>    
          <td><vs-button vs-type="flat" vs-color="warning" v-on:click="del(item)">削除</vs-button></td>
        </tr>
      </tbody>
    </table>
    <h2>TODOを追加する</h2>
    <form class="add-form" v-on:submit.prevent="add">
      コメント <input type="text" ref="comment">
      <vs-button vs-type="flat" vs-color="success" type="submit">追加</vs-button>
    </form>
    <label v-for="item in options" v-bind:key="item.val">
      <input type="radio" v-model="currentOption" v-bind:value="item.val">{{ item.label }}
    </label>
  </div>
</template>

<script>
// use localstrage
// https://jp.vuejs.org/v2/examples/todomvc.html
var KEY = 'vue_todo_sample'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(
      localStorage.getItem(KEY) || '[]'
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
  data () {
    return {
      todos: [],
      options: [
        { val: -1, label: 'ALL' },
        { val: 0, label: 'Processing' },
        { val: 1, label: 'Done' }
      ],
      currentOption: -1
    }
  },
  methods: {
    add: function (e, val) {
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
    },
    changeState: function (item) {
      item.state = item.state ? 0 : 1
      item.stateBool = item.state ? false : true
    },
    del: function (item) {
      var uid = this.todos.indexOf(item)
      this.todos.splice(uid, 1)
    }

  },
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      // deepオプション：ネストデータの監視
      deep: true
    }
  },
  created () {
    this.todos = todoStorage.fetch()
  },
  computed: {
    computedTodos: function () {
      // データ current が -1 ならすべて
      // それ以外なら current と state が一致するものだけに絞り込む
      return this.todos.filter(function (el) {
        return this.currentOption < 0 ? true : this.currentOption === el.state
      }, this)
    },
    computedLabels: function () {
      return { '0': 'Processing', '1': 'Done', '-1': 'All' }
    }
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
}
th {
  width: 200px;
}
</style>
