<template>
    <el-container id="wrapper" style="background-color:#e6ecf0">

        <!-- 前台头部区域 -->
        <el-header style="margin:0;padding:0;position:fixed;background-color:#545c64;width:100%;">
            
            <el-menu
            :default-active="$route.path"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            :router="true"
            style="width:1000px; margin:0 auto;height:60px"
            background-color="#545c64"
            text-color="#fff"

            active-text-color="#ffd04b">
            <el-menu-item index="/">主站</el-menu-item>
            
            <el-submenu index="/">
                <template slot="title">分类内容</template>

                <el-menu-item v-for="(data,index) in class_list" :key="index" :index='"/class/"+data.url_name'>{{ data.class_name }}</el-menu-item>

            </el-submenu>

            <el-menu-item index="3" disabled>图片故事</el-menu-item>
            <el-menu-item index="4" disabled>冬日暖阳</el-menu-item>


            


            <div v-if="username == ''" id="header_login">
                <el-button plain class="login_btn" @click="login()">登录</el-button>
            </div>

            <div v-else id="header_user">
                <el-dropdown style="cursor:pointer">
                    <span class="el-dropdown-link">{{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item disabled>个人中心</el-dropdown-item>
                        <el-dropdown-item disabled>我的收藏</el-dropdown-item>
                        <el-dropdown-item disabled>用户设置</el-dropdown-item>
                        <el-dropdown-item disabled>系统设置</el-dropdown-item>
                        <el-dropdown-item divided @click.native="signOut()">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>


            <div id="top_search" style="margin-top: 15px;display:inline-block;float:right;margin-right:20px">
                <input id="top_search_input" size="small" v-model="search_input" class="input-with-select">

                <button id="top_search_button" class="el-icon-search" @click="search()"></button>
                <p id="top_search_title">请输入文章标题</p>

            </div>

            <i id="header_logo" class="iconfont icon-GlogLOGO" title="Welcome to Glog"></i>
            
            </el-menu>


        </el-header>

        <!-- 前台左侧区域 -->
        <el-main id="index_main" style="padding:10px 0;">
            <router-view name="index_left"></router-view>
            
        </el-main>

        <!-- 前台右侧区域 -->
        <div id="right">
        <div id="write_email">
            <router-view name="index_right"></router-view>
            
        </div>
        </div>

        <div id="IE_OUT">
            
            <div>
                <i class="iconfont icon-ie"></i>
                <p>IE 浏览器已不再受到本站支持</p>
                <div>
                    <a href="https://share.weiyun.com/5uoLBHr">
                        <el-button class="br_btn" type="success" round plain>谷歌 Chrome</el-button>
                    </a>
                    <a href="https://www.firefox.com.cn/">
                        <el-button class="br_btn" type="warning" round plain>火狐 Firefox</el-button>
                    </a>
                </div>
                <div class="IE_title">
                    <p><el-tag size="small">1995 年</el-tag>IE 在微软诞生</p>
                    <p><el-tag type="success" size="small">2003 年</el-tag>IE 达到 95% 的使用率高峰</p>
                    <p style="margin-left:100px;">······</p>
                    <p><el-tag type="warning" size="small">2015 年</el-tag>微软宣布 IE 的默认浏览器地位被 Edge 取代</p>
                    <p><el-tag type="danger" size="small">2016 年</el-tag>微软正式停止发布 IE11 之前版本的安全性更新......</p>
                </div>
            </div>
        </div>

        
    </el-container>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        activeIndex: '1',
        activeIndex2: '1',
        search_input: '',
        class_list: [],
        
      };
    },
    methods: {

        // 多选项选择事件
        handleSelect(key, keyPath) {
            console.log(key, keyPath);

        },

        search(){
            alert("功能开发中！")
        },
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
        },

        getclass(){
            var that = this;
            this.tableData = [];
            var data = new FormData();
            data.append("cid",0);
            this.axios.post(that._path.php_path+'/php/get_class_data.php',data).then(res=>{
                this.class_list = res.data;
            })
            
        },

        IEVersion() {


             if (!!window.ActiveXObject || "ActiveXObject" in window){
                $("#IE_OUT").css("display","block")
                $("html").css("overflow","hidden")
                 
             }else{
                 console.log("否");
             }
             
            
        },

        add_visit(){
            var that = this;
            

                var data = new FormData();
                
                data.append("province",'NULL');
                data.append("city",'NULL');
                data.append("ip",'NULL');
                
                // 将数据提交至服务器
                this.axios.post(that._path.php_path+"/php/add_visit.php",data)
                
            
            
        },

    },

    mounted(){
        this.check_login();
        this.getclass();
        this.IEVersion();
        
        this.add_visit()
        
        $("#top_search_input").blur(function(){
            console.log($("#top_search_input"));
            
            $("#top_search_input").css("background-color","rgba(255, 255, 255, 0.1)");
            $("#top_search_input").css("border-color","#dcdfe6");
            
            if ($("#top_search_input").val() == '') {
                $("#top_search_title").css("display","block");
            }else{
                $("#top_search_title").css("display","none");
            }
        });
        $("#top_search_input").focus(function(){
            $("#top_search_input").css("background-color","transparent");
            $("#top_search_input").css("border-color","#409EFF");
            $("#top_search_title").css("display","none");
        });

        $("#wrapper").css("min-height",(document.documentElement.clientHeight) + "px");


        



    }
}
</script>



