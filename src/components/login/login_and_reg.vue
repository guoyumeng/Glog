<template>
    <el-container id="main" style="background-color:#e6ecf0;">

        <el-header style="margin:0;padding:0;position:fixed;width:100%;z-index: 1000;background-color:#fff">
            <el-menu
            :default-active="$route.path"
            class="el-menu-demo"
            mode="horizontal"
            :router="true"
            style="width:800px;margin:0 auto">
            <el-menu-item index="/login">登录</el-menu-item>
            <el-menu-item index="/register">注册</el-menu-item>
            <el-menu-item index="/">回到主站</el-menu-item>


   
            </el-menu>


        </el-header>

        <!-- 前台左侧区域 -->
        <el-main id="index_main" style="padding:10px 0;">
            <router-view></router-view>
        </el-main>


        
    </el-container>
</template>

<script>
  export default {
    data() {
      return {
        username: '',


        
      };
    },
    methods: {

        getcookie(key){
	    	var cookiearr=decodeURIComponent(document.cookie).split('; ');
	    	for(var i=0;i<cookiearr.length;i++){
	    		var newcookiearr=cookiearr[i].split('=');
	    		if(key==newcookiearr[0]){
	    			return newcookiearr[1];
	    		}
	    	}
        },

        check_login(){
            var that = this;
            if (this.getcookie("guoyumeng_blog")) {
                var uid = this.getcookie("guoyumeng_blog");
                var data = new FormData();
                data.append("uid",uid);
                this.axios.post(that._path.php_path+"/php/check_user.php",data).then(res=>{
                    this.username = res.data[0].username;
                })

            }else{
                this.username = '';
            }
        },

        setcookie(key,value,days) {
            var d = new Date();
            d.setDate(d.getDate() + days);
            document.cookie = key+'='+encodeURIComponent(value)+';expires=' + d;
        },

        signOut(){

            this.setcookie('guoyumeng_blog','1000',-1);
            this.$message('用户已退出。');
            this.check_login();
        },

        login(){
            window.location.assign("/join/")
        }
    },

    mounted(){
        this.check_login();
        console.log(this.getcookie("guoyumeng_blog"));

        
        // 延时调整一次
        window.setTimeout(function() {
            

            if (document.getElementById("main")) {
                document.getElementById("main").style.height = (document.documentElement.clientHeight) + "px";
            }
            
            

        },0)

        window.onresize=function(){
            if (document.getElementById("main")) {
                document.getElementById("main").style.height = (document.documentElement.clientHeight) + "px";
            }
            
            
        };
        
    }
}
</script>

<style lang="scss" scoped>



    #index_main{
        width:800px;
        margin: 0 auto;
        margin-top: 60px;

    }



    
</style>