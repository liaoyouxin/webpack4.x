const htmlWebpackPlugin =  require('html-webpack-plugin')
const uglifyjs = require('uglifyjs-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

module.exports = {
    mode:'development',
    entry:{
    	index : './src/js/index.js',
    	list : './src/js/list.js',
    	common : [
    	  './src/js/order.js',
    	  './src/css/order.css'
    	]
    },
    output:{
    	filename:'./js/[name].js',
    	path:__dirname+'/dist',
      publicPath:'file:///F:/multiplyWebpack/dist/'
    },
    module:{
    	rules:[
    	  {
    	  	test:/\.css$/,
    	  	use:extractTextPlugin.extract({ //css分离出来
    	  		fallback:'style-loader',
    	  		use:'css-loader'
    	  	})
    	  	//不分离写法
    	  	// use:[
    	  	//   {loader:'style-loader'},
    	  	//   {loader:'css-loader'}
    	  	// ]
    	  },
    	  {
    	  	test:/\.js$/,
    	  	use:{
    	  		loader:'babel-loader'
    	  	}
    	  },
    	  {
    	  	test:/\.(png|jpg|gif)$/,
    	  	use:{
    	  		loader:'file-loader',
    	  		options:{
    	  			limit:8192,
    	  			outputPath:"./img"
    	  		}
    	  	}
    	  },
        {
          test:/\.html$/,
          use:['html-withimg-loader'] //打包html中图片
        }
    	]
    },
    plugins:[
      new cleanWebpackPlugin(['dist'],{ //删除dist目录
      	root:__dirname+'/', //根目录
      	verbose:true,
      	dry:false
      }),
     new extractTextPlugin("./css/[name].css"),
      new htmlWebpackPlugin({
      	filename:'index.html',
      	template:'./page/index.html',
      	excludeChunks:['list']
      }),
      new htmlWebpackPlugin({
      	filename:'list.html',
      	template:'./page/list.html',
      	excludeChunks:['index']
      })
    ]
}