<style lang="scss">

    #top_search:hover>p{
        display: none !important;
    }
    #top_search{
        position: relative;
        *{
            border-radius: 0;
            
        }
        >p{
            display: block;
            position: absolute;
            left:0;
            top: 0;
            line-height: 30px;
            margin: 0 10px;
            font-size: 13px;
            color: #dcdfe6;
            outline: none;
        }

        #top_search_input{
            background-color: rgba(255, 255, 255, 0.1);
            height:30px;
            border: 1px solid #dcdfe6;
            float: left;
            box-sizing: border-box;
            outline: none;
            color: #FFFFFF;
            text-indent: 10px;
            width: 250px;
        }
        #top_search_button{
            height:30px;
            border: none;
            float: left;
            outline: none;
            color: #606266;
            padding: 0 15px;
        }

    }
</style>

<style lang="scss" scoped>



    #index_main{
        width:1000px;
        margin: 0 auto;
        margin-top: 60px;

    }

    #right{
        width:320px;

        height: 90%;
        
        position: fixed;
        left: 50%;

        margin-top: 60px;
        margin-left: 180px;

    }
    #write_email{
        float: right;
        height:100%;
        width:100%;
        
    }

    

    

    #header_user{
        height:100%;
        display: block;
        
        line-height: 60px;
        float: right;
        span{
            color: #FFFFFF;
        }
        
    }

    #header_login{
        height:100%;
        display: block;
        
        line-height: 60px;
        float: right;
        .login_btn{
            background: none;
            color: #FFFFFF;
            border-color: transparent;
            border-radius: 0;
            transition: all 0.2s;
        }
        .login_btn:hover{
            color: #409EFF;
            border-color: #409EFF;

        }
    }


    

    #header_logo{
        width: 40px;
        position:absolute;
        left:50%;
        color: #FFFFFF;
        margin-left: -20px;
        font-size: 30px;
        text-align: center;
        line-height: 60px;
        outline: none;
    }

    #IE_OUT{
        display: none;
        
    }

    #IE_OUT>div{
        
        display: flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        height: 100%;
        width:100%;
        background-color: #FFFFFF;
        position:fixed;
        right:0;
        bottom:0;
        
        i{
            display: block;
            font-size: 400px;
            color: #409EFF;

            line-height: 100%;
        }
        >p{

            font-size: 36px;
            font-weight: bold;
            font-family: '微软雅黑', '黑体';
            color: #303133;
        }
        .br_btn{
            margin:10px;
        }
        .IE_title{
            position: absolute;
            left: 50px;
            top: 50px;
   
            font-family: '微软雅黑', '黑体';
            color: #909399;
            font-size: 14px;
        }
        .el-tag{
            margin-right: 10px;
        }
    }



    
</style>