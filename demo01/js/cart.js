new Vue({
    el:"#app",
    data:{
        title : "Hello",
        productList : [],
        listLen : 0,
        checkedLen : 0,
        totalMoney : 0,
        checkAllFlag: false,
        delFlag:false,
        curProduct:null
    },
    methods:{
        cartView: function(){
            var _this = this;
            // 基于vue-resource 也可以post jsonP
            // 获取商品json
            this.$http.get("data/cartData.json",{"id":123})
                        .then(function(res){
                            // console.log(res);
                            res = res.data;
                            _this.productList = res.result.list;  
                            // _this.totalMoney = res.result.totalMoney;  
                            // 商品数量初始值
                            _this.listLen = _this.productList.length;
                        });
        },
        // 商品数量加减
        changeMoney: function(product, way){
                // if(product.productQuantity < 1){
                //     product.productQuantity = 1;
                // }
                switch (way){
                    case 1:
                        product.productQuantity += 1;
                        break;
                    case -1: 
                        if(product.productQuantity < 2){
                            product.productQuantity = 1;
                        }else{
                            product.productQuantity -= 1;
                        }                     
                        break;
                }    
                // console.log(product.productQuantity)
                this.calcTotalPrice();
            
        }, 
        // 商品选中
        selectedProduct: function(item){
            var _this = this;
            // json里的item并没有checked字段
            if(typeof item.checked == 'undefined'){
                // 向item里全局注册了checked属性, 默认是true
                Vue.set(item, "checked", true);
                _this.checkedLen++;
                // // 局部注册
                // this.$set(item, "checked", true);
            }else{
                item.checked = !item.checked;
                // 依据是否选中 更新 选中商品数量
                if(item.checked){
                    _this.checkedLen++;    
                    // console.log('_this.checkedLen', _this.checkedLen);
                    // 选中商品数量 和 商品List数量相等, 全选
                    if(_this.listLen == _this.checkedLen){
                        _this.checkAllFlag = true;
                    }
                }else{
                    _this.checkedLen--;
                    // 取消选中, item-all-check一定不选
                    _this.checkAllFlag = false;
                }
            }
            
            // 更新 totalMoney
            this.calcTotalPrice();
        },
        // 商品删除
        delConfirm: function(item){
            var _this = this;
            _this.delFlag = true;
            _this.curProduct = item;
        },
        delProduct: function(){
            var _this = this;
            // 获取待删除索引并删除,v-for自动渲染, 商品list减一, 关闭删除弹框
            var index = _this.productList.indexOf(_this.curProduct);
            _this.productList.splice(index, 1);

            _this.listLen--;
            // console.log("_this.listLen", _this.listLen);
            if(_this.listLen == _this.checkedLen){
                _this.checkAllFlag = true;
            }

            _this.delFlag = false;
            _this.calcTotalPrice();
        },

        // 商品全选
        checkAll: function(){
            var _this = this;
            _this.checkAllFlag = !_this.checkAllFlag;
            // _this.checkAllFlag = flag;
            // console.log(_this.checkAllFlag);

            _this.productList.forEach(function(item, index){
                    if(typeof item.checked == 'undefined'){
                        _this.$set(item, "checked", _this.checkAllFlag);
                    }else{
                        // 点击全选或取消, 所有item跟随item-all-check变化
                        item.checked = _this.checkAllFlag;
                    }

                    // 已选商品数量 _this.checkedLen 初始化
                    if(item.checked){
                        _this.checkedLen = _this.listLen;
                    }else{
                        _this.checkedLen = 0; 
                    }
            });

            this.calcTotalPrice();
        },
        // 计算商品总价格
        calcTotalPrice: function(){
            var _this = this;
            _this.totalMoney = 0;
            _this.productList.forEach(function(item, index){
                    // 商品选中, 计算总金额
                    if(item.checked){
                        _this.totalMoney += item.productPrice * item.productQuantity; 
                    }  
            });
        }

    },
    // 生命周期的方法 实例创建完成后 默认调用的方法
    mounted: function(){
        this.cartView();

    },
    // 局部过滤器
    filters: {
        formatMoney: function(value){
            return "¥ " + value.toFixed(2);
        }
    }
});