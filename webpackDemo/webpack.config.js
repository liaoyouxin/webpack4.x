var path = require('path')
var uglify = require('uglifyjs-webpack-plugin')
var htmlPlugin = require('html-webpack-plugin')

module.exports={
	entry:{
		main:'./src/index.js'
	},
	output:{
		filename:'bundle.js',
		path:__dirname+'/dist'
	},
	module:{
		rules:[
		  //css
		  {
		  	test:/\.css$/,
		  	use:[
		  	   {loader:'style-loader'},
		  	   {loader:'css-loader'}
		  	]
		  },
		  {
		  	test:/\.jpg$/,
		  	use:[
		  	   {loader:'file-loader'}
		  	]
		  },
		  {
		  	test:/\.js$/,
		  	exclude:'/node_modules/',
		  	use:[
		  	 {loader:'babel-loader'}
		  	]
		  }
		]
	},
	plugins:[
	    new uglify(),
	    new htmlPlugin({
	    	minify:{
	    		removeAttributeQuotes:true
	    	},
	    	hash:true,
	    	template:'./index.html'
	    })
	],
	devServer:{
		open:true,
		contentBase:__dirname+'/dist',
		host:'localhost',
		compress:true,
		port:8888
	}
}