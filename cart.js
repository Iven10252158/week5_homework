const cartApp = Vue.createApp({
data(){
    return{
        url:'https://vue3-course-api.hexschool.io/',
        path:'iven_vue3_course',
        // 購物車資料
        cart:{},
        // 表單驗證所使用的資料
        user:{
            email:'',
            name:'',
            address:'',
            phone:''
        },
        isLoading:false
    }
},
methods:{
    getCartList(){
        this.isLoading=true;
        axios.get(`${this.url}api/${this.path}/cart`)
            .then(res=>{
                if(res.data.success){
                    this.isLoading=false;
                    this.cart=res.data.data;
                    console.log(res);
                    console.log(this.cart);
                } 
            }).catch(err=>{
                console.log(err.data.message)
        })
    },
    updateCart(item){
        this.isLoading=true;
        const cart={
            product_id:item.product.id,
            qty:item.qty
        }
        axios.put(`${this.url}api/${this.path}/cart/${item.id}`,{data:cart})
            .then(res=>{
                this.isLoading=false;
                swal("Good Job!", "更新成功", "success");
                console.log(res);
                this.getCartList();
            }).catch(err=>{
                console.log(err.data.message)
        })
        
    },
    deleteCartProduct(item){
        this.isLoading=true;
        axios.delete(`${this.url}api/${this.path}/cart/${item.id}`)
            .then(res=>{
                if(res.data.success){
                    this.isLoading=false;
                    swal("OK!", "已成功刪除", "success");
                    console.log(res);
                    this.getCartList();
                }
            }).catch(err=>{
                console.log(err.data.message)
            })
    },
    addNum(item){
        if(item.product_id===item.product.id){
            item.qty+=1;
            this.updateCart(item);
        };

    },
    reduce(item){
        if(item.product_id===item.product.id){
            item.qty-=1;
            this.updateCart(item);
        }
        console.log(item);
    }
},
mounted(){
    this.getCartList();
}
});



VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');
// Activate the locale
VeeValidate.configure({
generateMessage: VeeValidateI18n.localize('zh_TW'),
validateOnInput: true, // 調整為輸入字元立即進行驗證
});

Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
      VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
  });

cartApp.component('VForm', VeeValidate.Form);
cartApp.component('VField', VeeValidate.Field);
cartApp.component('ErrorMessage', VeeValidate.ErrorMessage);

cartApp.component('loading',VueLoading);

cartApp.mount('#cart');