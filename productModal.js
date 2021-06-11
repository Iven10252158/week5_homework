export default{
    template:`<div class="modal fade" ref="innerModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{tempProduct.title}}</h5>
          <h5>{{tempProduct.id}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body mb-2">
        <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
          <h5>商品內容：{{tempProduct.content}}</h5>
          <div class="d-flex justify-content-between my-3">
            <del><small class="text-muted">原價:{{tempProduct.origin_price}}元</small></del>
            <h5>售價:{{tempProduct.price}}元</h5>
          </div>
            <div class="input-group">
            <input type="number" class="form-control" min="1" v-model.number="qty"/>
            <button type="button" class="btn btn-outline-danger" :class="{'disabled':qty===0 || qty===''}"
            @click="addCart(tempProduct.id,qty)">
            加入購物車</button>
            </div>
          </div>
      </div>
    </div>
  </div>`,
  props:['product'],
  data(){
      return{
        bsModal:'',
        tempProduct:{},
        // 這邊的qty是自己定義的，是為了在modal裡面的加入購物車，能直接帶上一個數量
        qty:1
      }
  },
  watch:{
    product(){
        this.tempProduct = this.product;
    }
  },
  methods:{
      openModal(){
        this.bsModal.show();
      },
      hideModal(){
        this.bsModal.hide();
      },
      addCart(id,qty){
          this.$emit('addCart',id,qty)
      }
  },
  mounted(){
    this.bsModal=new bootstrap.Modal(this.$refs.innerModal);
  },
}