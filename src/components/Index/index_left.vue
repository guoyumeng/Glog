<template>

    <div id="index_main_left">
        <!-- 卡片循环区 -->
        <el-card class="box-card" v-for="(data,index) in listData" :key="index" shadow="hover" style="border-radius: 0">
            <div slot="header" class="clearfix">
                <span style="font-weight:bold;color:#606266;cursor:pointer" @click="clickCard(data)">{{ data.title }}</span>
                <el-tag v-for="(sdata,index2) in data.class" size="medium" :key="index2" style="margin-left: 10px; float:right;cursor:pointer">{{ sdata }}</el-tag>
            </div>
            <div>
                <p style="margin-top:-10px">
                <span class="el-icon-time" style="color:#606266;font-size:13px">{{`&nbsp;&nbsp;`+data.publish_time }}</span>
                    <el-tag type="info" size="mini" style="margin-left:10px;cursor:pointer">{{ data.author }}</el-tag>
                </p>
                <span @click="clickCard(data)" style="cursor:pointer">
                    {{ data.content }}
                </span>
                
            </div>
        </el-card>
        <div id="goto_top">
            <i class="iconfont icon-GlogLOGO"></i>
            <span>回到顶部</span>
        </div>
        

    </div>

</template>

<script>
    export default {
		data() {
            return {
                listData: [],
                cid: '',
            }
        },
        methods:{

            clickCard(data){

                window.location.assign("/article/"+data.aid)
            },

            // 获取文章数据
            getData(){
                var that = this;
                
                console.log(window.location.pathname);
                if (window.location.pathname == "/") {
                    this.cid = '';
                }else{
                    this.uname = location.pathname.substr(location.pathname.lastIndexOf("/")+1);
                    $.ajax({
                        url:that._path.php_path+'/php/get_class_id.php',//url路径
                        type:'POST', //GET
                        async:false, //或false,是否异步
                        data:{//参数
                            "uname":this.uname,

                        },
                        // timeout:5000, //超时时间
                        dataType:'json', //返回的数据格式：

                        success:function(data){
                            that.cid = data[0].cid;
                        }
                    });
                }
                console.log(this.cid);

                
                
                var data = new FormData();
                data.append("cid",this.cid);
                this.axios.post(that._path.php_path+'/php/main_Get_Article_Data.php',data).then(res=>{
                    console.log(this.listData);
                    if(res.data.length > 0){
                        for (let i = 0; i < res.data.length; i++) {
                            res.data[i].publish_time = res.data[i].publish_time.substr(0,16);
                            if (res.data[i].class.length > 0) {
                                res.data[i].class = res.data[i].class.split(',');
                            }else{
                                res.data[i].class = [];
                            }
                            if (res.data[i].content.length>200) {
                                res.data[i].content = res.data[i].content.substr(0,200)+'...'
                            }
                        }
                    }
                    this.listData = res.data;

                    for (let i = 0; i < this.listData.length; i++) {
                        for (let v = 0; v < this.listData[i].class.length; v++) {
                            var data = new FormData();
                            data.append("cid",this.listData[i].class[v]);
                            this.axios.post(that._path.php_path+'/php/get_class_data.php',data).then(res=>{
                                if(res.data.length > 0){
                                    this.listData[i].class.push(res.data[0].class_name);
                                    this.listData[i].class.shift();
                                }
                            })
                        }
                    }
                })
            }
        },
        mounted(){
            this.getData();

            $("#goto_top").click(function () {
                document.documentElement.scrollTop = 0;
            })
        },
        watch:{
            $route(to,from){
                this.getData();
            }
        },
    };
    
</script>

<style lang="scss" scoped>
  .text {
    font-size: 14px;
  }

    .box-card {
        width: 100%;
        margin-bottom: 10px
    }
  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

     #index_main_left{
        width: 66%;
        float: left;
    }

    #goto_top{
        display: flex;
        margin: 10px auto;
        flex-direction:column;
        width: 60px;
        text-align: center;
        cursor: pointer;
        i{
            font-size: 36px;
            color: #409EFF;
        }
        span{
            color: #909399;
            font-size: 12px;
        }
    }

    
    
</style>