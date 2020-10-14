module.exports = {
	// set your styleguidist configuration here
	title: 'Funsport Frontend Documentation',
	sections: [
		  {
			name: 'Environment Config',
		    components: 'src/env.config.exemple.js'
		  },
		  {
			name: 'Views',
		    components: 'src/views/*.vue'
		  },
		  {
		    name: 'Components',
		    components: 'src/components/*.vue'
		  }
		],
	// components: 'src/components/**/[A-Z]*.vue',
	// defaultExample: true,
	// sections: [
	//   {
	//     name: 'First Section',
	//     components: 'src/components/**/[A-Z]*.vue'
	//   }
	// ],
	// webpackConfig: {
	//   // custom config goes here
	// },
}
