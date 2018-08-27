new Vue({
    el: '.container',
    data:{
        addressList:[],
        limitNum: 3,
        currentIndex: 0,
        shippingMethod: 1

    },
    mounted: function(){
        this.$nextTick(function(){
            this.getAddressList();
        });
    },
    computed: {
        // 返回过滤后数组
        filterAddress: function(){
            return this.addressList.slice(0, this.limitNum);
        }

    },
    methods: {
        // 获取地址数据
        getAddressList: function(){
            var _this = this;
            this.$http.get("data/address.json").then(function(res){
                var res = res.data;
                if(res.status=="0"){
                    _this.addressList = res.result;
                }
            });
        },
        // 展开更多地址
        loadMore: function(){
            this.limitNum = this.addressList.length;
        },
        // 设置默认地址
        setDefault: function(addressId){
            this.addressList.forEach(function(address, index){
                if(address.addressId == addressId){
                    address.isDefault = true;
                }else{
                    address.isDefault = false;
                }

            }); 
        }
    }
});