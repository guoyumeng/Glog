<template>
    <div>
        <div id="main">
            <div id="main_top">
                <div>
                    <p>登录 Glog</p>
                    <el-input class="input" v-model="username" size="small" placeholder="用户名"></el-input>
                    <br>
                    <el-input class="input" v-model="password" size="small" placeholder="密码" type="password"></el-input>
                    <div>
                        <el-button type="primary" size="medium" round @click="login()">登录</el-button>
                        <a href="#" disabled>忘记密码？</a>
                    </div>
                </div>
            </div>
            <div id="main_bottom">
                <div>
                    <p>首次使用 Twitter 吗?<a href="/register">现在注册 <i class="el-icon-d-arrow-right"></i></a></p>
                    <p>登录遇到问题?<a href="#">联系网站管理员 <i class="el-icon-d-arrow-right"></i></a></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    data() {
      return {
          username: '',
          password: '',
      };
    },
    methods: {

        setcookie(key,value,days) {
            var d = new Date();
            d.setDate(d.getDate() + days);
            document.cookie = key+'='+encodeURIComponent(value)+';expires=' + d;
        },

        login(){
            var that = this;
            var data = new FormData();
            data.append("username",this.username);
            data.append("password",this.password);
            this.axios.post(that._path.php_path+"/php/login.php",data).then(res=>{
                if(res.data.length > 0 && res.data[0].state == 0){
                    
                    this.setcookie("guoyumeng_blog",res.data[0].uid,7);
                    this.$message({
                        message: '登陆成功！正在为你跳转至首页。',
                        type: 'success'
                    });
                    window.location.assign("/")
                }else if(res.data.length > 0){
                    this.$message({
                        message: '用户已被停用，请联系管理员或重新注册。',
                        type: 'error'
                    });
                }else{
                    this.$message({
                        message: '用户名或密码错误，如果忘记密码请重新注册或联系管理员。',
                        type: 'error'
                    });
                }
                
            })
        },

        

    },

    mounted(){
        
        
        
    }
}
</script>

<style lang="scss" scoped>



    #main{
        width:100%;
        border:1px solid #ddd;
        box-sizing: border-box;
        
        a{
            text-decoration: none;
            font-size: 14px;
            color: #409EFF;
            margin-left: 10px;
        }
        #main_top{
            background-color: #fff;
            padding-top: 30px;
            padding-bottom: 15px;
            >div{

                margin-left: 100px;
                >p{
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                >.input{
         
                    margin:7px 0;
                    width: 300px;
                    font-size: 14px;
                }
                >div{
                    margin-top: 20px;

                }
            }
        }
        #main_bottom{

            background-color: #f5f8fa;
            padding:5px 0;
            >div{

                margin-left: 100px;
                p{
                    color: #606266;
                    font-size: 14px;
                }
            } 
        }
    }


    
</style>