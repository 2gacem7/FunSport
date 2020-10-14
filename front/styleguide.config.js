module.exports = {
	components: "src/components/appButton.vue",
	webpackConfig: {
	  module: {
		rules: [
		  {
			test: /\.vue$/,
			exclude: /node_modules/,
			loader: "vue-loader"
		  },
		  // For js or css files:
		  {
			test: /\.js?$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		  },
		  {
			test: /\.css$/,
			loader: "style-loader!css-loader"
		  }
		]
	  }
	}
  };