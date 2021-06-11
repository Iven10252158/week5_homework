export default{
    template:`<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{'disabled':page.current_page===1}">
        <a class="page-link" href="#" aria-label="Previous"
        @click="change(page.current_page-1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" :class="{'active':page.current_page===item} "
        v-for="(item,index) in page.total_pages" :key="item.id">
        <a class="page-link" href="#" @click="change(item)">{{item}}</a>
      </li>
      <li class="page-item" :class="{'disabled':page.current_page===page.total_pages}">
        <a class="page-link" href="#" aria-label="Next"
        @click="change(page.current_page+1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`,
  props:['page'],
  methods:{
      change(item){
          this.$emit('changePage',item)
      }
  },
}