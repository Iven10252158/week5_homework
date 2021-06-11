import pagination from './pagination.js';
import modal from './productModal.js';

const app = Vue.createApp({
    data(){
        return{
            url:'https://vue3-course-api.hexschool.io/',
            path:'iven_vue3_course',
            products:[],
            pagination:{},
            product:{},
            getStatus:'',
            addCartStatus:'',
            isLoading:true,
        }
    },
    methods:{
        getProducts(page=1){
            this.isLoading=true;
            axios.get(`${this.url}api/${this.path}/products?page=${page}`)
                .then(res=>{
                    if(res.data.success){
                        this.isLoading=false;
                        this.products=res.data.products;
                        this.pagination=res.data.pagination;
                        console.log(res);
                    } 
                }).catch(err=>{
                    console.log(err.data.message)
            })
        },
        openModal(item){
            console.log(item.id);
            this.getStatus=item.id;
            axios.get(`${this.url}api/${this.path}/product/${item.id}`)
                .then(res=>{
                    this.product=res.data.product;
                    this.$refs.modal.openModal();
                    this.getStatus='';
                    console.log(this.product);
                }).catch(err=>{
                    console.log(err.data.message)
            })

        },
        addToCart(id,qty=1){
            console.log(id);
            const cart={
                product_id:id,
                qty,
            }
            this.addCartStatus=id;
            axios.post(`${this.url}api/${this.path}/cart`,{data:cart})
                .then(res=>{
                    if(res.data.success){
                        console.log(res);
                        this.addCartStatus='';
                        swal("Good job!", "成功加入購物車!", "success");
                    }
                }).catch(err=>{
                    console.log(err.data.message)
            })
        },
    },
    components:{
        pagination,
        modal
    },
    mounted(){
        this.getProducts(); 
    }
});

app.component('loading',VueLoading);



app.mount('#app');